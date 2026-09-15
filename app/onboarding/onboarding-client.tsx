'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
  Search, GraduationCap, Target, BookOpen, Languages,
  Lightbulb, Clock, ArrowRight, ArrowLeft, Check, User,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Logo } from '@/components/logo';
import { ThemeToggle } from '@/components/theme-toggle';
import { useAuth } from '@/lib/auth-context';
import { suggestedTopics } from '@/lib/demo-data';
import type { KnowledgeLevel, Language, LearningStyle, LearningGoal, StudyTime } from '@/lib/types';
import { cn } from '@/lib/utils';

const TOTAL_STEPS = 7;

export default function OnboardingClient() {
  const router = useRouter();
  const { profile, updateProfile } = useAuth();
  const [step, setStep] = React.useState(0);
  const [name, setName] = React.useState(profile?.name || '');
  const [topic, setTopic] = React.useState('');
  const [goal, setGoal] = React.useState<LearningGoal | ''>('');
  const [level, setLevel] = React.useState<KnowledgeLevel | ''>('');
  const [language, setLanguage] = React.useState<Language | ''>('');
  const [style, setStyle] = React.useState<LearningStyle | ''>('');
  const [studyTime, setStudyTime] = React.useState<StudyTime | ''>('');

  const canProceed = () => {
    switch (step) {
      case 0: return name.trim().length > 0;
      case 1: return topic.trim().length > 0;
      case 2: return goal !== '';
      case 3: return level !== '';
      case 4: return language !== '';
      case 5: return style !== '';
      case 6: return studyTime !== '';
      default: return false;
    }
  };

  const handleNext = () => {
    if (step < TOTAL_STEPS - 1) {
      setStep(step + 1);
    } else {
      updateProfile({
        name,
        topic,
        learningGoal: goal as LearningGoal,
        knowledgeLevel: level as KnowledgeLevel,
        preferredLanguage: language as Language,
        learningStyle: style as LearningStyle,
        studyTime: studyTime as StudyTime,
        onboardingCompleted: true,
      });
      router.push('/dashboard');
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden py-8">
      <div className="absolute inset-0 bg-grid opacity-[0.1] dark:opacity-[0.05]" />
      <div className="absolute inset-0">
        <div className="absolute left-1/4 top-1/4 h-72 w-72 rounded-full bg-indigo-500/15 blur-[120px] animate-pulse-slow" />
        <div className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-violet-500/10 blur-[140px] animate-pulse-slow" style={{ animationDelay: '1s' }} />
      </div>
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="relative z-10 w-full max-w-2xl px-4">
        <div className="mb-8 flex flex-col items-center gap-3">
          <Logo size="lg" />
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            Let's personalize your learning experience
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground">Step {step + 1} of {TOTAL_STEPS}</span>
            <span className="text-xs font-medium">{Math.round(((step + 1) / TOTAL_STEPS) * 100)}% complete</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-500"
              style={{ width: `${((step + 1) / TOTAL_STEPS) * 100}%` }}
            />
          </div>
        </div>

        <Card className="shadow-xl border-border/50 min-h-[320px]">
          <CardContent className="p-8">
            {/* Step 1: Name */}
            {step === 0 && (
              <div className="animate-fade-in-up space-y-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="font-display text-xl font-bold">What should we call you?</h2>
                    <p className="text-sm text-muted-foreground">We'll use your name to personalize your experience</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="h-12 text-base"
                    autoFocus
                    onKeyDown={(e) => e.key === 'Enter' && canProceed() && handleNext()}
                  />
                </div>
              </div>
            )}

            {/* Step 2: Topic */}
            {step === 1 && (
              <div className="animate-fade-in-up space-y-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <Search className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="font-display text-xl font-bold">What do you want to learn?</h2>
                    <p className="text-sm text-muted-foreground">Choose a suggested topic or enter your own</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      placeholder="e.g., Java, Python, DSA, Cloud Computing..."
                      className="pl-9 h-12 text-base"
                      autoFocus
                    />
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {suggestedTopics.map((t) => (
                    <button
                      key={t}
                      onClick={() => setTopic(t)}
                      className={cn(
                        'rounded-full border px-3 py-1.5 text-sm transition-all',
                        topic === t
                          ? 'border-primary bg-primary text-primary-foreground'
                          : 'hover:bg-accent hover:border-primary/30'
                      )}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Goal */}
            {step === 2 && (
              <div className="animate-fade-in-up space-y-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="font-display text-xl font-bold">Why are you learning?</h2>
                    <p className="text-sm text-muted-foreground">This helps us tailor your content</p>
                  </div>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    { value: 'college', label: 'College/University', icon: GraduationCap },
                    { value: 'placement', label: 'Placement Preparation', icon: Target },
                    { value: 'interview', label: 'Interview Preparation', icon: BookOpen },
                    { value: 'career_change', label: 'Career Change', icon: Sparkles },
                    { value: 'personal', label: 'Personal Learning', icon: Lightbulb },
                    { value: 'certification', label: 'Certification', icon: Check },
                    { value: 'other', label: 'Other', icon: ArrowRight },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setGoal(opt.value as LearningGoal)}
                      className={cn(
                        'flex items-center gap-3 rounded-xl border p-4 text-left transition-all',
                        goal === opt.value
                          ? 'border-primary bg-primary/5 shadow-sm'
                          : 'hover:bg-accent hover:border-primary/30'
                      )}
                    >
                      <opt.icon className={cn('h-5 w-5', goal === opt.value ? 'text-primary' : 'text-muted-foreground')} />
                      <span className="text-sm font-medium">{opt.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Level */}
            {step === 3 && (
              <div className="animate-fade-in-up space-y-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="font-display text-xl font-bold">Your current knowledge level?</h2>
                    <p className="text-sm text-muted-foreground">We'll adapt content to your level</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {[
                    { value: 'beginner', label: 'Beginner', desc: 'I\u2019m new to this topic' },
                    { value: 'intermediate', label: 'Intermediate', desc: 'I know the basics' },
                    { value: 'good', label: 'Good', desc: 'I can work with this comfortably' },
                    { value: 'advanced', label: 'Advanced', desc: 'I want deep technical content' },
                    { value: 'revision', label: 'I only want revision', desc: 'Quick refresher only' },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setLevel(opt.value as KnowledgeLevel)}
                      className={cn(
                        'flex w-full items-center justify-between rounded-xl border p-4 text-left transition-all',
                        level === opt.value
                          ? 'border-primary bg-primary/5 shadow-sm'
                          : 'hover:bg-accent hover:border-primary/30'
                      )}
                    >
                      <div>
                        <p className="text-sm font-semibold">{opt.label}</p>
                        <p className="text-xs text-muted-foreground">{opt.desc}</p>
                      </div>
                      {level === opt.value && <Check className="h-5 w-5 text-primary" />}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 5: Language */}
            {step === 4 && (
              <div className="animate-fade-in-up space-y-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <Languages className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="font-display text-xl font-bold">Preferred language?</h2>
                    <p className="text-sm text-muted-foreground">For lessons and explanations</p>
                  </div>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    { value: 'english', label: 'English', desc: 'Learn in English' },
                    { value: 'tamil', label: 'Tamil', desc: 'Learn in Tamil' },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setLanguage(opt.value as Language)}
                      className={cn(
                        'flex items-center gap-3 rounded-xl border p-6 text-left transition-all',
                        language === opt.value
                          ? 'border-primary bg-primary/5 shadow-sm'
                          : 'hover:bg-accent hover:border-primary/30'
                      )}
                    >
                      <Languages className={cn('h-6 w-6', language === opt.value ? 'text-primary' : 'text-muted-foreground')} />
                      <div>
                        <p className="text-base font-semibold">{opt.label}</p>
                        <p className="text-xs text-muted-foreground">{opt.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 6: Style */}
            {step === 5 && (
              <div className="animate-fade-in-up space-y-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <Lightbulb className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="font-display text-xl font-bold">Preferred learning style?</h2>
                    <p className="text-sm text-muted-foreground">How do you learn best?</p>
                  </div>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    { value: 'simple', label: 'Simple explanations', desc: 'Clear and easy to follow' },
                    { value: 'examples', label: 'Real-world examples', desc: 'Learn through examples' },
                    { value: 'visual', label: 'Visual explanations', desc: 'Diagrams and visuals' },
                    { value: 'code', label: 'Code examples', desc: 'Hands-on code first' },
                    { value: 'practice', label: 'Practice-first', desc: 'Learn by doing' },
                    { value: 'mixed', label: 'Mixed', desc: 'A blend of everything' },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setStyle(opt.value as LearningStyle)}
                      className={cn(
                        'flex flex-col gap-1 rounded-xl border p-4 text-left transition-all',
                        style === opt.value
                          ? 'border-primary bg-primary/5 shadow-sm'
                          : 'hover:bg-accent hover:border-primary/30'
                      )}
                    >
                      <p className="text-sm font-semibold">{opt.label}</p>
                      <p className="text-xs text-muted-foreground">{opt.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 7: Study time */}
            {step === 6 && (
              <div className="animate-fade-in-up space-y-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="font-display text-xl font-bold">Available study time?</h2>
                    <p className="text-sm text-muted-foreground">We'll plan lessons around your schedule</p>
                  </div>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    { value: '15min', label: '15 min/day', desc: 'Quick daily sessions' },
                    { value: '30min', label: '30 min/day', desc: 'Balanced learning' },
                    { value: '1hour', label: '1 hour/day', desc: 'Dedicated study' },
                    { value: '2hours', label: '2+ hours/day', desc: 'Intensive learning' },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setStudyTime(opt.value as StudyTime)}
                      className={cn(
                        'flex items-center gap-3 rounded-xl border p-6 text-left transition-all',
                        studyTime === opt.value
                          ? 'border-primary bg-primary/5 shadow-sm'
                          : 'hover:bg-accent hover:border-primary/30'
                      )}
                    >
                      <Clock className={cn('h-6 w-6', studyTime === opt.value ? 'text-primary' : 'text-muted-foreground')} />
                      <div>
                        <p className="text-base font-semibold">{opt.label}</p>
                        <p className="text-xs text-muted-foreground">{opt.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="mt-6 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={handleBack}
            disabled={step === 0}
            className="gap-1.5"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            className="gap-1.5"
          >
            {step === TOTAL_STEPS - 1 ? 'Generate My Dashboard' : 'Continue'}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
