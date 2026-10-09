import React from 'react';
import { StudentInfo, ExamResult } from '../types';
import { 
  BookOpen, 
  CheckCircle, 
  Award, 
  Droplets, 
  FileDown, 
  User, 
  Edit3, 
  Sparkles, 
  ShieldCheck, 
  TrendingUp, 
  Volume2,
  ChevronRight,
  AlertTriangle
} from 'lucide-react';
import { SoundManager } from '../utils/audio';

interface DashboardViewProps {
  student: StudentInfo;
  onEditStudent: () => void;
  onNavigateTab: (tab: string) => void;
  latestExamResult: ExamResult | null;
  masteredCardsCount: number;
  totalCardsCount: number;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  student,
  onEditStudent,
  onNavigateTab,
  latestExamResult,
  masteredCardsCount,
  totalCardsCount
}) => {
  const cardPercent = Math.round((masteredCardsCount / totalCardsCount) * 100);

  const modules = [
    {
      id: 'flashcards',
      title: '學習字卡重點複習',
      desc: '29張雙面重點卡片，全覽服裝、洗手6步驟、溫控數字、16大禁忌與黑名單化學物。',
      icon: BookOpen,
      color: 'from-amber-500 to-orange-500',
      badge: `${masteredCardsCount}/${totalCardsCount} 張已精熟`,
      actionText: '開始翻卡背誦',
    },
    {
      id: 'quiz',
      title: '國家級模擬測驗',
      desc: '30題精準檢定題庫，支援即時答題音效 (Ding/Buzz) 與正式考試模式，考畢產生成績單。',
      icon: CheckCircle,
      color: 'from-emerald-500 to-teal-600',
      badge: latestExamResult ? `最新得分：${latestExamResult.score}分` : '即時音效答題',
      actionText: '進入模擬測驗',
    },
    {
      id: 'scenarios',
      title: '廚房實務情境分析',
      desc: '4大真實餐廳致命失誤案例：油炸油超標、生菜盤飾污染、砧板生熟混用與非法化學添加物。',
      icon: Award,
      color: 'from-blue-500 to-indigo-600',
      badge: '4大實務案例',
      actionText: '開始衛生稽核',
    },
    {
      id: 'calculator',
      title: '200ppm漂白水與關鍵數字',
      desc: '次氯酸鈉濃度取用量計算器（5L水1~10%原液）、蔬菜100ppm稀釋與環境溫濕度速查。',
      icon: Droplets,
      color: 'from-cyan-500 to-blue-500',
      badge: '200ppm換算公式',
      actionText: '開啟配製計算器',
    },
    {
      id: 'certificate',
      title: 'PDF合格證書與成效報告',
      desc: '一鍵產出具備防偽認證編號之 GHP 合格證書與完整考評分析 PDF，支援下載與列印。',
      icon: FileDown,
      color: 'from-purple-500 to-pink-600',
      badge: latestExamResult && latestExamResult.score >= 70 ? '檢定合格' : '可隨時匯出',
      actionText: '檢視/輸出 PDF',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8 animate-in fade-in duration-200">
      {/* Welcome & Student Status Hero Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-slate-700/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-400 text-slate-950 flex items-center gap-1.5 shadow-xs">
              <Sparkles className="w-3.5 h-3.5" /> 數位互動學習與檢定系統
            </span>
            <span className="text-xs text-slate-400">Chapter 5 廚師良好作業規範 (GHP)</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
            歡迎，{student.name || '餐飲實習廚師'}！
          </h2>

          <p className="text-sm text-slate-300 leading-relaxed">
            學號：<strong>{student.studentId || '尚未登錄'}</strong>
            {student.department && <span> · 班級：<strong>{student.department}</strong></span>}
            。本系統專為廚師安全衛生法規考核設計，包含重點字卡、模擬測驗與答題音效、實務稽核案例與 PDF 報告輸出。
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                SoundManager.playFlip();
                onNavigateTab('quiz');
              }}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs shadow-md shadow-amber-500/20 flex items-center gap-1.5 cursor-pointer"
            >
              立即開始模擬測驗 <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={onEditStudent}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 border border-slate-600 flex items-center gap-1.5 cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" /> 修改學生姓名/學號
            </button>
          </div>
        </div>

        {/* Quick Stats Card */}
        <div className="bg-slate-800/90 border border-slate-700/80 rounded-3xl p-6 w-full md:w-72 shadow-inner space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">學習成效總覽</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/20 text-emerald-300 font-semibold">
              系統紀錄中
            </span>
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span>重點字卡精熟度</span>
                <span className="font-bold text-amber-400">{masteredCardsCount}/{totalCardsCount} ({cardPercent}%)</span>
              </div>
              <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-amber-400 to-emerald-400 h-full rounded-full transition-all"
                  style={{ width: `${cardPercent}%` }}
                />
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-700/60 flex items-center justify-between text-xs">
              <span className="text-slate-400">最新測驗分數</span>
              <span className="font-extrabold text-base text-amber-400">
                {latestExamResult ? `${latestExamResult.score} 分` : '尚未測驗'}
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-700/60 flex items-center justify-between text-xs">
              <span className="text-slate-400">答題音效狀態</span>
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <Volume2 className="w-3.5 h-3.5" /> 已啟用
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Modules Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-amber-600" />
            功能導覽與學習路徑
          </h3>
          <span className="text-xs text-slate-500">依據 GHP 完整作業規範架構</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {modules.map((m) => {
            const Icon = m.icon;
            return (
              <div
                key={m.id}
                onClick={() => {
                  SoundManager.playFlip();
                  onNavigateTab(m.id);
                }}
                className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:border-amber-300 transition-all cursor-pointer group flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${m.color} flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700">
                      {m.badge}
                    </span>
                  </div>

                  <h4 className="text-base font-black text-slate-900 group-hover:text-amber-600 transition-colors">
                    {m.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {m.desc}
                  </p>
                </div>

                <div className="pt-2 flex items-center text-xs font-bold text-amber-700 group-hover:text-amber-800">
                  <span>{m.actionText}</span>
                  <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Textbook Curriculum Quick Summary */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-indigo-600" />
          《Chapter 5 廚師良好作業規範》全章綱要核心導讀
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
            <span className="font-bold text-slate-800">壹、廚師上工前的準備</span>
            <p className="text-slate-500 text-[11px]">整齊白色衣帽、更衣室換著、遮掩前緣頭髮、禁飾品指甲油、200ppm漂白水調配。</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
            <span className="font-bold text-slate-800">貳、從業人員個人衛生</span>
            <p className="text-slate-500 text-[11px]">手部清潔、洗手6步驟（搓洗至少20秒）、手部創傷膿瘡嚴禁碰食品防食物中毒。</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
            <span className="font-bold text-slate-800">參、廚師應詳知關鍵數字</span>
            <p className="text-slate-500 text-[11px]">廚房比1:3、冷凍≤-18℃、冷藏≤7℃、細菌生長帶16~49℃、FAT TOM、殺菌四法、油炸TPC≤25%。</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
            <span className="font-bold text-slate-800">肆 & 陸、廚師絕不可犯的錯</span>
            <p className="text-slate-500 text-[11px]">禁檳榔香菸護味覺；16大禁忌如鹽水洗海鮮(腸炎弧菌)、室溫放涼米飯(仙人掌桿菌)。</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
            <span className="font-bold text-slate-800">柒 & 捌、砧板與熟食切割</span>
            <p className="text-slate-500 text-[11px]">四色砧板(白熟/綠菜/紅肉/藍魚)、木質限生食加氯水、熟食切割五確認防交叉污染。</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
            <span className="font-bold text-slate-800">拾 & 拾壹、冷盤生食與盤飾</span>
            <p className="text-slate-500 text-[11px]">冷盤專用洗手台與消毒液；盤飾不多過主菜、未減菌不碰主菜、生鮮芫荽禁用接觸熟食。</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
            <span className="font-bold text-slate-800">拾參 & 拾肆、沾料與五要原則</span>
            <p className="text-slate-500 text-[11px]">安全第一美味為次；危險菜餚淋安全沾料；TFDA五要原則（加熱中心溫度＞70℃）。</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
            <span className="font-bold text-slate-800">拾陸、絕對禁用之物質</span>
            <p className="text-slate-500 text-[11px]">未核可食材(何首烏/板藍根)；11種毒素(硼砂、吊白塊、蘇丹紅、皂黃)；致癌物溴酸鉀。</p>
          </div>
        </div>
      </div>
    </div>
  );
};
