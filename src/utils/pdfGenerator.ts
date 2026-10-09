import jsPDF from 'jspdf';
import { ExamResult, StudentInfo } from '../types';

export function formatDate(timestamp: number): string {
  const d = new Date(timestamp);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const hours = String(d.getHours()).padStart(2, '0');
  const mins = String(d.getMinutes()).padStart(2, '0');
  return `${year}年${month}月${day}日 ${hours}:${mins}`;
}

export function generateReportPdf(result: ExamResult): void {
  // We initialize jsPDF doc
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const student = result.student;
  const examDate = formatDate(result.timestamp);
  const percentage = Math.round((result.correctCount / result.totalQuestions) * 100);
  const isPassed = percentage >= 70;

  // Header Background bar
  doc.setFillColor(15, 23, 42); // slate-900
  doc.rect(0, 0, 210, 38, 'F');

  // Decorative border
  doc.setDrawColor(203, 213, 225); // slate-300
  doc.setLineWidth(0.8);
  doc.rect(10, 10, 190, 277);

  // Document Title
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.text('Good Hygienic Practices (GHP) - Chef Certification', 105, 20, { align: 'center' });
  doc.setFontSize(11);
  doc.text('Assessment Report & Competency Certificate', 105, 28, { align: 'center' });

  // Student Profile Table
  doc.setFillColor(248, 250, 252);
  doc.rect(15, 45, 180, 35, 'F');
  doc.setDrawColor(226, 232, 240);
  doc.rect(15, 45, 180, 35);

  doc.setTextColor(51, 65, 85);
  doc.setFontSize(10);
  doc.text(`Student ID : ${student.studentId || 'N/A'}`, 22, 54);
  doc.text(`Student Name : ${student.name || 'Anonymous'}`, 110, 54);
  doc.text(`Department / Class : ${student.department || 'Culinary Arts'}`, 22, 63);
  doc.text(`Exam Date : ${examDate}`, 110, 63);
  doc.text(`Certificate No. : GHP-${result.id.slice(0, 8).toUpperCase()}`, 22, 72);
  doc.text(`Status : ${isPassed ? 'PASSED (QUALIFIED)' : 'RETEST REQUIRED'}`, 110, 72);

  // Score Highlight Card
  doc.setFillColor(isPassed ? 240 : 254, isPassed ? 253 : 242, isPassed ? 244 : 242);
  doc.rect(15, 85, 180, 30, 'F');
  doc.setDrawColor(isPassed ? 34 : 239, isPassed ? 197 : 68, isPassed ? 94 : 68);
  doc.setLineWidth(0.6);
  doc.rect(15, 85, 180, 30);

  doc.setTextColor(isPassed ? 21 : 153, isPassed ? 128 : 27, isPassed ? 61 : 27);
  doc.setFontSize(14);
  doc.text(`Final Score: ${result.score} / 100`, 22, 98);
  doc.setFontSize(10);
  doc.text(`Correct Answers: ${result.correctCount} / ${result.totalQuestions} questions`, 22, 107);
  doc.text(`Competency Level: ${result.rankTitle}`, 110, 98);
  doc.text(`Completion Duration: ${Math.floor(result.timeSpentSeconds / 60)}m ${result.timeSpentSeconds % 60}s`, 110, 107);

  // Category Breakdown
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(12);
  doc.text('1. Knowledge Category Competency Breakdown', 20, 126);

  let startY = 134;
  const categories = Object.entries(result.categoryBreakdown);
  
  categories.forEach(([catName, stats], idx) => {
    const rate = Math.round((stats.correct / stats.total) * 100) || 0;
    doc.setFillColor(241, 245, 249);
    doc.rect(20, startY + idx * 11, 170, 8, 'F');

    doc.setFontSize(9);
    doc.setTextColor(30, 41, 59);
    doc.text(`${catName}`, 24, startY + idx * 11 + 5.5);
    doc.text(`${stats.correct}/${stats.total} (${rate}%)`, 165, startY + idx * 11 + 5.5, { align: 'right' });

    // mini progress bar
    doc.setFillColor(rate >= 80 ? 34 : rate >= 60 ? 234 : 239, rate >= 80 ? 197 : rate >= 60 ? 179 : 68, rate >= 80 ? 94 : rate >= 60 ? 8 : 68);
    const barWidth = Math.max(2, (rate / 100) * 40);
    doc.rect(115, startY + idx * 11 + 2.5, barWidth, 3, 'F');
  });

  // Regulatory Standards Covered
  const regY = startY + categories.length * 11 + 10;
  doc.setFontSize(12);
  doc.setTextColor(15, 23, 42);
  doc.text('2. Core GHP Compliance Standards Verified', 20, regY);

  const standards = [
    'Standard 1: Personal Hygiene & 6-step handwashing (>=20s), wound restriction',
    'Standard 2: Kitchen Temp & Humidity (20-25C, 50-55%), Light (200/100 lux)',
    'Standard 3: Cold Chain (Frozen <= -18C, Chilled <= 7C, Danger Zone 16-49C)',
    'Standard 4: Cutting Board Color coding (White=Cooked, Green=Veg, Red=Meat, Blue=Fish)',
    'Standard 5: Prevention of 16 Deadly Sins (Bacillus cereus, Vibrio, Fryer TPC <= 25%)',
    'Standard 6: Zero tolerance on banned additives (Borax, Rongalit, KBrO3, Auramine)'
  ];

  doc.setFontSize(8.5);
  doc.setTextColor(71, 85, 105);
  standards.forEach((std, i) => {
    doc.text(`- ${std}`, 22, regY + 8 + i * 5.8);
  });

  // Footer & Official Signatures
  const footerY = 250;
  doc.setDrawColor(203, 213, 225);
  doc.line(20, footerY, 190, footerY);

  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  doc.text('Inspector / Instructor Signature: _______________________', 22, footerY + 12);
  doc.text('Institution Stamp: _______________________', 115, footerY + 12);
  doc.text(`Verified by AI Studio Culinary Hygiene Assessment Engine - Official Record`, 105, 275, { align: 'center' });

  // Save the generated PDF
  const filename = `GHP_${student.studentId ? student.studentId + '_' : ''}${student.name || 'Report'}_${Date.now()}.pdf`;
  doc.save(filename);
}

// Function to trigger clean browser printing
export function printOfficialReport(): void {
  window.print();
}
