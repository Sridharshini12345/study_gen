'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
  Search, GraduationCap, Languages, Lightbulb, Clock,
  Sparkles, ArrowRight, Zap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/lib/auth-context';
import { suggestedTopics } from '@/lib/demo-data';
import type { KnowledgeLevel, Language, LearningStyle } from '@/lib/types';
import { cn } from '@/lib/utils';

export default function LearnClient() {
  const router = useRouter();
  const { profile } = useAuth();
  const [topic, setTopic] = React.useState('');
  const [level, setLevel] = React.useState<KnowledgeLevel>(profile?.knowledgeLevel || 'intermediate');
  const [language, setLanguage] = React.useState<Language>(profile?.preferredLanguage || 'english');
  const [style, setStyle] = React.useState<LearningStyle>(profile?.learningStyle || 'mixed');
  const [duration, setDuration] = React.useState('20 min');
  const [generating, setGenerating] = React.useState(false);

  const handleGenerate = () => {
    if (!topic.trim()) return;
    setGenerating(true);
    setTimeout(() => {
      router.push(`/lesson/custom?topic=${encodeURIComponent(topic)}&level=${level}&lang=${language}&style=${style}&duration=${encodeURIComponent(duration)}`);
    }, 1200);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <div className="mb-8 text-center animate-fade-in-up">
        <Badge variant="outline" className="mb-4">
          <Sparkles className="mr-1.5 h-3 w-3 text-primary" />
          Learn Anything
        </Badge>
        <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl text-balance">
          What do you want to learn?
        </h1>
        <p className="mt-3 text-muted-foreground max-w-xl mx-auto text-balance">
          Enter any topic and StudyGen will create a personalized lesson just for you
        </p>
      </div>

      <Card className="mb-6 animate-fade-in-up shadow-lg" style={{ animationDelay: '0.05s' }}>
        <CardContent className="p-6">
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., TCP/IP, Java inheritance, AWS EC2, SQL joins..."
              className="pl-12 h-14 text-base"
              onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
            />
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {/* Level */}
            <div className="space-y-2">
              <label className="flex items-center gap-1.5 text-sm font-medium">
                <GraduationCap className="h-4 w-4 text-primary" />
                Knowledge Level
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  { v: 'beginner', l: 'Beginner' },
                  { v: 'intermediate', l: 'Intermediate' },
                  { v: 'good', l: 'Good' },
                  { v: 'advanced', l: 'Advanced' },
                  { v: 'revision', l: 'Revision' },
                ].map((opt) => (
                  <button
                    key={opt.v}
                    onClick={() => setLevel(opt.v as KnowledgeLevel)}
                    className={cn(
                      'rounded-lg border px-3 py-1.5 text-xs font-medium transition-all',
                      level === opt.v ? 'border-primary bg-primary text-primary-foreground' : 'hover:bg-accent'
                    )}
                  >
                    {opt.l}
                  </button>
                ))}
              </div>
            </div>

            {/* Language */}
            <div className="space-y-2">
              <label className="flex items-center gap-1.5 text-sm font-medium">
                <Languages className="h-4 w-4 text-primary" />
                Language
              </label>
              <div className="flex gap-2">
                {[
                  { v: 'english', l: 'English' },
                  { v: 'tamil', l: 'Tamil' },
                ].map((opt) => (
                  <button
                    key={opt.v}
                    onClick={() => setLanguage(opt.v as Language)}
                    className={cn(
                      'rounded-lg border px-4 py-1.5 text-xs font-medium transition-all',
                      language === opt.v ? 'border-primary bg-primary text-primary-foreground' : 'hover:bg-accent'
                    )}
                  >
                    {opt.l}
                  </button>
                ))}
              </div>
            </div>

            {/* Style */}
            <div className="space-y-2">
              <label className="flex items-center gap-1.5 text-sm font-medium">
                <Lightbulb className="h-4 w-4 text-primary" />
                Learning Style
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  { v: 'simple', l: 'Simple' },
                  { v: 'examples', l: 'Examples' },
                  { v: 'visual', l: 'Visual' },
                  { v: 'code', l: 'Code' },
                  { v: 'practice', l: 'Practice' },
                  { v: 'mixed', l: 'Mixed' },
                ].map((opt) => (
                  <button
                    key={opt.v}
                    onClick={() => setStyle(opt.v as LearningStyle)}
                    className={cn(
                      'rounded-lg border px-3 py-1.5 text-xs font-medium transition-all',
                      style === opt.v ? 'border-primary bg-primary text-primary-foreground' : 'hover:bg-accent'
                    )}
                  >
                    {opt.l}
                  </button>
                ))}
              </div>
            </div>

            {/* Duration */}
            <div className="space-y-2">
              <label className="flex items-center gap-1.5 text-sm font-medium">
                <Clock className="h-4 w-4 text-primary" />
                Duration
              </label>
              <div className="flex flex-wrap gap-2">
                {['5 min', '10 min', '20 min', 'Deep dive'].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setDuration(opt)}
                    className={cn(
                      'rounded-lg border px-3 py-1.5 text-xs font-medium transition-all',
                      duration === opt ? 'border-primary bg-primary text-primary-foreground' : 'hover:bg-accent'
                    )}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <Button
            onClick={handleGenerate}
            disabled={!topic.trim() || generating}
            className="w-full mt-6 h-12 text-base group"
          >
            {generating ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent mr-2" />
                Building your personalized lesson...
              </>
            ) : (
              <>
                <Zap className="mr-2 h-4 w-4" />
                Generate My Lesson
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        <p className="text-sm font-medium text-muted-foreground mb-3">Popular topics:</p>
        <div className="flex flex-wrap gap-2">
          {suggestedTopics.map((t) => (
            <button
              key={t}
              onClick={() => setTopic(t)}
              className="rounded-full border bg-card px-3 py-1.5 text-xs font-medium transition-all hover:bg-accent hover:border-primary/30"
            >
              {t}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
