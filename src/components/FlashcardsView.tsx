import React, { useState, useMemo } from 'react';
import { FLASHCARDS_DATA } from '../data/flashcardsData';
import { Flashcard, Category } from '../types';
import { SoundManager } from '../utils/audio';
import { 
  RotateCw, 
  CheckCircle2, 
  Bookmark, 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  Shuffle, 
  Sparkles,
  BookOpen,
  Filter
} from 'lucide-react';

interface FlashcardsViewProps {
  onGoToQuiz: () => void;
}

export const FlashcardsView: React.FC<FlashcardsViewProps> = ({ onGoToQuiz }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  
  // Track mastered card IDs in localStorage
  const [masteredIds, setMasteredIds] = useState<Set<string>>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('ghp_mastered_cards');
      if (saved) {
        try {
          return new Set(JSON.parse(saved));
        } catch {
          return new Set();
        }
      }
    }
    return new Set();
  });

  const categories = [
    { id: 'all', label: '全部重點 (29張)' },
    { id: 'preparation', label: '上工準備與衛生' },
    { id: 'numbers', label: '關鍵數字與溫度' },
    { id: 'forbidden', label: '16大不可犯禁忌' },
    { id: 'cutting_board', label: '砧板與熟食冷盤' },
    { id: 'decoration', label: '盤飾與沾料配置' },
    { id: 'toxic_substances', label: '禁用物質與添加物' },
    { id: 'five_principles', label: '五要原則與WHO' }
  ];

  const filteredCards = useMemo(() => {
    return FLASHCARDS_DATA.filter((card) => {
      const matchesCategory = selectedCategory === 'all' || card.category === selectedCategory;
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        card.title.toLowerCase().includes(q) ||
        card.frontKeyPoint.toLowerCase().includes(q) ||
        card.backExplanation.toLowerCase().includes(q) ||
        (card.keyNumbers && card.keyNumbers.toLowerCase().includes(q)) ||
        card.tags.some((t) => t.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const currentCard: Flashcard | undefined = filteredCards[currentIndex] || filteredCards[0];

  const handleFlip = () => {
    SoundManager.playFlip();
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    if (currentIndex < filteredCards.length - 1) {
      setIsFlipped(false);
      setCurrentIndex((prev) => prev + 1);
      SoundManager.playFlip();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setIsFlipped(false);
      setCurrentIndex((prev) => prev - 1);
      SoundManager.playFlip();
    }
  };

  const handleShuffle = () => {
    setIsFlipped(false);
    const randomIndex = Math.floor(Math.random() * filteredCards.length);
    setCurrentIndex(randomIndex);
    SoundManager.playFlip();
  };

  const toggleMastered = (cardId: string) => {
    const updated = new Set(masteredIds);
    if (updated.has(cardId)) {
      updated.delete(cardId);
    } else {
      updated.add(cardId);
      SoundManager.playCorrect();
    }
    setMasteredIds(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('ghp_mastered_cards', JSON.stringify(Array.from(updated)));
    }
  };

  const masteredCount = useMemo(() => {
    return FLASHCARDS_DATA.filter((c) => masteredIds.has(c.id)).length;
  }, [masteredIds]);

  const masteryPercent = Math.round((masteredCount / FLASHCARDS_DATA.length) * 100);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8 animate-in fade-in duration-200">
      {/* Title & Progress Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white rounded-3xl p-6 md:p-8 shadow-xl border border-slate-700/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-400 text-slate-950 flex items-center gap-1.5 shadow-xs">
              <Sparkles className="w-3.5 h-3.5" /> 雙面重點記憶字卡
            </span>
            <span className="text-xs text-slate-400">點擊字卡即可翻轉正面/背面</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            廚師良好作業規範 (GHP) 關鍵字卡
          </h2>
          <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
            完整收錄上工衣著、200ppm漂白水配方、廚房環境溫濕光度、仙人掌桿菌/腸炎弧菌防範、四色砧板、熟食五確認、盤飾禁忌與11大毒性添加物。
          </p>
        </div>

        {/* Mastery Progress Badge */}
        <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-4 w-full md:w-64 text-center space-y-2 shadow-inner">
          <div className="flex items-center justify-between text-xs text-slate-300">
            <span>全章節精熟進度</span>
            <span className="font-bold text-amber-400">{masteredCount} / {FLASHCARDS_DATA.length} 張</span>
          </div>
          <div className="w-full bg-slate-700 h-2.5 rounded-full overflow-hidden">
            <div 
              className="bg-gradient-to-r from-amber-400 to-emerald-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${masteryPercent}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span>掌握度 {masteryPercent}%</span>
            <button
              onClick={onGoToQuiz}
              className="text-amber-400 hover:text-amber-300 font-semibold underline underline-offset-2 cursor-pointer"
            >
              進入模擬測驗 ➔
            </button>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="搜尋關鍵字（例如：漂白水、仙人掌桿菌、砧板、200ppm、總極性化合物、溴酸鉀）..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentIndex(0);
                setIsFlipped(false);
              }}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-hidden focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all shadow-xs"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShuffle}
              className="px-3.5 py-2.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-2xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
              title="隨機抽考卡片"
            >
              <Shuffle className="w-4 h-4 text-amber-600" />
              隨機抽考
            </button>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-1" />
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setCurrentIndex(0);
                  setIsFlipped(false);
                  SoundManager.playFlip();
                }}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900 text-amber-300 font-bold shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Flashcard Card Container */}
      {filteredCards.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm space-y-3">
          <p className="text-slate-500 text-sm">找不到符合條件的字卡，請嘗試其他關鍵字或切換分類。</p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
            }}
            className="px-4 py-2 bg-amber-500 text-slate-950 font-bold rounded-xl text-xs"
          >
            重設篩選條件
          </button>
        </div>
      ) : currentCard ? (
        <div className="space-y-5">
          {/* Card Meta & Navigation Bar */}
          <div className="flex items-center justify-between text-xs text-slate-500 px-2">
            <span className="font-medium text-slate-600">
              第 <strong className="text-slate-900 font-bold">{currentIndex + 1}</strong> / {filteredCards.length} 張卡片
            </span>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200 font-semibold text-[11px]">
                {currentCard.categoryName}
              </span>
              <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[11px]">
                規範重點 #{currentCard.slideRef}
              </span>
            </div>
          </div>

          {/* Interactive 3D Flashcard */}
          <div 
            onClick={handleFlip}
            className="cursor-pointer group relative min-h-[380px] sm:min-h-[340px] perspective-1000 select-none"
          >
            <div
              className={`w-full min-h-[380px] sm:min-h-[340px] rounded-3xl transition-all duration-300 transform-style-3d p-8 flex flex-col justify-between shadow-xl border ${
                isFlipped
                  ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white border-amber-500/40 ring-2 ring-amber-400/30'
                  : 'bg-gradient-to-br from-white via-amber-50/20 to-orange-50/30 text-slate-900 border-slate-200 hover:border-amber-300 hover:shadow-2xl'
              }`}
            >
              {/* Card Header inside */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-1 rounded-xl text-xs font-bold ${
                    isFlipped 
                      ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30' 
                      : 'bg-amber-500 text-slate-950'
                  }`}>
                    {isFlipped ? '★ 規範解析與關鍵解答' : 'Q 思考重點與提問'}
                  </span>
                  <span className="text-xs font-semibold opacity-75">
                    {currentCard.title}
                  </span>
                </div>

                {/* Mastered toggle inside card */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleMastered(currentCard.id);
                  }}
                  className={`p-2 rounded-xl transition-all ${
                    masteredIds.has(currentCard.id)
                      ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/30'
                      : isFlipped
                      ? 'bg-slate-800 text-slate-400 hover:text-white'
                      : 'bg-slate-100 text-slate-400 hover:text-slate-700'
                  }`}
                  title={masteredIds.has(currentCard.id) ? '已標記精熟' : '標記為已精熟'}
                >
                  <CheckCircle2 className="w-5 h-5" />
                </button>
              </div>

              {/* Card Center Content */}
              <div className="py-6 space-y-4">
                {!isFlipped ? (
                  // Front Face
                  <div className="space-y-4">
                    <p className="text-xl sm:text-2xl font-black text-slate-900 leading-snug tracking-tight">
                      {currentCard.frontKeyPoint}
                    </p>
                    <p className="text-xs text-amber-700 font-medium bg-amber-50/80 inline-block px-3 py-1.5 rounded-lg border border-amber-200/60">
                      💡 {currentCard.frontPrompt}
                    </p>
                  </div>
                ) : (
                  // Back Face
                  <div className="space-y-4 animate-in fade-in duration-150">
                    <div className="text-sm sm:text-base text-slate-100 font-normal leading-relaxed whitespace-pre-line">
                      {currentCard.backExplanation}
                    </div>

                    {currentCard.keyNumbers && (
                      <div className="p-3 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold flex items-center gap-2">
                        <span className="px-1.5 py-0.5 rounded bg-amber-500 text-slate-950 text-[10px] uppercase font-black tracking-wide">
                          必背數值
                        </span>
                        <span>{currentCard.keyNumbers}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Card Footer inside */}
              <div className="flex items-center justify-between pt-4 border-t border-dashed border-slate-200/60 text-xs">
                <div className="flex items-center gap-1.5 flex-wrap">
                  {currentCard.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`px-2 py-0.5 rounded-md text-[11px] ${
                        isFlipped
                          ? 'bg-slate-800/80 text-slate-300'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className={`flex items-center gap-1 font-medium ${isFlipped ? 'text-amber-300' : 'text-slate-500'}`}>
                  <RotateCw className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-500" />
                  <span>{isFlipped ? '點擊翻回題目' : '點擊查看解答'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Controls Bar */}
          <div className="flex items-center justify-between gap-4 pt-2">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                currentIndex === 0
                  ? 'bg-slate-100 text-slate-300 cursor-not-allowed'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 shadow-xs'
              }`}
            >
              <ChevronLeft className="w-4 h-4" /> 上一張 (Prev)
            </button>

            {/* Jump quick dots / indicator */}
            <div className="text-xs text-slate-500 font-medium">
              快速切換：卡片 {currentIndex + 1} / {filteredCards.length}
            </div>

            <button
              onClick={handleNext}
              disabled={currentIndex === filteredCards.length - 1}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                currentIndex === filteredCards.length - 1
                  ? 'bg-slate-100 text-slate-300 cursor-not-allowed'
                  : 'bg-slate-900 text-amber-300 hover:bg-slate-800 shadow-md shadow-slate-900/10'
              }`}
            >
              下一張 (Next) <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : null}

      {/* Quick Summary Grid of All Cards */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-amber-600" />
            <h3 className="text-sm font-bold text-slate-900">卡片快速目錄一覽（點擊直接跳轉）</h3>
          </div>
          <span className="text-xs text-slate-400">綠色代表已標記精熟</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5">
          {filteredCards.map((card, idx) => {
            const isCurrent = idx === currentIndex;
            const isMastered = masteredIds.has(card.id);
            return (
              <button
                key={card.id}
                onClick={() => {
                  setCurrentIndex(idx);
                  setIsFlipped(false);
                  SoundManager.playFlip();
                }}
                className={`p-2.5 rounded-xl text-left border text-xs transition-all cursor-pointer ${
                  isCurrent
                    ? 'border-amber-500 bg-amber-50/80 font-bold text-amber-900 ring-2 ring-amber-300/60'
                    : isMastered
                    ? 'border-emerald-200 bg-emerald-50/50 text-emerald-800'
                    : 'border-slate-100 bg-slate-50/80 hover:bg-slate-100 text-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] text-slate-400 font-mono">#{idx + 1}</span>
                  {isMastered && <CheckCircle2 className="w-3 h-3 text-emerald-500" />}
                </div>
                <div className="truncate font-medium">{card.title}</div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
