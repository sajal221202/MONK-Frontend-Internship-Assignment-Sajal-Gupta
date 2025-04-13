export interface Option {
  id?: number;
  text?: string;
}

export interface Blank {
  id: number;
  answer: string;
  userAnswer?: string;
}

export interface Question {
  id?: number;
  questionId: string;
  question: string;
  questionType: string;
  answerType: string;
  options: string[];
  correctAnswer: string[];
  userAnswers?: string[];
}

export interface Result {
  questionId: string;
  question: string;
  isCorrect: boolean;
  userAnswers: string[];
  correctAnswers: string[];
}

export interface ApiResponse {
  status: string;
  data: {
    testId: string;
    questions: Question[];
  };
  message: string;
  activity: {
    id: string;
    userId: string;
    type: string;
    coinType: string;
    coins: number;
    description: string;
    createdAt: string;
  };
} 