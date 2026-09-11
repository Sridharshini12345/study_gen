import type {
  KnowledgeLevel,
  Language,
  LearningStyle,
  Lesson,
  QuizQuestion,
  Flashcard,
  WeakTopic,
  ChatMessage,
  VideoGenerationJob,
} from './types';

export interface LessonGenerationParams {
  topic: string;
  level: KnowledgeLevel;
  language: Language;
  learningStyle: LearningStyle;
  duration: string;
}

export interface QuizGenerationParams {
  topic: string;
  difficulty: KnowledgeLevel;
  numQuestions: number;
  questionTypes: string[];
}

export interface VideoGenerationParams {
  topic: string;
  level: KnowledgeLevel;
  language: Language;
  duration: string;
  style: string;
  voiceLanguage: Language;
  subtitles: string;
}

export interface AIContext {
  topic?: string;
  lessonTitle?: string;
  knowledgeLevel?: KnowledgeLevel;
  learningStyle?: LearningStyle;
  language?: Language;
  pdfContext?: string;
  previousMistakes?: string[];
  conversationHistory?: ChatMessage[];
}

export interface AIService {
  generateLesson(params: LessonGenerationParams): Promise<Lesson>;
  generateExplanation(
    concept: string,
    context: AIContext
  ): Promise<string>;
  generateNotes(topic: string, content: string): Promise<string>;
  generateQuiz(params: QuizGenerationParams): Promise<QuizQuestion[]>;
  generateFlashcards(topic: string, content: string): Promise<Flashcard[]>;
  analyzeWeakTopics(
    quizResults: { topic: string; score: number }[]
  ): Promise<WeakTopic[]>;
  answerQuestion(
    question: string,
    context: AIContext
  ): Promise<string>;
  generateVideoScript(params: VideoGenerationParams): Promise<string>;
  generateSummary(topic: string, content: string): Promise<string>;
}

export function isAIConfigured(): boolean {
  return Boolean(process.env.GEMINI_API_KEY || process.env.GOOGLE_AI_API_KEY);
}
