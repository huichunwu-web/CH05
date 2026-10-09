export interface StudentInfo {
  studentId: string; // 學生學號
  name: string;      // 學生姓名
  department: string;// 科系 / 班級
  seatNumber?: string;
  notes?: string;
}

export type Category = 
  | 'preparation'      // 上工前準備與衛生
  | 'numbers'          // 關鍵數字與溫度指標
  | 'forbidden'        // 廚師16大不可犯禁忌
  | 'cutting_board'    // 砧板與熟食冷盤安全
  | 'decoration'       // 盤飾與沾料配置
  | 'toxic_substances' // 禁用物質與非法添加物
  | 'five_principles'; // 五要原則與WHO安全要點

export interface Flashcard {
  id: string;
  category: Category;
  categoryName: string;
  title: string;
  frontKeyPoint: string;
  frontPrompt: string;
  backExplanation: string;
  keyNumbers?: string;
  slideRef: number;
  tags: string[];
}

export interface QuizQuestion {
  id: string;
  category: Category;
  categoryName: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  slideRef: number;
  highlightKeyword?: string;
}

export interface ScenarioCase {
  id: string;
  title: string;
  subtitle: string;
  kitchenRole: string;
  storyDescription: string;
  imageAlt: string;
  badPractices: {
    point: string;
    violationRule: string;
    riskAndPathogen: string; // 例如：腸炎弧菌、仙人掌桿菌、交叉污染
  }[];
  correctStandardProcedure: string[];
  keyRegulationRef: string;
  slideRef: number;
  quizQuestion: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export interface ExamResult {
  id: string;
  timestamp: number;
  student: StudentInfo;
  score: number;
  totalQuestions: number;
  correctCount: number;
  wrongCount: number;
  timeSpentSeconds: number;
  categoryBreakdown: Record<string, { total: number; correct: number }>;
  userAnswers: {
    questionId: string;
    selectedIndex: number;
    isCorrect: boolean;
  }[];
  rankTitle: string; // 卓越特級主廚 / 優秀合格廚師 / 待加強實習生
}
