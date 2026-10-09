import { Flashcard } from '../types';

export const FLASHCARDS_DATA: Flashcard[] = [
  // 壹、上工前準備與從業人員個人衛生
  {
    id: 'fc-1',
    category: 'preparation',
    categoryName: '上工準備與衛生',
    title: '廚師服裝與更衣規範',
    frontKeyPoint: '廚師上工前應如何穿著？更衣場所有何規範？',
    frontPrompt: '點擊翻轉查看服裝、帽子及鞋具規範',
    backExplanation: '1. 應穿著整齊「白色」工作衣帽(鞋)。\n2. 必須於「工作場所更衣室」換著，工作衣帽只可於工作場所穿著，不可穿出公共場所。\n3. 工作帽應能「掩蓋頭部前緣之頭髮」，防止毛髮頭屑落入食品。\n4. 嚴格避免穿著短褲、拖鞋、涼鞋。',
    keyNumbers: '白色衣帽 / 掩蓋前緣頭髮',
    slideRef: 2,
    tags: ['工作衣帽', '更衣室', '衛生規範']
  },
  {
    id: 'fc-2',
    category: 'preparation',
    categoryName: '上工準備與衛生',
    title: '飾品與指甲個人儀容',
    frontKeyPoint: '廚師從業人員能否佩戴飾物或擦指甲油？',
    frontPrompt: '點擊查看指甲、飾物、化妝品之禁令',
    backExplanation: '1. 從業人員「不可蓄留指甲、塗抹指甲油」。\n2. 不得穿戴手錶、手鐲、戒指等飾物，以防藏污納垢或掉入食材。\n3. 不得使塗抹於肌膚之化粧品及藥品污染食品或食品接觸面。',
    keyNumbers: '禁手錶、手鐲、戒指、指甲油',
    slideRef: 3,
    tags: ['飾品禁令', '指甲整潔', '異物防範']
  },
  {
    id: 'fc-3',
    category: 'preparation',
    categoryName: '上工準備與衛生',
    title: '200 ppm 消毒漂白水泡製',
    frontKeyPoint: '如何配製 200 ppm 漂白水？用途與蔬菜清洗差在哪？',
    frontPrompt: '點擊查看漂白水次氯酸鈉濃度對照與稀釋倍數',
    backExplanation: '【200 ppm 漂白水配製】：加入 5 公升自來水，對應原液量：\n• 5% 次氯酸鈉：取 20 cc 倒入 5 公升水\n• 6% 取 16.6 cc；10% 取 10 cc；1% 取 100 cc。\n【用途】：\n• 200 ppm：清洗工作衣、抹布及泡鞋池消毒。\n• 洗蔬菜：需將 200 ppm 再稀釋一倍（加 5 公升水成 100 ppm），且「洗完後必須以清水沖洗」！',
    keyNumbers: '200 ppm (工作衣/抹布/泡鞋池) | 100 ppm (洗蔬菜)',
    slideRef: 3,
    tags: ['漂白水', '200ppm', '次氯酸鈉', '消毒SOP']
  },
  {
    id: 'fc-4',
    category: 'preparation',
    categoryName: '上工準備與衛生',
    title: '手部衛生與正確洗手六步驟',
    frontKeyPoint: '食品從業人員正確洗手 6 步驟及洗手時機',
    frontPrompt: '點擊查看標準洗手步驟（濕、洗、刷、搓、沖、乾）',
    backExplanation: '【洗手六步驟】：\n1. 濕：用清水將雙手完全弄濕\n2. 洗：均勻抹上清潔劑\n3. 刷：利用乾淨指甲刷包指尖及指甲縫刷淨\n4. 搓：手心手背互相搓洗「至少 20 秒」\n5. 沖：用清水將雙手澈底沖洗乾淨\n6. 乾：用烘手機或紙巾將手擦乾。\n【洗手時機】：進入作業場所前、如廁後、手部受污染、吐痰擤鼻涕後、每進行下一個不同動作前。',
    keyNumbers: '濕、洗、刷、搓(≥20秒)、沖、乾',
    slideRef: 6,
    tags: ['洗手步驟', '指甲刷', '搓洗20秒']
  },
  {
    id: 'fc-5',
    category: 'preparation',
    categoryName: '上工準備與衛生',
    title: '手部創傷與膿瘡之重大限制',
    frontKeyPoint: '廚師手部若有割傷或長膿瘡，可以碰食材嗎？',
    frontPrompt: '點擊查看手部創傷法規禁令與金黃色葡萄球菌',
    backExplanation: '凡手部有「創傷、膿瘡」，「絕對不得從事直接接觸食品之工作」！\n原因：化膿傷口極易孳生金黃色葡萄球菌（產生耐熱腸毒素），會引發嚴重的急性食品中毒（嘔吐、腹痛）。',
    keyNumbers: '有創傷、膿瘡者不得從事直接接觸食品工作',
    slideRef: 7,
    tags: ['創傷膿瘡', '金黃色葡萄球菌', '食品安全']
  },

  // 參、廚房關鍵數字與溫度指標
  {
    id: 'fc-6',
    category: 'numbers',
    categoryName: '關鍵數字與溫度',
    title: '廚房與營業場所面積比例',
    frontKeyPoint: '各類型餐飲之廚房與營業場所面積比標準為何？',
    frontPrompt: '點擊查看各類型餐廳之黃金比例',
    backExplanation: '1. 一般餐廳：1/3 ~ 1/5（一般理想廚房與供膳場所比例約 1:3 左右）。\n2. 商業午餐型（簡餐餐廳）：大於 1/10。\n3. 學校餐廳：1/2 ~ 1/5。\n4. 觀光飯店：1/3。',
    keyNumbers: '一般 1/3~1/5 | 簡餐 >1/10 | 學校 1/2~1/5 | 飯店 1/3',
    slideRef: 9,
    tags: ['廚房面積比', '空間規劃']
  },
  {
    id: 'fc-7',
    category: 'numbers',
    categoryName: '關鍵數字與溫度',
    title: '廚房面積之機械器具比與從業人員空間',
    frontKeyPoint: '廚房總面積與機械器具之比例？每位廚師需多少空間？',
    frontPrompt: '點擊查看人員與設備面積公式',
    backExplanation: '1. 機械器具比例：廚房總面積 / 機械器具面積 ＝ 1.5 ~ 5.0。\n2. 從業人員面積計算法：\n• 第一位從業人員所需面積為「3.3 平方公尺」（約 1 坪）。\n• 每增加一人，則增加「1.7 平方公尺」之面積。',
    keyNumbers: '設備比 1.5~5.0 | 人員：第1人 3.3m²，每+1人 +1.7m²',
    slideRef: 10,
    tags: ['設備比例', '工作空間', '平方公尺']
  },
  {
    id: 'fc-8',
    category: 'numbers',
    categoryName: '關鍵數字與溫度',
    title: '廚房環境四度（高度、溫度、濕度、光度）',
    frontKeyPoint: '廚房適宜的高度、溫度、濕度與照明照度各是多少？',
    frontPrompt: '點擊查看環境四度黃金標準數值',
    backExplanation: '1. 適宜高度：2.4 公尺以上。\n2. 適宜溫度：20 ~ 25℃ 間。\n3. 適宜濕度：50 ~ 55%（太濕滑易滋生大量黴菌與細菌）。\n4. 適宜光度（照度）：\n• 工作台：200 米燭光（Lux）以上\n• 非工作台：100 米燭光以上。',
    keyNumbers: '高 2.4m+ | 溫 20~25℃ | 濕 50~55% | 光 200/100米燭光',
    slideRef: 11,
    tags: ['廚房高度', '溫度', '濕度', '光度']
  },
  {
    id: 'fc-9',
    category: 'numbers',
    categoryName: '關鍵數字與溫度',
    title: '食品貯存關鍵溫度指標',
    frontKeyPoint: '冷凍、冷藏、凍藏、熱藏及細菌繁衍危險帶溫度？',
    frontPrompt: '點擊查看 5 大關鍵溫控標準',
    backExplanation: '1. 冷凍溫度：食品品溫在 -18℃ 以下。\n2. 冷藏溫度：食品品溫在 7℃ 以下凍結點以上。\n3. 凍藏溫度：在 2℃ 以下至食品凍藏點間。\n4. 熱藏溫度：在 60℃ 以上。\n5. 低溫食品理貨及裝卸：應於 15℃ 以下場所迅速進行。\n6. 最適合細菌生長的危險溫度帶：16 ~ 49℃ 間！',
    keyNumbers: '冷凍 ≤-18℃ | 冷藏 ≤7℃ | 熱藏 ≥60℃ | 理貨 ≤15℃ | 細菌 16~49℃',
    slideRef: 12,
    tags: ['冷凍', '冷藏', '熱藏', '危險溫度帶']
  },
  {
    id: 'fc-10',
    category: 'numbers',
    categoryName: '關鍵數字與溫度',
    title: '細菌生長 FAT TOM 胖湯姆理論',
    frontKeyPoint: 'FAT TOM 各代表什麼細菌生長良好條件？',
    frontPrompt: '點擊查看 F-A-T-T-O-M 英文拆解與數值',
    backExplanation: '• F (Food)：來自食物營養（蛋白質高較易孳生）。\n• A (Acidity)：pH 4.6 ~ 9.0 較易孳生細菌。\n• T (Temperature)：16 ~ 49℃ 間最易繁衍。\n• T (Time)：時間越長孳生細菌越多。\n• O (Oxygen)：空氣（氧氣）越多越利一般好氧菌生長。\n• M (Moisture)：水活性 (Aw) 在 0.85 以上。',
    keyNumbers: 'pH 4.6~9.0 | 16~49℃ | 水活性 Aw ≥ 0.85',
    slideRef: 13,
    tags: ['FATTOM', '胖湯姆理論', '水活性', '酸鹼值']
  },
  {
    id: 'fc-11',
    category: 'numbers',
    categoryName: '關鍵數字與溫度',
    title: '餐具與毛巾抹布四大殺菌法',
    frontKeyPoint: '煮沸、蒸汽、熱水、乾熱殺菌之溫度與時間？',
    frontPrompt: '點擊查看四大殺菌法精準時間規範',
    backExplanation: '1. 煮沸殺菌：以 100℃ 沸水煮沸，毛巾抹布 5 分鐘以上，餐具 1 分鐘以上。\n2. 蒸汽殺菌：以 100℃ 蒸汽加熱，毛巾抹布 10 分鐘以上，餐具 2 分鐘以上。\n3. 熱水殺菌：餐具以 80℃ 以上熱水，加熱時間 2 分鐘以上。\n4. 乾熱殺菌：餐具以 110℃ 以上乾熱，加熱時間 30 分鐘以上。',
    keyNumbers: '沸水:布5分/具1分 | 蒸汽:布10分/具2分 | 熱水80℃:具2分 | 乾熱110℃:具30分',
    slideRef: 14,
    tags: ['煮沸殺菌', '蒸汽殺菌', '熱水殺菌', '乾熱殺菌']
  },
  {
    id: 'fc-12',
    category: 'numbers',
    categoryName: '關鍵數字與溫度',
    title: '可常溫貯存及販售之食品條件',
    frontKeyPoint: '哪 5 類食品可以合法於常溫下貯存及販售？',
    frontPrompt: '點擊查看常溫保存 5 大法定條件',
    backExplanation: '1. 水活性在 0.85 以下之食品。\n2. pH 值在 9.0 以上之食品。\n3. pH 值小於 4.6 者之食品。\n4. 經商業滅菌之食品（如常溫罐頭、無菌利樂包）。\n5. 發酵食品（如醋、某些發酵醬料）。',
    keyNumbers: '水活性 ≤0.85 | pH ≥9.0 或 pH <4.6 | 商業滅菌 | 發酵食品',
    slideRef: 15,
    tags: ['常溫貯存', '商業滅菌', '發酵食品']
  },
  {
    id: 'fc-13',
    category: 'numbers',
    categoryName: '關鍵數字與溫度',
    title: '水源安全距離與油炸油標準',
    frontKeyPoint: '地下水、蓄水池與污染源距離？油炸油極性化合物標準？',
    frontPrompt: '點擊查看 15米、3米、25% 與保麗龍規範',
    backExplanation: '1. 地下水源：與化糞池、廢棄物堆積等污染源至少保持「15 公尺」以上距離。\n2. 蓄水池(塔、槽)：距污穢場所、化糞池等污染源保持「3 公尺」以上。\n3. 油炸食用油總極性化合物(TPC)：含量達「25%」以上時不得再用，應全部換新油。\n4. 保麗龍容器：絕對「不可盛裝 100℃ 以上」之食物。\n5. 衛生紀錄發票：應保存「5 年」。酸化罐頭 pH 保持在 4.6 以下。',
    keyNumbers: '地下水 ≥15m | 蓄水池 ≥3m | 油炸TPC ≥25%換油 | 紀錄5年',
    slideRef: 16,
    tags: ['地下水源', '蓄水池', '總極性化合物', '保麗龍']
  },

  // 陸、廚師絕對不可犯的16大禁忌
  {
    id: 'fc-14',
    category: 'forbidden',
    categoryName: '16大不可犯禁忌',
    title: '米飯室溫冷卻之仙人掌桿菌危機',
    frontKeyPoint: '將剛煮好的熱飯放在室溫下自然冷卻，會引發什麼致命後果？',
    frontPrompt: '點擊查看仙人掌桿菌生成原因與防範',
    backExplanation: '【不可犯錯誤】：將煮好的飯放在室溫冷卻。\n【後果】：高機率產生大量「仙人掌桿菌（Bacillus cereus）」！\n仙人掌桿菌耐熱孢子會在 20~40℃ 溫暖米飯中迅速發芽繁殖產生嘔吐型毒素。熱飯應透過快速冷卻設備降溫，或保溫於 60℃ 以上。',
    keyNumbers: '室溫放冷飯 ➔ 大量仙人掌桿菌 (Bacillus cereus)',
    slideRef: 20,
    tags: ['米飯冷卻', '仙人掌桿菌', '炒飯中毒']
  },
  {
    id: 'fc-15',
    category: 'forbidden',
    categoryName: '16大不可犯禁忌',
    title: '生鮮海產清洗禁忌（鹽水 vs 自來水）',
    frontKeyPoint: '清洗魚蝦貝類海產時，可以用鹽水浸洗嗎？為什麼？',
    frontPrompt: '點擊查看腸炎弧菌與鹽水清洗之關聯',
    backExplanation: '【不可犯錯誤】：以「鹽水」清洗海產。\n【後果】：造成「腸炎弧菌（Vibrio parahaemolyticus）」大量滋生機會！\n腸炎弧菌嗜鹽，在鹽水中生長極快；相反地，腸炎弧菌不耐淡水，因此海產應使用「乾淨自來水（淡水）」充分澈底沖洗！',
    keyNumbers: '鹽水洗海產 ➔ 腸炎弧菌狂飆！應用乾淨自來水洗！',
    slideRef: 20,
    tags: ['海產清洗', '腸炎弧菌', '嗜鹽菌']
  },
  {
    id: 'fc-16',
    category: 'forbidden',
    categoryName: '16大不可犯禁忌',
    title: '廚房大火快炒火舌超過炒菜鍋上緣',
    frontKeyPoint: '許多廚師習慣大火快炒，火舌竄出鍋緣有何危險？',
    frontPrompt: '點擊查看廚房火災風險',
    backExplanation: '【不可犯錯誤】：喜歡大火快炒，火舌超過炒菜鍋上緣。\n【後果】：「提高廚房火災機會」！火舌極易引燃排油煙罩、通風管道內積存之油垢，導致嚴重火災。',
    keyNumbers: '火舌超過鍋緣 ➔ 提高廚房火災機率',
    slideRef: 20,
    tags: ['大火快炒', '火舌過鍋緣', '廚房火災']
  },
  {
    id: 'fc-17',
    category: 'forbidden',
    categoryName: '16大不可犯禁忌',
    title: '外購不需加熱即食菜餚之風險',
    frontKeyPoint: '供應外購之雞捲、三色蛋、煎蛋、熟豬肝為何要拒絕？',
    frontPrompt: '點擊查看高食品中毒機會之原因',
    backExplanation: '【不可犯錯誤】：不需加熱即可食用的食品（外購菜餚如雞捲、煎蛋、三色蛋、雞心、豬肝、涼拌開胃小菜等）供消費者食用。\n【後果】：高食品中毒機會！此類外購熟食在購買前或運送途中極易已受微生物污染，若未經再次充分加熱，風險極高。',
    keyNumbers: '外購即食菜餚 ➔ 拒絕使用！極易食物中毒',
    slideRef: 20,
    tags: ['外購熟食', '高風險食材', '不需加熱']
  },
  {
    id: 'fc-18',
    category: 'forbidden',
    categoryName: '16大不可犯禁忌',
    title: '廚師形象與味覺殺手',
    frontKeyPoint: '嚼檳榔、抽菸對廚師有何傷害？穿廚師服逛街有何問題？',
    frontPrompt: '點擊查看味覺傷害與職業道德規範',
    backExplanation: '1. 味覺是廚師的第二生命：凡有破壞味覺的行為應少為之，尤以「檳榔」、「香菸」為甚。\n2. 著廚師服配戴飾物在公共場所出現：破壞廚師專業形象，被視為「廚師職業道德低落」且容易將外界細菌帶回廚房。',
    keyNumbers: '檳榔/香菸 ➔ 破壞味覺 | 穿廚師服逛街 ➔ 職業道德低落',
    slideRef: 18,
    tags: ['廚師味覺', '檳榔香菸', '職業形象']
  },

  // 柒 & 捌、砧板使用與熟食切割安全
  {
    id: 'fc-19',
    category: 'cutting_board',
    categoryName: '砧板與熟食冷盤',
    title: '砧板顏色四分法管理標準',
    frontKeyPoint: '熟食、蔬果、肉類、魚貝類分別使用什麼顏色的砧板？',
    frontPrompt: '點擊查看四色砧板標準配對',
    backExplanation: '• 白色：熟食砧板\n• 綠色：蔬果類砧板\n• 紅色：肉類砧板（生肉）\n• 藍色：魚貝類砧板（生鮮水產）\n【核心目的】：避免生熟食器具交叉污染！',
    keyNumbers: '白=熟食 | 綠=蔬果 | 紅=肉類 | 藍=魚貝類',
    slideRef: 22,
    tags: ['砧板顏色', '白色熟食', '交叉污染防範']
  },
  {
    id: 'fc-20',
    category: 'cutting_board',
    categoryName: '砧板與熟食冷盤',
    title: '砧板材質分類與使用限制',
    frontKeyPoint: '木質、HDPE/HDPP、Nylon砧板之特性與適用範圍？',
    frontPrompt: '點擊查看木質與塑膠/耐龍材質比對',
    backExplanation: '1. 木質：堅硬韌性高，但「多孔性易藏污納垢」，只「適用於切剁生食」，每天使用完應徹底清洗並用「氯水浸泡殺菌」。\n2. HDPE (高密度聚乙烯) / HDPP (高密度聚丙烯)：適用於切熟、生食。\n3. Nylon 6, 6.6 (耐龍材質 - 羽球/網球拍線材質)：適用於切、剁、生、熟食。',
    keyNumbers: '木質:多孔限生食+氯水泡 / HDPE:切生熟 / Nylon:切剁生熟',
    slideRef: 23,
    tags: ['木質砧板', 'HDPE', 'Nylon耐龍', '清潔保養']
  },
  {
    id: 'fc-21',
    category: 'cutting_board',
    categoryName: '砧板與熟食冷盤',
    title: '熟食切割安全五確認',
    frontKeyPoint: '烹調好的熟食若必須切割，必須先做哪「五個動作確認」？',
    frontPrompt: '點擊查看熟食切割避免交叉污染五確認',
    backExplanation: '原則上「最好食物不要有烹調過再切的動作」；如不可避免，應確認：\n1. 手洗了沒？\n2. 刀洗了沒？\n3. 砧板洗了沒？\n4. 抹布是否清潔？\n5. 免洗手套戴了沒？\n重點：避免熟食受二次交叉污染！',
    keyNumbers: '熟食切割5確認：手洗、刀洗、砧板洗、布潔、手套戴',
    slideRef: 24,
    tags: ['熟食切割', '五確認', '避免二次污染']
  },
  {
    id: 'fc-22',
    category: 'cutting_board',
    categoryName: '砧板與熟食冷盤',
    title: '冷盤砧板操作人員衛生特規',
    frontKeyPoint: '冷盤砧板操作人員工作區域為什麼必須有特設洗手台？',
    frontPrompt: '點擊查看冷盤高風險原因與洗手台設置規範',
    backExplanation: '【原因】：冷盤不再經過加熱即可食用，發生「二次污染」之可能性最高！\n【規範】：冷盤砧板操作人員附近區域，應設置專屬「洗手台」，並供給「消毒藥水」，以供隨時洗手與消毒。',
    keyNumbers: '冷盤免加熱風險最高 ➔ 必設專用洗手台與消毒藥水',
    slideRef: 26,
    tags: ['冷盤區', '專用洗手台', '二次污染']
  },

  // 拾壹~拾參、盤飾與沾料配置
  {
    id: 'fc-23',
    category: 'decoration',
    categoryName: '盤飾與沾料配置',
    title: '盤飾四大安全規範與香菜禁忌',
    frontKeyPoint: '盤飾可以比主菜多嗎？生鮮香菜（芫荽）直接插在滷肉上行嗎？',
    frontPrompt: '點擊查看盤飾定義與重大禁忌案例',
    backExplanation: '1. 盤飾依字面僅為「裝飾性質」，絕對「不可以多過主菜」。\n2. 大多為生鮮蔬果易帶菌，未經減菌或滅菌處理「不可與主菜直接接觸」！\n3. 盤飾需為「能食用之材質」。\n【重大錯誤案例】：生鮮芫荽（香菜）未經減菌直接擺在熟食滷肉/豬腳上，生菜細菌直接污染熟食造成食品中毒！',
    keyNumbers: '盤飾不多過主菜 | 未減菌不碰主菜 | 需為可食用材質',
    slideRef: 27,
    tags: ['盤飾安全', '生鮮芫荽', '減菌處理', '主菜接觸']
  },
  {
    id: 'fc-24',
    category: 'decoration',
    categoryName: '盤飾與沾料配置',
    title: '沾料配置安全原則（旁邊 vs 上方）',
    frontKeyPoint: '沾料擺在菜餚「旁邊」還是「上方」？依據什麼原則判斷？',
    frontPrompt: '點擊查看安全第一美味為次的沾料擺放法則',
    backExplanation: '【配置先後順序】：以「安全第一」，以「美味為次」。\n1. 菜餚【安全】＋ 沾料【安全】：可在旁邊或上方，為尊重原味消費者一般置於「菜餚旁邊」。\n2. 菜餚【危險】＋ 沾料【安全】：配置在「菜餚上方」！★ 以沾料之安全（如酸度、抑菌沾汁）來提升菜餚之安全！',
    keyNumbers: '安全第一，美味為次 | 菜餚危險➔沾料置於上方',
    slideRef: 30,
    tags: ['沾料配置', '安全第一', '擺盤位置']
  },

  // 拾肆~拾柒、五要原則與禁用毒素物質
  {
    id: 'fc-25',
    category: 'five_principles',
    categoryName: '五要原則與WHO',
    title: '預防食品中毒「五要原則」（食藥署 TFDA）',
    frontKeyPoint: 'TFDA 預防食品中毒之「五要」是哪五大原則？',
    frontPrompt: '點擊查看五要原則內容與溫度要求',
    backExplanation: '1. 要洗手：調理時手部要清潔，傷口要包紮。\n2. 要新鮮：食材要新鮮，用水要衛生。\n3. 要生熟食分開：生熟食器具分開，避免交叉污染。\n4. 要澈底加熱：食品中心溫度應超過 70℃！\n5. 要低溫保存：保存低於 7℃，室溫下不宜久置。',
    keyNumbers: '要洗手、要新鮮、要生熟分開、要澈底加熱(>70℃)、要低溫保存(<7℃)',
    slideRef: 31,
    tags: ['五要原則', '食藥署', '中心溫度70度']
  },
  {
    id: 'fc-26',
    category: 'five_principles',
    categoryName: '五要原則與WHO',
    title: '世界衛生組織 (WHO) 食品安全五大要點',
    frontKeyPoint: 'WHO Five Keys to Safer Food 五大重點內容為何？',
    frontPrompt: '點擊查看世界衛生組織國際標準',
    backExplanation: '一、經常保持清潔 (Keep clean)\n二、生熟食分開 (Separate raw and cooked)\n三、徹底加熱並熟食 (Cook thoroughly)\n四、保持食物的安全溫度 (Keep food at safe temperatures)\n五、使用安全的水及原物料 (Use safe water and raw materials)',
    keyNumbers: 'WHO Five Keys to Safer Food',
    slideRef: 37,
    tags: ['WHO', '國際食安', '五大要點']
  },
  {
    id: 'fc-27',
    category: 'toxic_substances',
    categoryName: '禁用物質與添加物',
    title: '未經 TFDA 許可食材案例',
    frontKeyPoint: '何首烏、板藍根可以用作一般普通餐飲料理食材嗎？',
    frontPrompt: '點擊查看未經許可食材之法規要求',
    backExplanation: '「不可以」！\n凡未經 TFDA《食品原料整合查詢平臺》許可使用之食材（例如：何首烏、板藍根等中藥材），餐飲業絕對不得擅自作為普通餐點食品原料添加，以免引發藥性中毒或違法。',
    keyNumbers: '未經TFDA整合平台許可不得使用（如：何首烏、板藍根）',
    slideRef: 34,
    tags: ['何首烏', '板藍根', 'TFDA原料平台']
  },
  {
    id: 'fc-28',
    category: 'toxic_substances',
    categoryName: '禁用物質與添加物',
    title: '11 種絕對不可觸及之非法化學添加物',
    frontKeyPoint: '常見非法毒性添加物有哪些？常見違法用途？',
    frontPrompt: '點擊查看 11 大黑名單物質',
    backExplanation: '1. 硼砂 (Borax)：違法用於貢丸年糕增加彈性防腐\n2. 吊白塊 (Rongalit)：違法漂白米粉潤餅皮\n3. 鹽基性介黃 (Auramine) & 4. 鹽基性桃紅精 (Rhodamine B)\n5. 蘇丹紅 (I~IV)：工業染料，違法添入辣椒粉\n6. 奶油黃/乳酪黃/白脫黃\n7. 橙色2號 & 8. 皂黃 (Metanil yellow)：違法染黃豆干\n9. 孔雀綠 (Malachite green) & 10. 龍膽紫\n11. 甘精 (Dulcin/Sucrol)：非法人造甜味劑。',
    keyNumbers: '硼砂、吊白塊、蘇丹紅、皂黃、孔雀綠、甘精等11種劇毒物',
    slideRef: 35,
    tags: ['非法添加物', '硼砂', '吊白塊', '蘇丹紅', '皂黃']
  },
  {
    id: 'fc-29',
    category: 'toxic_substances',
    categoryName: '禁用物質與添加物',
    title: '溴酸鉀（Potassium Bromate, KBrO3）之禁用',
    frontKeyPoint: '溴酸鉀曾用於什麼用途？為什麼現在全面禁止使用？',
    frontPrompt: '點擊查看強氧化劑與致癌性說明',
    backExplanation: '• 化學式：KBrO3，無色晶體，是一種強氧化劑。\n• 過去用途：曾被非法或早期用為「麵粉改良劑」以改善麵包組織膨脹與彈性。\n• 禁用原因：經研究證實具「致癌性」（破壞DNA造成器官腫瘤），現在法令已全面明令「不再使用」！',
    keyNumbers: '溴酸鉀 KBrO3 ➔ 強氧化劑 / 具致癌性 / 全面禁用',
    slideRef: 36,
    tags: ['溴酸鉀', '麵粉改良劑', '致癌物']
  }
];
