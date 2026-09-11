export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          name: string;
          email: string;
          avatar_url: string | null;
          knowledge_level: string | null;
          preferred_language: string | null;
          learning_style: string | null;
          learning_goal: string | null;
          study_time: string | null;
          topic: string | null;
          career_goal: string | null;
          onboarding_completed: boolean;
          created_at: string;
        };
        Insert: {
          id: string;
          name?: string;
          email?: string;
          avatar_url?: string | null;
          knowledge_level?: string | null;
          preferred_language?: string | null;
          learning_style?: string | null;
          learning_goal?: string | null;
          study_time?: string | null;
          topic?: string | null;
          career_goal?: string | null;
          onboarding_completed?: boolean;
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>;
      };
      topics: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          level: string;
          progress: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          level?: string;
          progress?: number;
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['topics']['Insert']>;
      };
      lessons: {
        Row: {
          id: string;
          user_id: string;
          topic: string;
          title: string;
          level: string;
          language: string;
          sections: Json;
          estimated_time: number;
          progress: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          topic: string;
          title: string;
          level?: string;
          language?: string;
          sections?: Json;
          estimated_time?: number;
          progress?: number;
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['lessons']['Insert']>;
      };
      uploaded_documents: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          size: number;
          pages: number;
          status: string;
          summary: string | null;
          key_concepts: Json | null;
          definitions: Json | null;
          formulas: Json | null;
          sections: Json | null;
          important_questions: Json | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          size: number;
          pages?: number;
          status?: string;
          summary?: string | null;
          key_concepts?: Json | null;
          definitions?: Json | null;
          formulas?: Json | null;
          sections?: Json | null;
          important_questions?: Json | null;
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['uploaded_documents']['Insert']>;
      };
      conversations: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          topic: string | null;
          messages: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          topic?: string | null;
          messages?: Json;
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['conversations']['Insert']>;
      };
      flashcards: {
        Row: {
          id: string;
          user_id: string;
          topic: string;
          front: string;
          back: string;
          difficulty: string;
          status: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          topic: string;
          front: string;
          back: string;
          difficulty?: string;
          status?: string;
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['flashcards']['Insert']>;
      };
      quizzes: {
        Row: {
          id: string;
          user_id: string;
          topic: string;
          difficulty: string;
          questions: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          topic: string;
          difficulty?: string;
          questions: Json;
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['quizzes']['Insert']>;
      };
      quiz_attempts: {
        Row: {
          id: string;
          user_id: string;
          quiz_id: string;
          topic: string;
          score: number;
          accuracy: number;
          time_taken: number;
          results: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          quiz_id: string;
          topic: string;
          score?: number;
          accuracy?: number;
          time_taken?: number;
          results?: Json;
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['quiz_attempts']['Insert']>;
      };
      weak_topics: {
        Row: {
          id: string;
          user_id: string;
          topic: string;
          score: number;
          attempts: number;
          recommended_action: string;
          last_tested: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          topic: string;
          score?: number;
          attempts?: number;
          recommended_action?: string;
          last_tested?: string;
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['weak_topics']['Insert']>;
      };
      revision_items: {
        Row: {
          id: string;
          user_id: string;
          topic: string;
          summary: string;
          key_points: Json;
          formulas: Json | null;
          common_mistakes: Json;
          next_review: string;
          status: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          topic: string;
          summary: string;
          key_points: Json;
          formulas?: Json | null;
          common_mistakes: Json;
          next_review?: string;
          status?: string;
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['revision_items']['Insert']>;
      };
      videos: {
        Row: {
          id: string;
          user_id: string;
          topic: string;
          level: string;
          language: string;
          duration: string;
          style: string;
          voice_language: string;
          subtitles: string;
          status: string;
          progress: number;
          video_url: string | null;
          thumbnail_url: string | null;
          created_at: string;
          completed_at: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          topic: string;
          level?: string;
          language?: string;
          duration?: string;
          style?: string;
          voice_language?: string;
          subtitles?: string;
          status?: string;
          progress?: number;
          video_url?: string | null;
          thumbnail_url?: string | null;
          created_at?: string;
          completed_at?: string | null;
        };
        Update: Partial<Database['public']['Tables']['videos']['Insert']>;
      };
      notifications: {
        Row: {
          id: string;
          user_id: string;
          type: string;
          title: string;
          message: string;
          date: string;
          read: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          type?: string;
          title: string;
          message: string;
          date?: string;
          read?: boolean;
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['notifications']['Insert']>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}
