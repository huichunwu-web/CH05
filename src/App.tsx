/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { StudentInfo, ExamResult } from './types';
import { FLASHCARDS_DATA } from './data/flashcardsData';
import { Header } from './components/Header';
import { StudentProfileModal } from './components/StudentProfileModal';
import { DashboardView } from './components/DashboardView';
import { FlashcardsView } from './components/FlashcardsView';
import { QuizView } from './components/QuizView';
import { ScenarioView } from './components/ScenarioView';
import { BleachCalculator } from './components/BleachCalculator';
import { CertificateView } from './components/CertificateView';
import { SoundManager } from './utils/audio';

export default function App() {
  // Initialize Sound Manager
  useEffect(() => {
    SoundManager.init();
  }, []);

  // Student Profile State (defaults to realistic sample, editable at any time)
  const [student, setStudent] = useState<StudentInfo>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('ghp_student_info');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // ignore error
        }
      }
    }
    return {
      studentId: '11204018',
      name: '林書緯',
      department: '餐飲廚藝管理科 301',
      seatNumber: '08',
      notes: '中餐烹調乙丙級檢定實習'
    };
  });

  const [isStudentModalOpen, setIsStudentModalOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  // Exam Result State
  const [latestExamResult, setLatestExamResult] = useState<ExamResult | null>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('ghp_latest_exam');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // ignore
        }
      }
    }
    return null;
  });

  // Track Mastered Cards count
  const [masteredCardsCount, setMasteredCardsCount] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('ghp_mastered_cards');
      if (saved) {
        try {
          const list = JSON.parse(saved);
          return list.length;
        } catch {
          // ignore
        }
      }
    }
    return 12; // Initial friendly default
  });

  // Refresh mastered count on interval or tab change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('ghp_mastered_cards');
      if (saved) {
        try {
          setMasteredCardsCount(JSON.parse(saved).length);
        } catch {
          // ignore
        }
      }
    }
  }, [activeTab]);

  const handleSaveStudent = (info: StudentInfo) => {
    setStudent(info);
    if (typeof window !== 'undefined') {
      localStorage.setItem('ghp_student_info', JSON.stringify(info));
    }
    // Update active exam result student info if present
    if (latestExamResult) {
      const updatedExam = { ...latestExamResult, student: info };
      setLatestExamResult(updatedExam);
      localStorage.setItem('ghp_latest_exam', JSON.stringify(updatedExam));
    }
  };

  const handleExamComplete = (result: ExamResult) => {
    setLatestExamResult(result);
    if (typeof window !== 'undefined') {
      localStorage.setItem('ghp_latest_exam', JSON.stringify(result));
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-800">
      {/* App Header with Student Bar and Audio Toggle */}
      <Header
        student={student}
        onEditStudent={() => setIsStudentModalOpen(true)}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        examScore={latestExamResult ? latestExamResult.score : null}
      />

      {/* Main Content View Switcher */}
      <main className="flex-1 pb-16">
        {activeTab === 'dashboard' && (
          <DashboardView
            student={student}
            onEditStudent={() => setIsStudentModalOpen(true)}
            onNavigateTab={setActiveTab}
            latestExamResult={latestExamResult}
            masteredCardsCount={masteredCardsCount}
            totalCardsCount={FLASHCARDS_DATA.length}
          />
        )}

        {activeTab === 'flashcards' && (
          <FlashcardsView onGoToQuiz={() => setActiveTab('quiz')} />
        )}

        {activeTab === 'quiz' && (
          <QuizView
            student={student}
            onEditStudent={() => setIsStudentModalOpen(true)}
            onExamComplete={handleExamComplete}
            onViewCertificate={() => setActiveTab('certificate')}
          />
        )}

        {activeTab === 'scenarios' && (
          <ScenarioView student={student} />
        )}

        {activeTab === 'calculator' && (
          <BleachCalculator />
        )}

        {activeTab === 'certificate' && (
          <CertificateView
            student={student}
            latestResult={latestExamResult}
            onEditStudent={() => setIsStudentModalOpen(true)}
            onGoToQuiz={() => setActiveTab('quiz')}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="print:hidden border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500 space-y-1">
        <p className="font-semibold text-slate-700">
          Chapter 5 廚師良好作業規範 (GHP) · 衛生安全考評與數位教學系統
        </p>
        <p className="text-slate-400">
          包含學生學號姓名登錄、字卡背誦、模擬測驗與答題即時音效、實務情境分析與官方 PDF 證書輸出
        </p>
      </footer>

      {/* Student Profile Dialog */}
      <StudentProfileModal
        isOpen={isStudentModalOpen}
        onClose={() => setIsStudentModalOpen(false)}
        student={student}
        onSave={handleSaveStudent}
      />
    </div>
  );
}
