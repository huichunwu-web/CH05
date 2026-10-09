import React, { useState } from 'react';
import { SCENARIOS_DATA } from '../data/scenariosData';
import { ScenarioCase, StudentInfo } from '../types';
import { SoundManager } from '../utils/audio';
import { 
  AlertOctagon, 
  CheckCircle, 
  HelpCircle, 
  ShieldAlert, 
  Sparkles, 
  Eye, 
  ChevronDown, 
  ChevronUp, 
  Utensils, 
  FileText,
  Check,
  X
} from 'lucide-react';

interface ScenarioViewProps {
  student: StudentInfo;
}

export const ScenarioView: React.FC<ScenarioViewProps> = ({ student }) => {
  const [selectedCaseId, setSelectedCaseId] = useState<string>(SCENARIOS_DATA[0].id);
  const [revealedAnalysis, setRevealedAnalysis] = useState<Record<string, boolean>>({});
  const [scenarioAnswers, setScenarioAnswers] = useState<Record<string, number>>({});

  const currentCase = SCENARIOS_DATA.find((c) => c.id === selectedCaseId) || SCENARIOS_DATA[0];

  const handleToggleReveal = (caseId: string) => {
    SoundManager.playFlip();
    setRevealedAnalysis((prev) => ({
      ...prev,
      [caseId]: !prev[caseId]
    }));
  };

  const handleAnswerQuiz = (caseId: string, optIdx: number) => {
    setScenarioAnswers((prev) => ({ ...prev, [caseId]: optIdx }));
    if (optIdx === currentCase.quizQuestion.correctIndex) {
      SoundManager.playCorrect();
    } else {
      SoundManager.playIncorrect();
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-700/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-400 text-slate-950 flex items-center gap-1.5 shadow-xs">
              <Sparkles className="w-3.5 h-3.5" /> 實務廚房衛生稽核
            </span>
            <span className="text-xs text-slate-400">真實餐飲違規情境與病原分析</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            廚房實務情境分析與危機糾錯
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            化身專業衛生督導員（Inspector），逐一審視 4 大常見廚房重大致命錯誤：油炸油超標、生鮮香菜盤飾污染、砧板生熟混用與非法化學添加劑。
          </p>
        </div>

        <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-4 text-center shrink-0 w-full md:w-56">
          <div className="text-xs text-slate-400">當前稽核員</div>
          <div className="text-sm font-bold text-amber-300 mt-0.5">
            {student.name ? `${student.name} (${student.studentId || '無學號'})` : '實習廚房督導'}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">共 4 宗實例全數收錄</div>
        </div>
      </div>

      {/* Case Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {SCENARIOS_DATA.map((sc, idx) => {
          const isSelected = sc.id === selectedCaseId;
          const isAnswered = scenarioAnswers[sc.id] !== undefined;
          return (
            <button
              key={sc.id}
              onClick={() => {
                setSelectedCaseId(sc.id);
                SoundManager.playFlip();
              }}
              className={`p-3 rounded-2xl text-left border transition-all cursor-pointer ${
                isSelected
                  ? 'border-amber-500 bg-amber-50/90 text-amber-950 font-bold shadow-md ring-2 ring-amber-300/60'
                  : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                <span>案例 #{idx + 1}</span>
                {isAnswered && <span className="text-emerald-600 font-bold">已評量</span>}
              </div>
              <div className="text-xs font-bold truncate">{sc.title.split('：')[1]}</div>
            </button>
          );
        })}
      </div>

      {/* Selected Case Inspection Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
        {/* Case Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/40 inline-block mb-1">
              🚨 稽核現場案例
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              {currentCase.title}
            </h3>
            <p className="text-xs text-slate-300">{currentCase.subtitle}</p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <span className="px-3 py-1 rounded-xl bg-slate-800 border border-slate-700 text-xs text-slate-300">
              崗位：{currentCase.kitchenRole}
            </span>
            <span className="px-3 py-1 rounded-xl bg-amber-500/20 border border-amber-500/40 text-xs text-amber-300">
              規範重點 #{currentCase.slideRef}
            </span>
          </div>
        </div>

        {/* Case Description Body */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-2">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Utensils className="w-3.5 h-3.5 text-amber-600" />
              情境現場還原與作業過程：
            </h4>
            <p className="text-sm text-slate-800 leading-relaxed font-medium">
              {currentCase.storyDescription}
            </p>
          </div>

          {/* Toggle Reveal Button */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => handleToggleReveal(currentCase.id)}
              className="px-5 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-amber-300 font-bold text-xs flex items-center gap-2 shadow-md transition-all cursor-pointer"
            >
              <Eye className="w-4 h-4" />
              {revealedAnalysis[currentCase.id] ? '隱藏專家稽核診斷報告' : '點擊揭露專家稽核診斷與違規致病菌'}
              {revealedAnalysis[currentCase.id] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            <span className="text-xs text-slate-400">
              {currentCase.keyRegulationRef}
            </span>
          </div>

          {/* Detailed Analysis Panel */}
          {revealedAnalysis[currentCase.id] && (
            <div className="space-y-6 pt-2 animate-in fade-in duration-150">
              {/* Bad practices identified */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-rose-800 flex items-center gap-2">
                  <AlertOctagon className="w-4 h-4 text-rose-600" />
                  現場重大違規缺失與危害分析（Violations & Hazards）
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentCase.badPractices.map((bp, i) => (
                    <div key={i} className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200 space-y-2">
                      <div className="text-xs font-bold text-rose-900 flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded-full bg-rose-600 text-white flex items-center justify-center text-[10px]">
                          {i + 1}
                        </span>
                        <span>{bp.point}</span>
                      </div>
                      <div className="text-xs text-slate-700">
                        <strong className="text-rose-950">法規規範：</strong> {bp.violationRule}
                      </div>
                      <div className="text-xs text-rose-800 font-semibold bg-white/70 p-2 rounded-xl border border-rose-100">
                        ⚠️ <strong>致病原／危害後果：</strong> {bp.riskAndPathogen}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Standard Corrective Procedure (SOP) */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-emerald-800 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  良好作業規範 (GHP) 標準糾正程序（Corrective SOP）
                </h4>

                <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2">
                  {currentCase.correctStandardProcedure.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-800">
                      <span className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold">
                        ✓
                      </span>
                      <span className="leading-relaxed">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Scenario Mini Quiz */}
          <div className="bg-amber-50/60 rounded-2xl p-6 border border-amber-200 space-y-4">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-amber-700" />
              <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider">
                本案例情境現場考核評量題（點選即時發出答題音效）：
              </h4>
            </div>

            <p className="text-sm font-bold text-slate-900">
              {currentCase.quizQuestion.question}
            </p>

            <div className="space-y-2">
              {currentCase.quizQuestion.options.map((opt, optIdx) => {
                const isSelected = scenarioAnswers[currentCase.id] === optIdx;
                const isCorrect = optIdx === currentCase.quizQuestion.correctIndex;
                const hasAnswered = scenarioAnswers[currentCase.id] !== undefined;

                let btnClass = 'border-slate-200 bg-white hover:bg-amber-50/80 text-slate-800';
                if (hasAnswered) {
                  if (isCorrect) {
                    btnClass = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold ring-2 ring-emerald-300';
                  } else if (isSelected && !isCorrect) {
                    btnClass = 'border-rose-500 bg-rose-50 text-rose-950 font-bold ring-2 ring-rose-300';
                  }
                }

                return (
                  <button
                    key={optIdx}
                    onClick={() => handleAnswerQuiz(currentCase.id, optIdx)}
                    className={`w-full p-3.5 rounded-xl border text-left text-xs transition-all flex items-center justify-between cursor-pointer ${btnClass}`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-5 h-5 rounded-md bg-slate-100 text-slate-700 font-bold text-[10px] flex items-center justify-center">
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span>{opt}</span>
                    </div>

                    {hasAnswered && isCorrect && (
                      <span className="text-emerald-700 font-bold flex items-center gap-1 text-[11px]">
                        <Check className="w-3.5 h-3.5" /> 正確解答
                      </span>
                    )}
                    {hasAnswered && isSelected && !isCorrect && (
                      <span className="text-rose-700 font-bold flex items-center gap-1 text-[11px]">
                        <X className="w-3.5 h-3.5" /> 錯誤選擇
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {scenarioAnswers[currentCase.id] !== undefined && (
              <div className="p-3.5 rounded-xl bg-white border border-amber-200 text-xs text-slate-700 leading-relaxed animate-in fade-in duration-150">
                <strong className="text-amber-800">★ 衛生督導解析：</strong> {currentCase.quizQuestion.explanation}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
