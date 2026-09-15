export type KnowledgeLevel =
  | 'beginner'
  | 'intermediate'
  | 'good'
  | 'advanced'
  | 'revision';

export type Language = 'english' | 'tamil';

export type LearningStyle =
  | 'simple'
  | 'examples'
  | 'visual'
  | 'code'
  | 'practice'
  | 'mixed';

export type LearningGoal =
  | 'college'
  | 'placement'
  | 'interview'
  | 'career_change'
  | 'personal'
  | 'certification'
  | 'other';

export type StudyTime = '15min' | '30min' | '1hour' | '2hours';

export type JobStatus =
  | 'queued'
  | 'processing'
  | 'generating'
  | 'completed'
  | 'failed';

export type QuestionType =
  | 'mcq'
  | 'true_false'
  | 'fill_blank'
  | 'coding'
  | 'short_answer';

export type VideoStyle =
  | 'clean_educational'
  | 'diagram_based'
  | 'code_focused'
  | 'presentation';

export type SubtitleOption = 'english' | 'tamil' | 'both' | 'none';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  knowledgeLevel: KnowledgeLevel;
  preferredLanguage: Language;
  learningStyle: LearningStyle;
  learningGoal: LearningGoal;
  studyTime: StudyTime;
  topic?: string;
  careerGoal?: string;
  createdAt: string;
  onboardingCompleted: boolean;
}

export interface LessonSection {
  id: string;
  title: string;
  content: string;
  order: number;
}

export interface Lesson {
  id: string;
  topic: string;
  title: string;
  level: KnowledgeLevel;
  language: Language;
  sections: LessonSection[];
  estimatedTime: number;
  createdAt: string;
  progress: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  context?: string;
}

export interface Conversation {
  id: string;
  title: string;
  topic?: string;
  messages: ChatMessage[];
  createdAt: string;
}

export interface Flashcard {
  id: string;
  topic: string;
  front: string;
  back: string;
  difficulty: 'easy' | 'medium' | 'hard';
  status: 'new' | 'learning' | 'known' | 'difficult';
}

export interface QuizQuestion {
  id: string;
  question: string;
  type: QuestionType;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  topic: string;
  difficulty: KnowledgeLevel;
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  topic: string;
  score: number;
  accuracy: number;
  timeTaken: number;
  date: string;
  results: TopicScore[];
}

export interface TopicScore {
  topic: string;
  score: number;
}

export interface WeakTopic {
  id: string;
  topic: string;
  score: number;
  attempts: number;
  recommendedAction: string;
  lastTested: string;
}

export interface RevisionItem {
  id: string;
  topic: string;
  summary: string;
  keyPoints: string[];
  formulas?: string[];
  commonMistakes: string[];
  nextReview: string;
  status: 'due' | 'reviewed' | 'mastered';
}

export interface UploadedDocument {
  id: string;
  name: string;
  size: number;
  pages: number;
  uploadedAt: string;
  status: JobStatus;
  summary?: string;
  keyConcepts?: string[];
  definitions?: { term: string; definition: string }[];
  formulas?: string[];
  sections?: { title: string; summary: string }[];
  importantQuestions?: string[];
}

export interface VideoGenerationJob {
  id: string;
  topic: string;
  level: KnowledgeLevel;
  language: Language;
  duration: string;
  style: VideoStyle;
  voiceLanguage: Language;
  subtitles: SubtitleOption;
  status: JobStatus;
  progress: number;
  steps: { name: string; status: JobStatus }[];
  videoUrl?: string;
  thumbnailUrl?: string;
  createdAt: string;
  completedAt?: string;
  cached?: boolean;
}

export interface CareerPath {
  id: string;
  title: string;
  description: string;
  icon: string;
  stages: CareerStage[];
}

export interface CareerStage {
  id: string;
  name: string;
  level: KnowledgeLevel;
  skills: CareerSkill[];
}

export interface CareerSkill {
  id: string;
  name: string;
  level: KnowledgeLevel;
  progress: number;
  resources: string[];
}

export interface DashboardStats {
  topicsLearned: number;
  testsCompleted: number;
  averageScore: number;
  learningStreak: number;
  masteryPercentage: number;
  timeSpent: number;
  flashcardsReviewed: number;
  revisionCompleted: number;
}

export interface WeeklyActivity {
  day: string;
  minutes: number;
  topics: number;
}

export interface ProgressData {
  topic: string;
  mastery: number;
  lessonsCompleted: number;
  testsTaken: number;
}

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  date: string;
  read: boolean;
}

export interface CommunityPost {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  authorRole: string;
  title: string;
  content: string;
  topic: string;
  tags: string[];
  likes: number;
  likedByMe: boolean;
  comments: CommunityComment[];
  createdAt: string;
  pinned?: boolean;
}

export interface CommunityComment {
  id: string;
  authorId: string;
  authorName: string;
  authorRole: string;
  content: string;
  likes: number;
  createdAt: string;
}
