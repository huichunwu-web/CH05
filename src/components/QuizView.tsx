import React, { useState, useEffect, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { QUIZ_QUESTIONS } from '../data/quizData';
import { QuizQuestion, StudentInfo, ExamResult } from '../types';
import { SoundManager } from '../utils/audio';
import { generateReportPdf } from '../utils/pdfGenerator';
import { 
  CheckCircle, 
  XCircle, 
  HelpCircle, 
  Clock, 
  RotateCcw, 
  Award, 
  FileDown, 
  Eye, 
  Volume2, 
  ShieldCheck, 
  AlertTriangle,
  Sparkles,
  ChevronRight,
  BookOpen,
  ArrowRight,
  Printer
} from 'lucide-react';

interface QuizViewProps {
  student: StudentInfo;
  onEditStudent: () => void;
  onExamComplete: (result: ExamResult) => void;
  onViewCertificate: () => void;
}

export const QuizView: React.FC<QuizViewProps> = ({
  student,
  onEditStudent,
  onExamComplete,
  onViewCertificate
}) => {
  // Fixed to 30 questions as requested
  const questionCount = 30;
  const [isInstantFeedback, setIsInstantFeedback] = useState<boolean>(true); // Immediate sound & explain
  const [examStarted, setExamStarted] = useState<boolean>(false);
  const [examSubmitted, setExamSubmitted] = useState<boolean>(false);

  // Active question set
  const [activeQuestions, setActiveQuestions] = useState<QuizQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [timerSeconds, setTimerSeconds] = useState<number>(0);
  const [examResult, setExamResult] = useState<ExamResult | null>(null);

  // Filter for wrong questions review
  const [reviewFilter, setReviewFilter] = useState<'all' | 'wrong' | 'correct'>('all');

  // Start exam setup: 30 standard questions
  const startExam = () => {
    setActiveQuestions([...QUIZ_QUESTIONS]);
    setCurrentIdx(0);
    setSelectedAnswers({});
    setTimerSeconds(0);
    setExamSubmitted(false);
    setExamResult(null);
    setExamStarted(true);
    SoundManager.playFlip();
  };

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (examStarted && !examSubmitted) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [examStarted, examSubmitted]);

  // Handle option select
  const handleSelectOption = (optionIndex: number) => {
    if (examSubmitted) return; // already submitted

    const q = activeQuestions[currentIdx];
    const isAlreadySelected = selectedAnswers[currentIdx] !== undefined;

    const newAnswers = { ...selectedAnswers, [currentIdx]: optionIndex };
    setSelectedAnswers(newAnswers);

    // Audio feedback
    if (isInstantFeedback) {
      if (optionIndex === q.correctIndex) {
        SoundManager.playCorrect();
      } else {
        SoundManager.playIncorrect();
      }
    } else {
      SoundManager.playFlip();
    }
  };

  // Submit exam calculation
  const handleSubmitExam = () => {
    let correct = 0;
    const userAnswersList: ExamResult['userAnswers'] = [];
    const breakdown: Record<string, { total: number; correct: number }> = {};

    activeQuestions.forEach((q, idx) => {
      const selected = selectedAnswers[idx] ?? -1;
      const isCorrect = selected === q.correctIndex;
      if (isCorrect) correct += 1;

      userAnswersList.push({
        questionId: q.id,
        selectedIndex: selected,
        isCorrect
      });

      if (!breakdown[q.categoryName]) {
        breakdown[q.categoryName] = { total: 0, correct: 0 };
      }
      breakdown[q.categoryName].total += 1;
      if (isCorrect) breakdown[q.categoryName].correct += 1;
    });

    const score = Math.round((correct / activeQuestions.length) * 100);
    let rankTitle = '待加強實習生';
    if (score >= 90) rankTitle = '卓越特級主廚 (優等)';
    else if (score >= 70) rankTitle = '合格餐飲廚師 (檢定通過)';

    const result: ExamResult = {
      id: `EX-${Date.now().toString(36)}`,
      timestamp: Date.now(),
      student,
      score,
      totalQuestions: activeQuestions.length,
      correctCount: correct,
      wrongCount: activeQuestions.length - correct,
      timeSpentSeconds: timerSeconds,
      categoryBreakdown: breakdown,
      userAnswers: userAnswersList,
      rankTitle
    };

    setExamResult(result);
    setExamSubmitted(true);
    onExamComplete(result);

    // Play completion sound & confetti
    if (score >= 70) {
      SoundManager.playFanfare();
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    } else {
      SoundManager.playIncorrect();
    }
  };

  const currentQ = activeQuestions[currentIdx];
  const answeredCount = Object.keys(selectedAnswers).length;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8 animate-in fade-in duration-200">
      {/* Student Profile Reminder Banner */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-700 font-black">
            應考
          </div>
          <div>
            <div className="text-xs text-slate-400">當前應考人學籍資訊</div>
            <div className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <span>學號：{student.studentId || '尚未填寫學號'}</span>
              <span>·</span>
              <span>姓名：{student.name || '尚未填寫姓名'}</span>
              {student.department && (
                <span className="text-xs font-normal text-slate-500">({student.department})</span>
              )}
            </div>
          </div>
        </div>

        <button
          onClick={onEditStudent}
          className="px-3.5 py-1.5 rounded-xl text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
        >
          修改學號/姓名
        </button>
      </div>

      {/* State 1: Start Screen */}
      {!examStarted ? (
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-slate-700/60 space-y-8">
          <div className="max-w-2xl space-y-3">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-400 text-slate-950 inline-flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> GHP 國家級餐飲檢定模擬試卷
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              廚師良好作業規範 (GHP) 模擬測驗
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              嚴選 30 題重點考題，題庫嚴格比照 GHP 作業規範標準。每題皆包含詳細法規與衛生安全解析，並提供答題正確/錯誤即時音效反饋。測驗合格可立即產出專屬合格證書與成效 PDF！
            </p>
          </div>

          {/* Exam Mode Settings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-800/80 p-6 rounded-2xl border border-slate-700/80">
            {/* Setting: Exam Scope Info */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-amber-300 uppercase tracking-wider block">
                測驗題數規格
              </label>
              <div className="p-4 rounded-xl border border-amber-400/40 bg-amber-400/10 text-white space-y-1">
                <div className="text-base font-extrabold text-amber-300 flex items-center gap-2">
                  <span>標準檢定：共 30 題</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 font-bold">全卷考核</span>
                </div>
                <div className="text-xs text-slate-300">
                  涵蓋服裝儀容、溫濕光度、冷鏈冷藏、16大禁忌、砧板分色、熟食切防與禁用化學物。
                </div>
              </div>
            </div>

            {/* Setting: Instant feedback vs official */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-amber-300 uppercase tracking-wider block">
                答題音效與反饋模式
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setIsInstantFeedback(true)}
                  className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                    isInstantFeedback
                      ? 'border-amber-400 bg-amber-400/20 text-white font-bold ring-2 ring-amber-400/30'
                      : 'border-slate-700 bg-slate-900/60 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="text-xs font-bold flex items-center gap-1.5 text-emerald-400">
                    <Volume2 className="w-3.5 h-3.5" /> 即時音效學習
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1">選答即發出音效並顯示詳解</div>
                </button>

                <button
                  onClick={() => setIsInstantFeedback(false)}
                  className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                    !isInstantFeedback
                      ? 'border-amber-400 bg-amber-400/20 text-white font-bold ring-2 ring-amber-400/30'
                      : 'border-slate-700 bg-slate-900/60 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="text-xs font-bold flex items-center gap-1.5 text-amber-400">
                    <ShieldCheck className="w-3.5 h-3.5" /> 正式模擬考試
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1">作答不透題，交卷後統一結算</div>
                </button>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
            <button
              onClick={startExam}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-base shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              開始進行測驗 (共 30 題)
              <ArrowRight className="w-5 h-5" />
            </button>
            <span className="text-xs text-slate-400">
              及格標準：70 分以上合格即可獲頒認證證書
            </span>
          </div>
        </div>
      ) : !examSubmitted ? (
        /* State 2: Taking the Exam */
        <div className="space-y-6">
          {/* Progress & Timer Bar */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="text-sm font-bold text-slate-900">
                第 <span className="text-amber-600 text-lg">{currentIdx + 1}</span> / {activeQuestions.length} 題
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-600">
                已答：{answeredCount} / {activeQuestions.length}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                {currentQ.categoryName}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-xl">
                <Clock className="w-3.5 h-3.5 text-amber-600" />
                {String(Math.floor(timerSeconds / 60)).padStart(2, '0')}:
                {String(timerSeconds % 60).padStart(2, '0')}
              </div>

              {answeredCount === activeQuestions.length && (
                <button
                  onClick={handleSubmitExam}
                  className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
                >
                  完成作答，立即交卷
                </button>
              )}
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-lg space-y-6">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="text-xs text-slate-400 font-medium">
                  規範重點編號 #{currentQ.slideRef}
                </div>
                <h3 className="text-lg sm:text-xl font-black text-slate-900 leading-snug">
                  {currentQ.question}
                </h3>
              </div>
            </div>

            {/* Options list */}
            <div className="space-y-3">
              {currentQ.options.map((option, optIdx) => {
                const isSelected = selectedAnswers[currentIdx] === optIdx;
                const showInstant = isInstantFeedback && isSelected;
                const isCorrect = optIdx === currentQ.correctIndex;

                let btnStyle = 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-800';
                if (isSelected) {
                  if (isInstantFeedback) {
                    btnStyle = isCorrect
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold ring-2 ring-emerald-300'
                      : 'border-rose-500 bg-rose-50 text-rose-950 font-bold ring-2 ring-rose-300';
                  } else {
                    btnStyle = 'border-amber-500 bg-amber-50/80 text-amber-950 font-bold ring-2 ring-amber-300';
                  }
                }

                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelectOption(optIdx)}
                    className={`w-full p-4 rounded-2xl border text-left text-sm transition-all flex items-start gap-3 cursor-pointer ${btnStyle}`}
                  >
                    <span className={`w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 ${
                      isSelected
                        ? isInstantFeedback
                          ? isCorrect
                            ? 'bg-emerald-600 text-white'
                            : 'bg-rose-600 text-white'
                          : 'bg-amber-600 text-white'
                        : 'bg-slate-100 text-slate-600'
                    }`}>
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <span className="flex-1 leading-relaxed">{option}</span>
                    {isInstantFeedback && isSelected && (
                      <span className="shrink-0 text-xs font-bold">
                        {isCorrect ? (
                          <span className="text-emerald-600 flex items-center gap-1">
                            <CheckCircle className="w-4 h-4" /> 答對！
                          </span>
                        ) : (
                          <span className="text-rose-600 flex items-center gap-1">
                            <XCircle className="w-4 h-4" /> 答錯
                          </span>
                        )}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Instant feedback explanation panel */}
            {isInstantFeedback && selectedAnswers[currentIdx] !== undefined && (
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 animate-in fade-in duration-150">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                  <HelpCircle className="w-4 h-4 text-amber-600" />
                  <span>規範標準解答解析：</span>
                  <span className="text-emerald-700 font-extrabold">
                    正確答案為 ({String.fromCharCode(65 + currentQ.correctIndex)})
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {currentQ.explanation}
                </p>
                {currentQ.highlightKeyword && (
                  <div className="text-[11px] text-amber-800 font-medium">
                    📌 核心速記關鍵詞：<strong>{currentQ.highlightKeyword}</strong>
                  </div>
                )}
              </div>
            )}

            {/* Stepper buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <button
                onClick={() => {
                  if (currentIdx > 0) {
                    setCurrentIdx((prev) => prev - 1);
                    SoundManager.playFlip();
                  }
                }}
                disabled={currentIdx === 0}
                className={`px-4 py-2 rounded-xl text-xs font-semibold ${
                  currentIdx === 0
                    ? 'text-slate-300 cursor-not-allowed'
                    : 'text-slate-700 hover:bg-slate-100 cursor-pointer'
                }`}
              >
                ← 上一題
              </button>

              <div className="flex items-center gap-2">
                {currentIdx < activeQuestions.length - 1 ? (
                  <button
                    onClick={() => {
                      setCurrentIdx((prev) => prev + 1);
                      SoundManager.playFlip();
                    }}
                    className="px-5 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    下一題 →
                  </button>
                ) : (
                  <button
                    onClick={handleSubmitExam}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-extrabold text-xs shadow-lg shadow-emerald-500/20 transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <CheckCircle className="w-4 h-4" /> 交卷結算成績
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Quick jump question numbers matrix */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>題號快速切換導航：</span>
              <span>灰色=未答，藍/黃=已答</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {activeQuestions.map((_, i) => {
                const isAnswered = selectedAnswers[i] !== undefined;
                const isCur = i === currentIdx;
                return (
                  <button
                    key={i}
                    onClick={() => {
                      setCurrentIdx(i);
                      SoundManager.playFlip();
                    }}
                    className={`w-8 h-8 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      isCur
                        ? 'bg-amber-500 text-slate-950 ring-2 ring-amber-300'
                        : isAnswered
                        ? 'bg-slate-800 text-white'
                        : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                    }`}
                  >
                    {i + 1}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        /* State 3: Exam Results Screen */
        examResult && (
          <div className="space-y-8 animate-in zoom-in-95 duration-200">
            {/* Scorecard Hero */}
            <div className={`rounded-3xl p-8 sm:p-10 shadow-2xl border ${
              examResult.score >= 70
                ? 'bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-white border-emerald-500/40'
                : 'bg-gradient-to-br from-slate-900 via-rose-950 to-slate-900 text-white border-rose-500/40'
            }`}>
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-2 text-center md:text-left">
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      examResult.score >= 70
                        ? 'bg-emerald-400 text-slate-950'
                        : 'bg-rose-400 text-slate-950'
                    }`}>
                      {examResult.score >= 70 ? '★ 測驗合格 PASSED' : '⚠️ 需再加強 RETEST'}
                    </span>
                    <span className="text-xs text-slate-400">
                      應試時間：{Math.floor(examResult.timeSpentSeconds / 60)} 分 {examResult.timeSpentSeconds % 60} 秒
                    </span>
                  </div>

                  <h2 className="text-3xl sm:text-4xl font-black text-white">
                    {student.name || '應試學生'} 的評量成績
                  </h2>

                  <div className="text-xs text-slate-300 flex flex-wrap items-center justify-center md:justify-start gap-3">
                    <span>學號：<strong>{student.studentId || '無學號'}</strong></span>
                    <span>·</span>
                    <span>班級：{student.department || '未設定'}</span>
                    <span>·</span>
                    <span>榮譽稱號：<strong className="text-amber-300">{examResult.rankTitle}</strong></span>
                  </div>
                </div>

                {/* Score Circle / Badge */}
                <div className="bg-slate-800/90 border border-slate-700/80 rounded-3xl p-6 text-center min-w-[200px] shadow-inner">
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
                    最終測驗總分
                  </div>
                  <div className="text-5xl sm:text-6xl font-black tracking-tight text-amber-400 my-1">
                    {examResult.score}
                    <span className="text-lg font-normal text-slate-400 ml-1">分</span>
                  </div>
                  <div className="text-xs text-slate-300">
                    答對 {examResult.correctCount} / {examResult.totalQuestions} 題 ({Math.round((examResult.correctCount / examResult.totalQuestions) * 100)}%)
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-6 mt-6 border-t border-slate-700/60">
                <button
                  onClick={() => generateReportPdf(examResult)}
                  className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/20 flex items-center gap-2 transition-all cursor-pointer"
                >
                  <FileDown className="w-4 h-4" /> 下載正式 PDF 報告書 (.pdf)
                </button>

                <button
                  onClick={onViewCertificate}
                  className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/20 flex items-center gap-2 transition-all cursor-pointer"
                >
                  <Award className="w-4 h-4" /> 檢視官方合格證書與列印
                </button>

                <button
                  onClick={startExam}
                  className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-600 flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" /> 重新測驗一次
                </button>
              </div>
            </div>

            {/* Category Breakdown Bars */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                各章節衛生專業掌握度分析
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(examResult.categoryBreakdown).map(([catName, stats]) => {
                  const percent = Math.round((stats.correct / stats.total) * 100) || 0;
                  return (
                    <div key={catName} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                      <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                        <span>{catName}</span>
                        <span className="font-mono text-slate-900">{stats.correct} / {stats.total} ({percent}%)</span>
                      </div>
                      <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            percent >= 80 ? 'bg-emerald-500' : percent >= 60 ? 'bg-amber-500' : 'bg-rose-500'
                          }`}
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Review Wrong & Correct Questions */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-amber-600" />
                    試題詳細解析與盲點複習
                  </h3>
                  <p className="text-xs text-slate-500">逐題對照 GHP 規範與標準答案</p>
                </div>

                {/* Filter tags */}
                <div className="flex items-center gap-2 text-xs">
                  <button
                    onClick={() => setReviewFilter('all')}
                    className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                      reviewFilter === 'all'
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    全部 ({activeQuestions.length})
                  </button>
                  <button
                    onClick={() => setReviewFilter('wrong')}
                    className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                      reviewFilter === 'wrong'
                        ? 'bg-rose-600 text-white font-bold'
                        : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
                    }`}
                  >
                    錯題 ({examResult.wrongCount})
                  </button>
                  <button
                    onClick={() => setReviewFilter('correct')}
                    className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                      reviewFilter === 'correct'
                        ? 'bg-emerald-600 text-white font-bold'
                        : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                    }`}
                  >
                    答對 ({examResult.correctCount})
                  </button>
                </div>
              </div>

              {/* Questions review list */}
              <div className="space-y-4">
                {activeQuestions.map((q, idx) => {
                  const userAnsIdx = selectedAnswers[idx] ?? -1;
                  const isCorrect = userAnsIdx === q.correctIndex;

                  if (reviewFilter === 'wrong' && isCorrect) return null;
                  if (reviewFilter === 'correct' && !isCorrect) return null;

                  return (
                    <div
                      key={q.id}
                      className={`p-5 rounded-2xl border transition-all ${
                        isCorrect
                          ? 'border-emerald-200 bg-emerald-50/20'
                          : 'border-rose-200 bg-rose-50/20'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div className="flex items-center gap-2">
                          <span className={`w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center ${
                            isCorrect ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
                          }`}>
                            {idx + 1}
                          </span>
                          <span className="text-xs font-bold text-slate-700">
                            [{q.categoryName}]
                          </span>
                          <span className="text-[11px] text-slate-400">
                            規範重點 #{q.slideRef}
                          </span>
                        </div>

                        <span className={`text-xs font-bold flex items-center gap-1 ${
                          isCorrect ? 'text-emerald-700' : 'text-rose-700'
                        }`}>
                          {isCorrect ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                          {isCorrect ? '答對' : '答錯'}
                        </span>
                      </div>

                      <p className="text-sm font-bold text-slate-900 mb-3">
                        {q.question}
                      </p>

                      <div className="space-y-1.5 mb-3 text-xs">
                        {q.options.map((opt, optIdx) => {
                          const isUserChoice = userAnsIdx === optIdx;
                          const isRealCorrect = optIdx === q.correctIndex;

                          let optionClass = 'text-slate-600 bg-white/60';
                          if (isRealCorrect) {
                            optionClass = 'bg-emerald-100 text-emerald-900 font-bold border border-emerald-300';
                          } else if (isUserChoice && !isRealCorrect) {
                            optionClass = 'bg-rose-100 text-rose-900 line-through border border-rose-300';
                          }

                          return (
                            <div key={optIdx} className={`p-2 rounded-xl flex items-center gap-2 ${optionClass}`}>
                              <span className="font-mono font-bold">({String.fromCharCode(65 + optIdx)})</span>
                              <span>{opt}</span>
                              {isRealCorrect && <span className="ml-auto text-emerald-700 text-[11px]">✔ 正確答案</span>}
                              {isUserChoice && !isRealCorrect && <span className="ml-auto text-rose-700 text-[11px]">✖ 你的選擇</span>}
                            </div>
                          );
                        })}
                      </div>

                      <div className="p-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-700 leading-relaxed">
                        <strong className="text-amber-800">★ 衛生規範解析：</strong> {q.explanation}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};
