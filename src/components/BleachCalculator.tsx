import React, { useState } from 'react';
import { Calculator, Droplets, CheckCircle2, AlertTriangle, ShieldCheck, Info } from 'lucide-react';
import { SoundManager } from '../utils/audio';

export const BleachCalculator: React.FC = () => {
  // Stock bleach concentration (1% ~ 10%)
  const [stockConcentration, setStockConcentration] = useState<number>(5);
  // Water volume in Liters (default 5 Liters as in textbook slide 3)
  const [waterLiters, setWaterLiters] = useState<number>(5);
  // Target purpose: '200ppm' (clothes, rags, shoe bath) or '100ppm' (vegetables)
  const [targetPpm, setTargetPpm] = useState<number>(200);

  // Calculation formula from textbook:
  // Required cc = (targetPpm * (waterLiters * 1000)) / (stockConcentration * 10000)
  const requiredCc = Number(
    ((targetPpm * (waterLiters * 1000)) / (stockConcentration * 10000)).toFixed(1)
  );

  const textbookTable = [
    { conc: '1%', cc: '100 cc' },
    { conc: '2%', cc: '50 cc' },
    { conc: '3%', cc: '33.3 cc' },
    { conc: '4%', cc: '25 cc' },
    { conc: '5%', cc: '20 cc' },
    { conc: '6%', cc: '16.6 cc' },
    { conc: '7%', cc: '14.3 cc' },
    { conc: '8%', cc: '12.5 cc' },
    { conc: '9%', cc: '11.1 cc' },
    { conc: '10%', cc: '10 cc' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8 animate-in fade-in duration-200">
      {/* Title Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-700/60 space-y-2">
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-400 text-slate-950 inline-flex items-center gap-1.5">
          <Droplets className="w-3.5 h-3.5" /> 次氯酸鈉 200 ppm 標準配製專題換算
        </span>
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
          200 ppm 漂白水配製計算器與 GHP 關鍵數字速查
        </h2>
        <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
          工作衣、抹布、泡鞋池消毒必備 200 ppm 次氯酸鈉漂白水；清洗蔬菜需再稀釋一倍至 100 ppm，洗完再以自來水沖淨。
        </p>
      </div>

      {/* Calculator Main Tool */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-amber-600" />
              次氯酸鈉漂白水配製換算器
            </h3>
            <span className="text-xs text-amber-800 font-semibold bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
              目標用途：{targetPpm === 200 ? '200 ppm (工作衣/抹布/泡鞋池)' : '100 ppm (清洗蔬菜)'}
            </span>
          </div>

          {/* Toggle Target */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => {
                setTargetPpm(200);
                SoundManager.playFlip();
              }}
              className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                targetPpm === 200
                  ? 'border-amber-500 bg-amber-50/80 ring-2 ring-amber-300 font-bold text-amber-950'
                  : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
              }`}
            >
              <div className="text-sm font-bold">200 ppm 器具消毒</div>
              <div className="text-[11px] text-slate-500 mt-0.5">洗工作衣、抹布、泡鞋池</div>
            </button>

            <button
              onClick={() => {
                setTargetPpm(100);
                SoundManager.playFlip();
              }}
              className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                targetPpm === 100
                  ? 'border-emerald-500 bg-emerald-50/80 ring-2 ring-emerald-300 font-bold text-emerald-950'
                  : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
              }`}
            >
              <div className="text-sm font-bold">100 ppm 蔬菜清洗</div>
              <div className="text-[11px] text-slate-500 mt-0.5">生鮮蔬菜減菌（洗後需以清水沖洗）</div>
            </button>
          </div>

          {/* Slider 1: Stock Concentration */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
              <span>市售漂白水原液濃度（次氯酸鈉 %）</span>
              <span className="text-base font-extrabold text-amber-600 font-mono">{stockConcentration}%</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              step="1"
              value={stockConcentration}
              onChange={(e) => setStockConcentration(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>1%</span>
              <span>3%</span>
              <span>5% (常見)</span>
              <span>7%</span>
              <span>10%</span>
            </div>
          </div>

          {/* Slider 2: Water Volume */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
              <span>欲調配之自來水水量（公升 L）</span>
              <span className="text-base font-extrabold text-blue-600 font-mono">{waterLiters} 公升</span>
            </div>
            <input
              type="range"
              min="1"
              max="20"
              step="1"
              value={waterLiters}
              onChange={(e) => setWaterLiters(Number(e.target.value))}
              className="w-full accent-blue-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>1L</span>
              <span>5L (標準桶)</span>
              <span>10L</span>
              <span>15L</span>
              <span>20L</span>
            </div>
          </div>

          {/* Result Output Display */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 text-white space-y-3 shadow-inner">
            <div className="text-xs text-slate-400 uppercase tracking-wider">換算精確取用量</div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl sm:text-5xl font-black text-amber-400 font-mono">
                {requiredCc}
              </span>
              <span className="text-xl font-bold text-slate-300">cc (毫升 mL)</span>
            </div>
            <div className="text-xs text-slate-300 leading-relaxed border-t border-slate-700/80 pt-3">
              📝 <strong>操作指引：</strong> 將 <strong>{requiredCc} cc</strong> 的 {stockConcentration}% 次氯酸鈉原液，倒入 <strong>{waterLiters} 公升</strong> 的自來水中攪拌均勻，即可配製出 <strong>{targetPpm} ppm</strong> 的消毒水！
            </div>
          </div>
        </div>

        {/* Textbook Slide 3 Reference Table */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
            <Info className="w-4 h-4 text-amber-600" />
            <span>5 公升自來水標準調配對照表</span>
          </div>
          <p className="text-xs text-slate-500">
            以 5 公升自來水配製 200 ppm 漂白水之官方標準取用數值：
          </p>

          <div className="border border-slate-200 rounded-2xl overflow-hidden text-xs">
            <table className="w-full text-center">
              <thead className="bg-slate-100 text-slate-700 font-bold">
                <tr>
                  <th className="py-2.5 px-3 border-b border-r border-slate-200">次氯酸鈉濃度</th>
                  <th className="py-2.5 px-3 border-b border-slate-200">取得數量 (倒入5L自來水)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {textbookTable.map((row) => {
                  const isCurrent = `${stockConcentration}%` === row.conc;
                  return (
                    <tr
                      key={row.conc}
                      className={isCurrent ? 'bg-amber-50/90 font-bold text-amber-900' : 'hover:bg-slate-50'}
                    >
                      <td className="py-1.5 px-3 border-r border-slate-200 font-mono">{row.conc}</td>
                      <td className="py-1.5 px-3 font-mono">{row.cc}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-200 text-xs text-emerald-950 space-y-1">
            <div className="font-bold flex items-center gap-1 text-emerald-800">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> 洗蔬菜特別注意事項：
            </div>
            <p className="text-[11px] leading-relaxed">
              200 ppm 漂白水再加 5 公升水（稀釋一倍成 100 ppm）即可清洗蔬菜！<strong>記住：洗完後一定要再以乾淨清水澈底沖洗喔！</strong>
            </p>
          </div>
        </div>
      </div>

      {/* Critical GHP Numbers Matrix */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-indigo-600" />
          廚師考試必考！第三節安全衛生關鍵數字速查
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          {/* Card 1: Kitchen Spaces */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-bold text-[10px]">
              廚房大小與空間比
            </span>
            <ul className="space-y-1 text-slate-700">
              <li>• 一般餐廳比例：<strong>1/3 ~ 1/5</strong>（理想約 1:3）</li>
              <li>• 商業午餐型（簡餐）：<strong>大於 1/10</strong></li>
              <li>• 學校餐廳：<strong>1/2 ~ 1/5</strong> ｜ 觀光飯店：<strong>1/3</strong></li>
              <li>• 機械器具比：總面積／器具面積 ＝ <strong>1.5 ~ 5.0</strong></li>
              <li>• 每人面積：第1人 <strong>3.3 m²</strong>，每增加1人加 <strong>1.7 m²</strong></li>
            </ul>
          </div>

          {/* Card 2: Environment 4 Degrees */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">
              環境四度與光度
            </span>
            <ul className="space-y-1 text-slate-700">
              <li>• 廚房適宜高度：<strong>2.4 公尺以上</strong></li>
              <li>• 適宜溫度：<strong>20 ~ 25℃</strong> 間</li>
              <li>• 適宜濕度：<strong>50 ~ 55%</strong></li>
              <li>• 工作台光度：<strong>200 米燭光以上</strong></li>
              <li>• 非工作台光度：<strong>100 米燭光以上</strong></li>
            </ul>
          </div>

          {/* Card 3: Storage Temperatures */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold text-[10px]">
              儲存關鍵溫度
            </span>
            <ul className="space-y-1 text-slate-700">
              <li>• 冷凍溫度：食品品溫在 <strong>-18℃ 以下</strong></li>
              <li>• 冷藏溫度：食品品溫在 <strong>7℃ 以下</strong>凍結點以上</li>
              <li>• 熱藏溫度：在 <strong>60℃ 以上</strong></li>
              <li>• 低溫理貨裝卸：應於 <strong>15℃ 以下</strong>迅速進行</li>
              <li>• 最適合細菌生長危險溫度：<strong>16 ~ 49℃ 間</strong></li>
            </ul>
          </div>

          {/* Card 4: Sterilization Methods */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-800 font-bold text-[10px]">
              物理殺菌四法
            </span>
            <ul className="space-y-1 text-slate-700">
              <li>• 煮沸殺菌：100℃ 沸水，抹布 <strong>≥5分鐘</strong>，餐具 <strong>≥1分鐘</strong></li>
              <li>• 蒸汽殺菌：100℃ 蒸汽，抹布 <strong>≥10分鐘</strong>，餐具 <strong>≥2分鐘</strong></li>
              <li>• 熱水殺菌：餐具 80℃ 以上熱水，<strong>≥2分鐘</strong></li>
              <li>• 乾熱殺菌：餐具 110℃ 以上乾熱，<strong>≥30分鐘</strong></li>
            </ul>
          </div>

          {/* Card 5: Safe Distance & Oil */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-800 font-bold text-[10px]">
              水源距離與油脂規範
            </span>
            <ul className="space-y-1 text-slate-700">
              <li>• 地下水源距化糞池等污染源：至少 <strong>15 公尺</strong></li>
              <li>• 蓄水池(塔槽)距污染源：至少 <strong>3 公尺</strong></li>
              <li>• 油炸油總極性化合物(TPC)：達 <strong>25% 以上換全油</strong></li>
              <li>• 保麗龍容器：不可裝 <strong>100℃ 以上</strong>食物</li>
              <li>• 衛生紀錄與發票：應保存 <strong>5 年</strong></li>
            </ul>
          </div>

          {/* Card 6: Room temp & Canned */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="px-2 py-0.5 rounded bg-teal-100 text-teal-800 font-bold text-[10px]">
              常溫儲存與水活性
            </span>
            <ul className="space-y-1 text-slate-700">
              <li>• 常溫保存條件：水活性在 <strong>0.85 以下</strong></li>
              <li>• pH 值在 <strong>9.0 以上</strong> 或 <strong>小於 4.6</strong></li>
              <li>• 酸化罐頭 pH 值保持在 <strong>4.6 以下</strong></li>
              <li>• 香腸亞硝酸鈉量以 NO2 計：<strong>70 ppm 以下</strong></li>
              <li>• 經商業滅菌之食品、發酵食品</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
