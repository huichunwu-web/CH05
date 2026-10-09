import { QuizQuestion } from '../types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // 1
  {
    id: 'q-1',
    category: 'preparation',
    categoryName: '上工準備與衛生',
    question: '依據廚師良好作業規範，廚師上工前的工作衣帽應為何種顏色？且應於何處換著？',
    options: [
      '深色工作衣帽，於廚房調理區換著',
      '整齊白色之工作衣帽，於工作場所的更衣室換著',
      '任何顏色圍裙即可，在家中穿好直接騎車前往',
      '黃色工作衣帽，於食品倉庫更換'
    ],
    correctIndex: 1,
    explanation: '上工前應先穿著整齊白色之工作衣帽(鞋)，且應於工作場所更衣室換著，工作衣帽只可於工作場所穿著，不可穿出公共場所。',
    slideRef: 2,
    highlightKeyword: '整齊白色 / 更衣室'
  },
  // 2
  {
    id: 'q-2',
    category: 'preparation',
    categoryName: '上工準備與衛生',
    question: '關於廚師及餐飲從業人員之手部及儀容飾物規定，下列敘述何者正確？',
    options: [
      '為了看時間，可以佩戴防水手錶',
      '手部只要戴上透明戒指就合乎規定',
      '不可蓄留指甲、塗抹指甲油、化粧品及穿戴手錶、手鐲、戒指等飾物',
      '女性廚師可以塗抹無色指甲油以保護甲床'
    ],
    correctIndex: 2,
    explanation: '從業人員不可蓄留指甲、塗抹指甲油、化粧品，並嚴格禁止穿戴手錶、手鐲、戒指等飾物，以防止藏污納垢或異物掉入菜餚中。',
    slideRef: 3,
    highlightKeyword: '不可蓄留指甲、禁戴手錶戒指手鐲'
  },
  // 3
  {
    id: 'q-3',
    category: 'preparation',
    categoryName: '上工準備與衛生',
    question: '廚房欲配製 200 ppm 濃度之漂白水 5 公升，若使用 5% 次氯酸鈉原液，應抽取多少原液加入 5 公升自來水中？',
    options: [
      '10 cc',
      '20 cc',
      '50 cc',
      '100 cc'
    ],
    correctIndex: 1,
    explanation: '依濃度換算表：5% 次氯酸鈉溶液放入 5 公升自來水時，應取 20 cc 攪拌均勻，即可配製成 200 ppm 漂白水（10%取10cc、5%取20cc、2%取50cc、1%取100cc）。',
    slideRef: 3,
    highlightKeyword: '5% 濃度取 20 cc'
  },
  // 4
  {
    id: 'q-5',
    category: 'preparation',
    categoryName: '上工準備與衛生',
    question: '廚師在備料時不慎切傷手指並有化膿現象，依據 GHP 規範應如何處置？',
    options: [
      '用抹布包紮後即可繼續切熟食',
      '只要戴上單層棉紗手套即可繼續處理生魚片',
      '手部有創傷、膿瘡者，不得從事直接接觸食品之工作，以防範食品中毒',
      '噴酒精消毒後直接翻炒熱菜'
    ],
    correctIndex: 2,
    explanation: '凡手部有創傷、膿瘡，不得從事直接接觸食品之工作！傷口化膿常含有金黃色葡萄球菌，會產生耐熱毒素引起嚴重食物中毒。',
    slideRef: 7,
    highlightKeyword: '手部創傷膿瘡不得直接碰食品'
  },
  // 6
  {
    id: 'q-6',
    category: 'preparation',
    categoryName: '上工準備與衛生',
    question: '食品從業人員正確洗手步驟包含「濕、洗、刷、搓、沖、乾」，其中「搓」洗雙手至少需持續幾秒鐘？',
    options: [
      '5 秒',
      '10 秒',
      '至少 20 秒',
      '至少 60 秒'
    ],
    correctIndex: 2,
    explanation: '正確洗手步驟中，「搓」洗手心手背及指縫至少需 20 秒，且應利用乾淨指甲刷（刷）將指尖及指甲縫刷洗乾淨。',
    slideRef: 7,
    highlightKeyword: '搓洗至少 20 秒'
  },
  // 7
  {
    id: 'q-7',
    category: 'numbers',
    categoryName: '關鍵數字與溫度',
    question: '一般餐廳其「廚房與營業場所面積比例」之標準為多少？一般理想比例約為多少？',
    options: [
      '1/1 ~ 1/2，理想比 1:1',
      '1/3 ~ 1/5，理想廚房與供膳場所比例約 1:3 左右',
      '大於 1/10，理想比 1:8',
      '1/8 ~ 1/15，理想比 1:10'
    ],
    correctIndex: 1,
    explanation: '一般餐廳廚房與營業場所面積比為 1/3 ~ 1/5，一般理想廚房與供膳場所（餐廳）之比例約為 1:3 左右。',
    slideRef: 9,
    highlightKeyword: '一般餐廳 1/3 ~ 1/5'
  },
  // 8
  {
    id: 'q-8',
    category: 'numbers',
    categoryName: '關鍵數字與溫度',
    question: '計算廚房大小時，依機械器具多寡面積計算，「廚房總面積／機械器具面積」之比值應在多少範圍內？',
    options: [
      '0.5 ~ 1.0',
      '1.0 ~ 2.0',
      '1.5 ~ 5.0',
      '5.0 ~ 10.0'
    ],
    correctIndex: 2,
    explanation: '廚房總面積／機械器具面積 ＝ 1.5 ~ 5.0，確保器具進駐後廚師仍有足夠安全的動線與作業空間。',
    slideRef: 10,
    highlightKeyword: '1.5 ~ 5.0'
  },
  // 9
  {
    id: 'q-9',
    category: 'numbers',
    categoryName: '關鍵數字與溫度',
    question: '以從業人員為主計算廚房面積時，第一位從業人員所需面積為多少？每增加一人增加多少？',
    options: [
      '第一位 2.0 平方公尺，每增一人加 1.0 平方公尺',
      '第一位 3.3 平方公尺，每增加一人則增加 1.7 平方公尺之面積',
      '第一位 5.0 平方公尺，每增一人加 3.0 平方公尺',
      '每位從業人員一律固定 2.5 平方公尺'
    ],
    correctIndex: 1,
    explanation: '第一位從業人員所需面積為 3.3 平方公尺（約合 1 坪），之後每增加一人，則增加 1.7 平方公尺之面積。',
    slideRef: 10,
    highlightKeyword: '首人 3.3 m²，每增一人 +1.7 m²'
  },
  // 10
  {
    id: 'q-10',
    category: 'numbers',
    categoryName: '關鍵數字與溫度',
    question: '廚房環境之適宜高度、溫度及濕度規範，下列數值何者完全正確？',
    options: [
      '高度 2.0 公尺以上、溫度 15~18℃、濕度 70~80%',
      '高度 2.4 公尺以上、溫度 20~25℃、濕度 50~55%',
      '高度 3.0 公尺以上、溫度 26~30℃、濕度 40~45%',
      '高度 2.2 公尺以上、溫度 10~15℃、濕度 60~65%'
    ],
    correctIndex: 1,
    explanation: '廚房適宜的高度為 2.4 公尺以上；適宜溫度為 20 ~ 25℃ 間；適宜濕度為 50 ~ 55%（過高濕度易促使黴菌與細菌大量孳生）。',
    slideRef: 11,
    highlightKeyword: '高 ≥2.4m / 溫 20~25℃ / 濕 50~55%'
  },
  // 11
  {
    id: 'q-11',
    category: 'numbers',
    categoryName: '關鍵數字與溫度',
    question: '廚房適宜的光度（照度）標準，工作台與非工作台分別應在多少米燭光以上？',
    options: [
      '工作台 100 米燭光以上、非工作台 50 米燭光以上',
      '工作台 200 米燭光以上、非工作台 100 米燭光以上',
      '工作台 500 米燭光以上、非工作台 300 米燭光以上',
      '工作台 150 米燭光以上、非工作台 150 米燭光以上'
    ],
    correctIndex: 1,
    explanation: '工作台應在 200 米燭光（Lux）以上，非工作台應在 100 米燭光以上，以維持廚房作業清晰度與清潔辨識。',
    slideRef: 11,
    highlightKeyword: '工作台 ≥200 / 非工作台 ≥100'
  },
  // 12 (New Question 1 replacing original 12)
  {
    id: 'q-12',
    category: 'preparation',
    categoryName: '上工準備與衛生',
    question: '廚師上工時穿戴之工作帽與鞋具規範，下列何者符合規定？',
    options: [
      '工作帽應能掩蓋頭部前緣之頭髮，且應避免穿著短褲、拖鞋、涼鞋',
      '只要戴鴨舌帽露出前額頭髮即可',
      '為了廚房通風涼爽可以穿著透氣涼鞋',
      '工作帽只在衛生局稽查時才需要戴著'
    ],
    correctIndex: 0,
    explanation: '依據規範，上工前應穿著整齊白色工作衣帽，工作帽應能掩蓋頭部前緣之頭髮，以防頭髮、頭屑落入食品中；並應避免穿著短褲、拖鞋、涼鞋。',
    slideRef: 2,
    highlightKeyword: '掩蓋前緣頭髮 / 禁短褲拖鞋涼鞋'
  },
  // 13 (Original with "關於容器材質使用安全" removed as requested)
  {
    id: 'q-13',
    category: 'numbers',
    categoryName: '關鍵數字與溫度',
    question: '下列敘述何者違反衛生安全規範？',
    options: [
      '不可以保麗龍容器盛裝 100℃ 以上之食物',
      '香腸添加硝酸鈉或亞硝酸鈉量（以二氧化氮計）為 70ppm 以下',
      '餐飲安全衛生紀錄及發票票根應保存 5 年',
      '酸化罐頭食品 pH 值應保持在 6.5 以上'
    ],
    correctIndex: 3,
    explanation: '選項 D 違規！酸化罐頭食品之 pH 值應保持在 4.6 以下（防止肉毒桿菌孢子生長產生神經毒素）。保麗龍不可裝 100℃ 以上熱食，香腸亞硝酸鈉量 70ppm 以下，衛生紀錄發票保存 5 年。',
    slideRef: 17,
    highlightKeyword: '酸化罐頭 pH ≤ 4.6'
  },
  // 14
  {
    id: 'q-14',
    category: 'numbers',
    categoryName: '關鍵數字與溫度',
    question: '最適合病原細菌繁殖生長之危險溫度帶為多少？',
    options: [
      '0 ∼ 10℃ 間',
      '16 ∼ 49℃ 間',
      '50 ∼ 65℃ 間',
      '70 ∼ 85℃ 間'
    ],
    correctIndex: 1,
    explanation: '最適合細菌生產與大量繁衍的危險溫度區間為 16 ∼ 49℃，食品在此溫度帶停留時間越長，中毒風險呈倍數激增。',
    slideRef: 12,
    highlightKeyword: '16 ∼ 49℃'
  },
  // 15
  {
    id: 'q-15',
    category: 'numbers',
    categoryName: '關鍵數字與溫度',
    question: '在細菌生長的「FAT TOM（胖湯姆理論）」中，有利一般細菌生長的水活性（Moisture, Aw）條件為多少？',
    options: [
      '水活性在 0.35 以下',
      '水活性在 0.50 以下',
      '水活性在 0.85 以上',
      '與水分無關，只要有空氣即可'
    ],
    correctIndex: 2,
    explanation: 'FAT TOM 理論中，M 代表水分/水活性（Moisture），當水活性在 0.85 以上時極利細菌繁衍；水活性低於 0.85 食品則相對較耐常溫存放。',
    slideRef: 13,
    highlightKeyword: '水活性 ≥ 0.85'
  },
  // 16 (New Question 2 replacing original 16)
  {
    id: 'q-16',
    category: 'numbers',
    categoryName: '關鍵數字與溫度',
    question: '依據餐具衛生殺菌規範，使用「熱水殺菌」處理餐具時，其標準水溫與加熱時間應為？',
    options: [
      '60℃ 以上熱水，加熱 30 秒以上',
      '70℃ 以上熱水，加熱 1 分鐘以上',
      '80℃ 以上之熱水，加熱時間 2 分鐘以上',
      '90℃ 以上熱水，加熱 10 秒鐘即可'
    ],
    correctIndex: 2,
    explanation: '依據物理殺菌規範，餐具等以 80℃ 以上之熱水，加熱時間二分鐘以上；或以 100℃ 之蒸汽加熱二分鐘以上。',
    slideRef: 14,
    highlightKeyword: '熱水殺菌：80℃以上 / 2分鐘以上'
  },
  // 17
  {
    id: 'q-17',
    category: 'numbers',
    categoryName: '關鍵數字與溫度',
    question: '依據物理殺菌規範，使用「煮沸殺菌」處理毛巾、抹布，應以 100℃ 之沸水煮沸多久以上？',
    options: [
      '30 秒以上',
      '1 分鐘以上',
      '3 分鐘以上',
      '5 分鐘以上'
    ],
    correctIndex: 3,
    explanation: '煮沸殺菌標準：毛巾、抹布以 100℃ 沸水煮沸 5 分鐘以上；餐具等則為 1 分鐘以上。',
    slideRef: 14,
    highlightKeyword: '抹布沸水 ≥5 分鐘 / 餐具 ≥1 分鐘'
  },
  // 18
  {
    id: 'q-18',
    category: 'numbers',
    categoryName: '關鍵數字與溫度',
    question: '依規定，使用地下水源之餐飲場所，其水源與化糞池、廢棄物堆積等污染源至少應保持多少距離？',
    options: [
      '3 公尺',
      '5 公尺',
      '10 公尺',
      '至少保持 15 公尺之距離'
    ],
    correctIndex: 3,
    explanation: '使用地下水源者，其水源與化糞池、廢棄物堆積場所等污染源，應至少保持 15 公尺之距離；若是蓄水池(塔、槽)則距污染源 3 公尺以上。',
    slideRef: 16,
    highlightKeyword: '地下水 ≥15 公尺 / 蓄水池 ≥3 公尺'
  },
  // 19
  {
    id: 'q-19',
    category: 'numbers',
    categoryName: '關鍵數字與溫度',
    question: '油炸用食用油經油質檢驗，當「總極性化合物（TPC）」含量達到多少百分比以上時，不得再使用並應全部更換新油？',
    options: [
      '10% 以上',
      '15% 以上',
      '20% 以上',
      '25% 以上'
    ],
    correctIndex: 3,
    explanation: '油炸用食用油之總極性化合物 (total polar compounds) 含量達百分之二十五（25%）以上時，不得再予使用，應全部更換新油。',
    slideRef: 17,
    highlightKeyword: '總極性化合物 ≥ 25%'
  },
  // 20 (New Question 3 replacing original 20)
  {
    id: 'q-20',
    category: 'preparation',
    categoryName: '上工準備與衛生',
    question: '餐飲從業人員於作業場所工作時，下列何種行為違反衛生作業規範？',
    options: [
      '將個人換洗衣物置於工作場所更衣室',
      '工作時飲食、吸菸、嚼檳榔或蓄意長時間聊天、唱歌',
      '每進行下一個不同動作前澈底洗手',
      '雙手直接調理即食熟食時穿戴不透水手套'
    ],
    correctIndex: 1,
    explanation: '餐飲從業人員工作時，不得有吸菸、嚼檳榔、嚼口香糖、飲食或蓄意長時間聊天、唱歌等可能污染食品之行為；個人衣物應置於更衣室，不得帶入作業場所。',
    slideRef: 5,
    highlightKeyword: '工作時禁吸菸檳榔、禁蓄意聊天唱歌'
  },
  // 21
  {
    id: 'q-22',
    category: 'decoration',
    categoryName: '盤飾與沾料配置',
    question: '下列關於盤飾之衛生安全規範，何者較容易發生食物中毒？',
    options: [
      '盤飾份量少於主菜',
      '盤飾採用經減菌處理之胡蘿蔔花雕並與主菜接觸',
      '將未經減菌處理之生鮮芫荽（香菜）直接插在剛出鍋的熱滷豬腳熟食上',
      '盤飾均使用可食用之乾淨食材'
    ],
    correctIndex: 2,
    explanation: '生鮮芫荽（香菜）大多帶有泥土與生水雜菌，若未經減菌處理直接與熟食接觸，生菜上的細菌會直接污染熟食，極易引起嚴重食物中毒！',
    slideRef: 27,
    highlightKeyword: '生鮮芫荽直接接觸熟食 ➔ 污染熟食'
  },
  // 23
  {
    id: 'q-23',
    category: 'forbidden',
    categoryName: '16大不可犯禁忌',
    question: '部分廚師為追求鑊氣，炒菜時「火舌超過炒菜鍋上緣」，主要會引發何種公共危險？',
    options: [
      '食材營養全數流失',
      '提高廚房火災機會（引燃排油煙罩積油）',
      '使鍋具迅速變形',
      '鍋氣過重導致食物酸敗'
    ],
    correctIndex: 1,
    explanation: '大火快炒且火舌超過炒菜鍋上緣，極易瞬間引燃排煙罩及風管中的油垢，大幅提高廚房發生嚴重火災的機率。',
    slideRef: 20,
    highlightKeyword: '火舌超過鍋緣 ➔ 提高火災機會'
  },
  // 24
  {
    id: 'q-24',
    category: 'forbidden',
    categoryName: '16大不可犯禁忌',
    question: '下列何種行為被指出會破壞廚師的第二生命「味覺」？',
    options: [
      '經常試吃原味清蒸鱸魚',
      '嚼食檳榔與抽香菸',
      '飲用溫開水',
      '每餐攝取清淡蔬菜'
    ],
    correctIndex: 1,
    explanation: '味覺是廚師的第二生命，凡有破壞味覺的行為應儘量少為之，尤以「檳榔」、「香菸」為甚！長期嚼檳榔與抽菸會使味蕾鈍化萎縮。',
    slideRef: 18,
    highlightKeyword: '嚼檳榔、抽菸 ➔ 破壞味覺'
  },
  // 25
  {
    id: 'q-25',
    category: 'cutting_board',
    categoryName: '砧板與熟食冷盤',
    question: '餐飲衛生規範中，砧板顏色四分法管理，綠色、紅色、藍色、白色分別代表什麼用途？',
    options: [
      '白：生豬肉、綠：海鮮、紅：熟食、藍：蔬菜',
      '白：熟食、綠：蔬果類、紅：肉類、藍：魚貝類',
      '白：甜點、綠：生魚片、紅：熟牛肉、藍：雞肉',
      '白：生雞肉、綠：熟食、紅：生蔬果、藍：熟魚'
    ],
    correctIndex: 1,
    explanation: '正確砧板分色：【白色】熟食砧板、【綠色】蔬果類砧板、【紅色】肉類砧板、【藍色】魚貝類砧板。嚴格分色可徹底避免生熟食交叉污染。',
    slideRef: 22,
    highlightKeyword: '白熟食 / 綠蔬果 / 紅肉類 / 藍魚貝'
  },
  // 26
  {
    id: 'q-26',
    category: 'cutting_board',
    categoryName: '砧板與熟食冷盤',
    question: '關於「木質砧板」的材質特性與使用規範，下列何者正確？',
    options: [
      '毛細孔少，最適合用於切無菌熟食',
      '堅硬、韌性高，但因多孔性易藏納垢，僅適用於切剁生食，且每天使用完應徹底清洗並用氯水浸泡殺菌',
      '可以用於切生食與熟食，且不需要特別浸泡消毒',
      '木質砧板不可用清潔劑洗滌，只需陽光曝曬即可'
    ],
    correctIndex: 1,
    explanation: '木質砧板優點為堅硬韌性高，但缺點是多孔性易藏污納垢，因此法規指引其「適用於切剁生食」，每天使用完後應徹底清洗並用氯水浸泡殺菌。',
    slideRef: 23,
    highlightKeyword: '多孔性 / 限切剁生食 / 每日氯水浸泡'
  },
  // 27
  {
    id: 'q-27',
    category: 'cutting_board',
    categoryName: '砧板與熟食冷盤',
    question: '烹調完成的熟食若不可避免需要切割，廚師應在動刀前確認哪「五個動作」？',
    options: [
      '排煙開了沒、圍裙繫了沒、叫號機開了沒、擺盤好了沒、客人到了沒',
      '手洗了沒、刀洗了沒、砧板洗了沒、抹布是否清潔、免洗手套戴了沒',
      '油溫夠了沒、鹽巴放了沒、味精放了沒、米酒加了沒、火熄了沒',
      '拍照了沒、發票開了沒、菜單劃了沒、筷子備了沒、桌子擦了沒'
    ],
    correctIndex: 1,
    explanation: '熟食切割防交叉污染五確認動作：1. 手洗了沒 2. 刀洗了沒 3. 砧板洗了沒 4. 抹布是否清潔 5. 免洗手套戴了沒。',
    slideRef: 24,
    highlightKeyword: '手洗、刀洗、砧板洗、抹布潔、手套戴'
  },
  // 28
  {
    id: 'q-28',
    category: 'cutting_board',
    categoryName: '砧板與熟食冷盤',
    question: '冷盤砧板操作人員附近區域，為何依規定必須特別設置「專用洗手台」並供給消毒藥水？',
    options: [
      '因為冷盤廚師汗水比較多',
      '因為冷盤食材不需加熱即可食用，發生二次污染的可能性最高',
      '為了方便隨時洗水果試吃',
      '因為法規要求每個角落都要有水槽'
    ],
    correctIndex: 1,
    explanation: '冷盤食品直接供消費者食用不再回鍋加熱，一旦沾染細菌即成致病媒介，二次污染風險最高，故工作區旁必須設有專用洗手台與消毒藥水以供隨時洗手消毒。',
    slideRef: 26,
    highlightKeyword: '冷盤免加熱二次污染最高 ➔ 設專用洗手台'
  },
  // 29 (New Question 4 replacing original 29)
  {
    id: 'q-29',
    category: 'numbers',
    categoryName: '關鍵數字與溫度',
    question: '關於水活性大於 0.85 且須冷藏之真空包裝即食食品，其貯存、運輸及販賣過程之溫度應維持在幾度以下？',
    options: [
      '15℃ 以下',
      '10℃ 以下',
      '7℃ 以下',
      '0℃ 以下'
    ],
    correctIndex: 2,
    explanation: '依據規範第二十條：水活性大於 0.85 且須冷藏之真空包裝即食食品，其貯存、運輸及販賣過程，均應於 7℃ 以下進行。',
    slideRef: 16,
    highlightKeyword: '冷藏真空包裝即食食品 ≤ 7℃'
  },
  // 30
  {
    id: 'q-30',
    category: 'toxic_substances',
    categoryName: '禁用物質與添加物',
    question: '「溴酸鉀（Potassium bromate, KBrO3）」過去曾被非法或早年作為麵粉改良劑，如今全面禁用的主要原因為何？',
    options: [
      '因其具有放射性',
      '因考慮其具「致癌性」',
      '因成本太高不敷使用',
      '因會讓麵包產生苦味'
    ],
    correctIndex: 1,
    explanation: '溴酸鉀為強氧化劑，曾被用為麵粉改良劑增加筋度膨脹，但因具有動物及人體「致癌性」，現代法規已全面嚴禁在食品中使用。',
    slideRef: 36,
    highlightKeyword: '具致癌性 ➔ 禁用'
  },
  // 31
  {
    id: 'q-31',
    category: 'toxic_substances',
    categoryName: '禁用物質與添加物',
    question: '下列非法化學添加物與其常見違法濫用情境，何者配對「錯誤」？',
    options: [
      '硼砂 (Borax) — 違法添入肉羹、貢丸增加脆度與防腐',
      '吊白塊 (Rongalit) — 違法用於米粉、潤餅皮漂白防腐',
      '皂黃 (Metanil yellow) — 違法將黃豆干染色使其色澤鮮黃持久',
      '何首烏、板藍根 — 已通過 TFDA 許可，可在各類一般點心任意大量添加'
    ],
    correctIndex: 3,
    explanation: '何首烏、板藍根未經 TFDA《食品原料整合查詢平臺》許可作為一般食品原料使用，餐飲業者不得擅自作為一般餐飲食材添加。硼砂、吊白塊、皂黃皆屬 11 大黑名單非法添加物。',
    slideRef: 34,
    highlightKeyword: '何首烏、板藍根未經TFDA平台許可'
  },
  // 32
  {
    id: 'q-32',
    category: 'five_principles',
    categoryName: '五要原則與WHO',
    question: '衛生福利部食品藥物管理署（TFDA）宣導預防食品中毒之「五要原則」中，關於加熱的要求為中心溫度應超過幾度？',
    options: [
      '50℃',
      '60℃',
      '70℃',
      '100℃ 乾燒'
    ],
    correctIndex: 2,
    explanation: '五要原則中的「要澈底加熱」：食品中心溫度應超過 70℃，才能確保大部分病原菌及病毒被有效消滅。',
    slideRef: 31,
    highlightKeyword: '中心溫度超過 70℃'
  }
];
