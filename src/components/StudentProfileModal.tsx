import React, { useState } from 'react';
import { StudentInfo } from '../types';
import { X, Check, UserCheck, ShieldAlert, School, Hash, User } from 'lucide-react';
import { SoundManager } from '../utils/audio';

interface StudentProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: StudentInfo;
  onSave: (info: StudentInfo) => void;
}

export const StudentProfileModal: React.FC<StudentProfileModalProps> = ({
  isOpen,
  onClose,
  student,
  onSave
}) => {
  const [formData, setFormData] = useState<StudentInfo>({ ...student });
  const [errors, setErrors] = useState<{ studentId?: string; name?: string }>({});

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { studentId?: string; name?: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = '請輸入學生姓名';
    }
    if (!formData.studentId.trim()) {
      newErrors.studentId = '請輸入學生學號';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      SoundManager.playIncorrect();
      return;
    }

    onSave(formData);
    SoundManager.playCorrect();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-100 overflow-hidden transform transition-all">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">學生學籍與應考資料登錄</h2>
              <p className="text-xs text-slate-300">資料將即時列印於測驗成績與官方合格證書中</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
              <Hash className="w-3.5 h-3.5 text-amber-600" />
              學生學號 <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="例如：11204018"
              value={formData.studentId}
              onChange={(e) => {
                setFormData({ ...formData, studentId: e.target.value });
                if (errors.studentId) setErrors({ ...errors, studentId: undefined });
              }}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-900 transition-all focus:outline-hidden ${
                errors.studentId
                  ? 'border-rose-400 bg-rose-50/50 focus:border-rose-500 focus:ring-2 focus:ring-rose-200'
                  : 'border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200/50'
              }`}
            />
            {errors.studentId && (
              <p className="text-rose-500 text-xs mt-1 flex items-center gap-1">
                <ShieldAlert className="w-3 h-3" /> {errors.studentId}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-amber-600" />
              學生姓名 <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="例如：林書緯"
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
                if (errors.name) setErrors({ ...errors, name: undefined });
              }}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-900 transition-all focus:outline-hidden ${
                errors.name
                  ? 'border-rose-400 bg-rose-50/50 focus:border-rose-500 focus:ring-2 focus:ring-rose-200'
                  : 'border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200/50'
              }`}
            />
            {errors.name && (
              <p className="text-rose-500 text-xs mt-1 flex items-center gap-1">
                <ShieldAlert className="w-3 h-3" /> {errors.name}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                <School className="w-3.5 h-3.5 text-slate-500" />
                科系 / 班級
              </label>
              <input
                type="text"
                placeholder="例如：餐飲廚藝科 301"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:border-amber-500 focus:ring-2 focus:ring-amber-200/50 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                座號 (選填)
              </label>
              <input
                type="text"
                placeholder="例如：08"
                value={formData.seatNumber || ''}
                onChange={(e) => setFormData({ ...formData, seatNumber: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:border-amber-500 focus:ring-2 focus:ring-amber-200/50 focus:outline-hidden"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              實習單位 / 指導老師 (選填)
            </label>
            <input
              type="text"
              placeholder="例如：西餐實習廚房 / 陳主廚"
              value={formData.notes || ''}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:border-amber-500 focus:ring-2 focus:ring-amber-200/50 focus:outline-hidden"
            />
          </div>

          <div className="bg-amber-50 rounded-xl p-3 border border-amber-200 text-[11px] text-amber-900 leading-relaxed">
            💡 <strong>貼心提示：</strong> 登錄學生學號與姓名後，完成模擬測驗即可一鍵產出具備防偽認證編號的「GHP 學習成效檢定報告書」與「合格結業證書」PDF！
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-medium text-slate-600 hover:bg-slate-100 transition-colors"
            >
              取消
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-md shadow-amber-500/20 flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Check className="w-4 h-4" />
              確認儲存資料
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
