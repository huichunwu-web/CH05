import React, { useState } from 'react';
import { StudentInfo, ExamResult } from '../types';
import { generateReportPdf, formatDate } from '../utils/pdfGenerator';
import { 
  FileDown, 
  Printer, 
  Award, 
  CheckCircle2, 
  ShieldCheck, 
  User, 
  Edit3, 
  Calendar, 
  Hash, 
  Stamp,
  School,
  Share2
} from 'lucide-react';

interface CertificateViewProps {
  student: StudentInfo;
  latestResult: ExamResult | null;
  onEditStudent: () => void;
  onGoToQuiz: () => void;
}

export const CertificateView: React.FC<CertificateViewProps> = ({
  student,
  latestResult,
  onEditStudent,
  onGoToQuiz
}) => {
  const [certType, setCertType] = useState<'certificate' | 'full_report'>('certificate');

  // Fallback default exam record if student hasn't taken exam yet
  const dummyResult: ExamResult = {
    id: 'GHP-2026-DEMO',
    timestamp: Date.now(),
    student,
    score: 90,
    totalQuestions: 30,
    correctCount: 27,
    wrongCount: 3,
    timeSpentSeconds: 520,
    categoryBreakdown: {
      '上工準備與衛生': { total: 4, correct: 4 },
      '關鍵數字與溫度': { total: 6, correct: 5 },
      '16大不可犯禁忌': { total: 4, correct: 3 },
      '砧板與熟食冷盤': { total: 3, correct: 3 },
      '盤飾與沾料配置': { total: 2, correct: 2 },
      '禁用物質與添加物': { total: 1, correct: 0 },
    },
    userAnswers: [],
    rankTitle: '合格餐飲廚師 (檢定通過)'
  };

  const activeResult = latestResult || dummyResult;
  const isPassed = activeResult.score >= 70;
  const certDate = formatDate(activeResult.timestamp);

  const handleDownloadPdf = () => {
    generateReportPdf(activeResult);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8 animate-in fade-in duration-200">
      {/* Top Controller Bar (Hidden when printing) */}
      <div className="print:hidden bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-700/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-400 text-slate-950 inline-flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5" /> 官方合格認證與 PDF 輸出中心
          </span>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            廚師良好作業規範 (GHP) 認證證書暨成效報告
          </h2>
          <p className="text-sm text-slate-300 max-w-xl leading-relaxed">
            系統支援直接匯出官方 PDF 文件、瀏覽器高清列印與存為 PDF，完整包含學生學號、姓名、測驗分數、章節雷達分析與指導主廚簽核欄。
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
          <button
            onClick={handleDownloadPdf}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <FileDown className="w-4 h-4" /> 下載正式 PDF (.pdf)
          </button>

          <button
            onClick={handlePrint}
            className="px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4" /> 列印 / 存為 PDF
          </button>
        </div>
      </div>

      {/* Switch Style & Edit Info Toolbar (Hidden when printing) */}
      <div className="print:hidden flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCertType('certificate')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              certType === 'certificate'
                ? 'bg-slate-900 text-amber-300 shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            榮譽檢定證書樣式 (Certificate)
          </button>
          <button
            onClick={() => setCertType('full_report')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              certType === 'full_report'
                ? 'bg-slate-900 text-amber-300 shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            完整學習評量成效報告書 (Full Report)
          </button>
        </div>

        <div className="flex items-center gap-3">
          {!latestResult && (
            <span className="text-xs text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
              ⚠️ 目前顯示示範預覽，建議先參加模擬測驗
            </span>
          )}
          <button
            onClick={onEditStudent}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5" /> 修改學生姓名/學號
          </button>
        </div>
      </div>

      {/* Printable Certificate Page */}
      <div 
        id="official-ghp-certificate"
        className="bg-white rounded-3xl p-8 sm:p-14 border-4 border-double border-amber-600/40 shadow-2xl relative overflow-hidden print:p-8 print:m-0 print:border-4 print:shadow-none print:w-full print:rounded-none"
      >
        {/* Decorative corner motifs */}
        <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-amber-600 pointer-events-none" />
        <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-amber-600 pointer-events-none" />
        <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-amber-600 pointer-events-none" />
        <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-amber-600 pointer-events-none" />

        {/* Certificate Header */}
        <div className="text-center space-y-2 border-b-2 border-amber-600/20 pb-8">
          <div className="flex items-center justify-center gap-2 text-xs font-bold tracking-widest text-amber-800 uppercase">
            <span>Republic of China · Culinary Hygiene Standards</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            廚師良好作業規範 (GHP)
          </h1>
          <h2 className="text-xl sm:text-2xl font-bold text-amber-800 tracking-wide">
            {certType === 'certificate' ? '專 業 知 識 檢 定 合 格 證 書' : '學 習 成 效 暨 知 識 評 量 報 告 書'}
          </h2>
          <p className="text-xs text-slate-500 font-mono">
            Certificate No. GHP-{activeResult.id.toUpperCase()}
          </p>
        </div>

        {/* Student Credential Section */}
        <div className="py-8 space-y-6">
          <div className="text-center space-y-3">
            <p className="text-sm text-slate-600 font-medium">
              茲證明餐飲從業人員 / 實習廚師
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <span className="text-3xl sm:text-4xl font-black text-slate-950 underline decoration-amber-500 decoration-4 underline-offset-8">
                {student.name || '林書緯'}
              </span>
            </div>

            <div className="flex items-center justify-center gap-6 text-xs text-slate-600 pt-2 font-mono flex-wrap">
              <div className="flex items-center gap-1.5">
                <Hash className="w-3.5 h-3.5 text-amber-700" />
                <span>學生學號：<strong>{student.studentId || '11204018'}</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <School className="w-3.5 h-3.5 text-amber-700" />
                <span>就讀班級：<strong>{student.department || '餐飲廚藝科'}</strong></span>
              </div>
              {student.seatNumber && (
                <div>座號：<strong>{student.seatNumber}</strong></div>
              )}
            </div>
          </div>

          {/* Statement */}
          <div className="bg-amber-50/50 p-6 rounded-2xl border border-amber-200/80 text-xs sm:text-sm text-slate-800 leading-relaxed text-center max-w-2xl mx-auto">
            業已研習完成<strong>《Chapter 5 廚師良好作業規範》</strong>，涵蓋從業人員上工著裝與衛生、200ppm漂白水配製、廚房空間溫濕光度、食品貯存冷鏈溫度、仙人掌桿菌及腸炎弧菌防範、砧板顏色四分法、熟食切割五確認、盤飾沾料安全、以及禁用毒性化學物質與11大非法添加物等完整法定章節，成績考試合格，特頒此證以資證明。
          </div>

          {/* Exam Grade & Score Highlight */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto text-center">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="text-[11px] text-slate-500 font-medium">測驗得分</div>
              <div className="text-3xl font-black text-amber-600 my-0.5">
                {activeResult.score} <span className="text-xs text-slate-500 font-normal">分</span>
              </div>
              <div className="text-[10px] text-slate-400">總題數 {activeResult.totalQuestions} 題</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="text-[11px] text-slate-500 font-medium">檢定結果</div>
              <div className={`text-2xl font-black my-1 ${isPassed ? 'text-emerald-700' : 'text-rose-700'}`}>
                {isPassed ? '合格通過' : '未達標準'}
              </div>
              <div className="text-[10px] text-slate-400">標準：70分以上及格</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="text-[11px] text-slate-500 font-medium">榮譽稱號</div>
              <div className="text-sm font-black text-slate-900 my-1.5 truncate">
                {activeResult.rankTitle}
              </div>
              <div className="text-[10px] text-slate-400">通過衛生法規考核</div>
            </div>
          </div>

          {/* Detailed report breakdown if full report mode */}
          {certType === 'full_report' && (
            <div className="space-y-4 pt-4 border-t border-slate-200">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider text-center">
                各章節衛生作業專業指標掌握度詳情
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {Object.entries(activeResult.categoryBreakdown).map(([cat, s]) => {
                  const p = Math.round((s.correct / s.total) * 100) || 0;
                  return (
                    <div key={cat} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                      <div className="font-bold text-slate-800 truncate">{cat}</div>
                      <div className="text-[11px] text-slate-500 mt-1 flex justify-between">
                        <span>正確率：{p}%</span>
                        <span>{s.correct}/{s.total}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Certificate Sign-off & Red Seal Footer */}
        <div className="pt-8 border-t-2 border-amber-600/20 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-xs text-slate-600 text-center sm:text-left">
            <div>考核檢定日期：<strong>{certDate}</strong></div>
            <div>檢驗機構：餐飲良好作業規範 (GHP) 數位考評平台</div>
            <div>發證單位核驗章戳備查</div>
          </div>

          {/* Official Red Seal (Digital Stamp) */}
          <div className="relative flex items-center justify-center">
            <div className="w-24 h-24 rounded-full border-4 border-rose-600 flex flex-col items-center justify-center text-rose-600 font-bold p-1 text-center rotate-[-8deg] shadow-xs select-none">
              <div className="text-[9px] tracking-wider border-b border-rose-400 pb-0.5">餐飲衛生管理</div>
              <div className="text-xs font-black py-0.5">檢定合格</div>
              <div className="text-[8px] tracking-tight">GHP CERTIFIED</div>
            </div>
          </div>

          <div className="text-center sm:text-right space-y-4">
            <div className="text-xs text-slate-600">
              指導主廚 / 考評教師簽名：
            </div>
            <div className="w-48 h-8 border-b-2 border-slate-400 mx-auto sm:ml-auto" />
          </div>
        </div>
      </div>
    </div>
  );
};
