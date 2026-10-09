import React, { useState } from 'react';
import { StudentInfo } from '../types';
import { User, Award, Volume2, VolumeX, Edit3, BookOpen, CheckCircle, FileText, Activity } from 'lucide-react';
import { SoundManager } from '../utils/audio';

interface HeaderProps {
  student: StudentInfo;
  onEditStudent: () => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
  examScore: number | null;
}

export const Header: React.FC<HeaderProps> = ({
  student,
  onEditStudent,
  activeTab,
  onTabChange,
  examScore
}) => {
  const [isMuted, setIsMuted] = useState(SoundManager.getIsMuted());

  const handleToggleSound = () => {
    const nextMuted = SoundManager.toggleMute();
    setIsMuted(nextMuted);
    if (!nextMuted) {
      SoundManager.playCorrect();
    }
  };

  const handleTestSound = () => {
    if (!isMuted) {
      SoundManager.playCorrect();
    }
  };

  const navItems = [
    { id: 'dashboard', label: '學習儀表板', icon: Activity },
    { id: 'flashcards', label: '學習字卡', icon: BookOpen, badge: '35張' },
    { id: 'quiz', label: '模擬測驗', icon: CheckCircle, badge: examScore !== null ? `${examScore}分` : '即時音效' },
    { id: 'scenarios', label: '情境分析', icon: Award, badge: '4大案例' },
    { id: 'calculator', label: '漂白水與數據', icon: FileText },
    { id: 'certificate', label: 'PDF輸出證書', icon: FileText, highlight: true },
  ];

  return (
    <header className="bg-slate-900 text-white border-b border-slate-800 shadow-lg sticky top-0 z-40">
      {/* Top utility bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 text-xs text-slate-300">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30">
            Chapter 5 廚師良好作業規範 (GHP)
          </span>
          <span className="hidden sm:inline text-slate-400">|</span>
          <span className="hidden sm:inline text-slate-300">餐飲從業人員衛生安全數位學習與檢定系統</span>
        </div>

        <div className="flex items-center gap-3">
          {/* Audio toggle button */}
          <div className="flex items-center gap-1.5 bg-slate-800/90 hover:bg-slate-700/90 px-2.5 py-1 rounded-full border border-slate-700 transition-colors">
            <button
              onClick={handleToggleSound}
              className="flex items-center gap-1 text-slate-200 hover:text-white"
              title={isMuted ? '開啟答題音效' : '靜音答題音效'}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
              <span>{isMuted ? '音效已關閉' : '答題音效開啟'}</span>
            </button>
            {!isMuted && (
              <button
                onClick={handleTestSound}
                className="ml-1 px-1.5 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 transition-colors"
                title="測試發出提示音"
              >
                試聽
              </button>
            )}
          </div>

          {/* Student quick info pill */}
          <button
            onClick={onEditStudent}
            className="flex items-center gap-2 bg-gradient-to-r from-amber-600/30 to-orange-600/30 hover:from-amber-600/50 hover:to-orange-600/50 px-3 py-1 rounded-full border border-amber-500/40 text-amber-200 transition-all cursor-pointer"
          >
            <User className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-medium">
              {student.name ? `${student.studentId || '無學號'} · ${student.name}` : '登錄學生資料'}
            </span>
            <Edit3 className="w-3 h-3 text-amber-400/70" />
          </button>
        </div>
      </div>

      {/* Main navigation header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-md shadow-amber-500/20">
            <span className="text-xl font-black text-slate-950">GHP</span>
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-2">
              廚師良好作業規範 學習檢定系統
              <span className="text-xs font-normal px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                教育部 / 衛福部 GHP 規範
              </span>
            </h1>
            <p className="text-xs text-slate-400">
              涵蓋個人衛生、溫控數字、16大禁忌、砧板分色、熟食切防、毒性物質與情境檢定
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  SoundManager.playFlip();
                  onTabChange(item.id);
                }}
                className={`relative px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap flex items-center gap-1.5 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                    : item.highlight
                    ? 'bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-slate-950' : ''}`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span
                    className={`ml-1 px-1.5 py-0.2 rounded-full text-[10px] ${
                      isActive
                        ? 'bg-slate-950/20 text-slate-950'
                        : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
