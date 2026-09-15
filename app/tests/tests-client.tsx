'use client';

import * as React from 'react';
import {
  ClipboardCheck, Clock, ChevronLeft, ChevronRight, Flag,
  CheckCircle2, XCircle, Target, TrendingUp, AlertCircle,
  Loader2, Sparkles, Trophy, RotateCcw, Lightbulb,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { demoQuizQuestions, demoQuizResults, demoWeakTopics } from '@/lib/demo-data';
import type { QuizQuestion, KnowledgeLevel } from '@/lib/types';
import { cn } from '@/lib/utils';

type Phase = 'create' | 'test' | 'results';

export default function TestsClient() {
  const [phase, setPhase] = React.useState<Phase>('create');
  const [topic, setTopic] = React.useState('Java OOP');
  const [difficulty, setDifficulty] = React.useState<KnowledgeLevel>('intermediate');
  const [numQuestions, setNumQuestions] = React.useState(5);
  const [questionTypes, setQuestionTypes] = React.useState<string[]>(['mcq', 'true_false', 'fill_blank']);
  const [generating, setGenerating] = React.useState(false);
  const [questions, setQuestions] = React.useState<QuizQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = React.useState(0);
  const [answers, setAnswers] = React.useState<Record<string, string>>({});
  const [markedForReview, setMarkedForReview] = React.useState<Set<string>>(new Set());
  const [timeLeft, setTimeLeft] = React.useState(0);

  React.useEffect(() => {
    if (phase !== 'test') return;
    const timer = setInterval(() => setTimeLeft((prev) => Math.max(0, prev - 1)), 1000);
    return () => clearInterval(timer);
  }, [phase]);

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      setQuestions(demoQuizQuestions.slice(0, numQuestions));
      setTimeLeft(numQuestions * 60);
      setPhase('test');
      setGenerating(false);
      setCurrentIdx(0);
      setAnswers({});
      setMarkedForReview(new Set());
    }, 1500);
  };

  const toggleType = (type: string) => {
    setQuestionTypes((prev) => prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]);
  };

  const toggleReview = (id: string) => {
    setMarkedForReview((prev) => { const next = new Set(prev); if (next.has(id)) next.delete(id); else next.add(id); return next; });
  };

  const handleSubmit = () => {
    setPhase('results');
  };

  const correctCount = questions.filter((q) => answers[q.id]?.trim().toLowerCase() === q.correctAnswer.trim().toLowerCase()).length;
  const score = questions.length > 0 ? Math.round((correctCount / questions.length) * 100) : 0;
  const accuracy = score;
  const timeTaken = numQuestions * 60 - timeLeft;
  const strongTopics = demoQuizResults.filter((r) => r.score >= 70);
  const weakTopics = demoQuizResults.filter((r) => r.score < 70);

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

  if (phase === 'create') {
    return (
      <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6">
        <div className="mb-6 animate-fade-in-up">
          <h1 className="font-display text-2xl font-bold tracking-tight">Mock Tests</h1>
          <p className="text-muted-foreground mt-1">Generate AI-powered tests and analyze your performance</p>
        </div>

        <Card className="animate-fade-in-up">
          <CardHeader><CardTitle className="text-lg">Create a Test</CardTitle><CardDescription>Configure your test settings</CardDescription></CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label>Topic</Label>
              <Input value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="e.g., Java OOP, Computer Networks" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Difficulty</Label>
                <div className="flex flex-wrap gap-2">
                  {['beginner', 'intermediate', 'advanced'].map((l) => (
                    <button key={l} onClick={() => setDifficulty(l as KnowledgeLevel)} className={cn('rounded-lg border px-3 py-1.5 text-xs font-medium capitalize transition-all', difficulty === l ? 'border-primary bg-primary text-primary-foreground' : 'hover:bg-accent')}>{l}</button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label>Number of Questions</Label>
                <div className="flex gap-2">
                  {[3, 5, 10, 15].map((n) => (
                    <button key={n} onClick={() => setNumQuestions(n)} className={cn('rounded-lg border px-4 py-1.5 text-xs font-medium transition-all', numQuestions === n ? 'border-primary bg-primary text-primary-foreground' : 'hover:bg-accent')}>{n}</button>
                  ))}
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Question Types</Label>
              <div className="flex flex-wrap gap-2">
                {[
                  { v: 'mcq', l: 'MCQ' }, { v: 'true_false', l: 'True/False' },
                  { v: 'fill_blank', l: 'Fill in the blank' }, { v: 'coding', l: 'Coding' },
                  { v: 'short_answer', l: 'Short answer' },
                ].map((t) => (
                  <button key={t.v} onClick={() => toggleType(t.v)} className={cn('rounded-lg border px-3 py-1.5 text-xs font-medium transition-all', questionTypes.includes(t.v) ? 'border-primary bg-primary text-primary-foreground' : 'hover:bg-accent')}>{t.l}</button>
                ))}
              </div>
            </div>
            <Button onClick={handleGenerate} disabled={!topic.trim() || questionTypes.length === 0 || generating} className="w-full h-12 gap-2">
              {generating ? <><Loader2 className="h-4 w-4 animate-spin" /> Generating questions...</> : <><Sparkles className="h-4 w-4" /> Generate Test</>}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (phase === 'test') {
    const q = questions[currentIdx];
    return (
      <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="gap-1.5"><Clock className="h-3 w-3" />{formatTime(timeLeft)}</Badge>
            <span className="text-sm text-muted-foreground">Question {currentIdx + 1} of {questions.length}</span>
          </div>
          <Button variant="destructive" size="sm" onClick={handleSubmit}>Submit Test</Button>
        </div>

        <Progress value={((currentIdx + 1) / questions.length) * 100} className="h-1.5 mb-6" />

        <Card className="mb-4">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Badge variant="outline" className="text-xs capitalize">{q.type.replace('_', ' ')}</Badge>
              <button onClick={() => toggleReview(q.id)} className={cn('flex items-center gap-1 text-xs', markedForReview.has(q.id) ? 'text-amber-500' : 'text-muted-foreground')}>
                <Flag className="h-3 w-3" /> {markedForReview.has(q.id) ? 'Marked' : 'Mark for review'}
              </button>
            </div>
            <p className="text-base font-semibold mb-4">{q.question}</p>

            {q.type === 'mcq' || q.type === 'true_false' ? (
              <div className="space-y-2">
                {q.options?.map((opt) => (
                  <button key={opt} onClick={() => setAnswers((prev) => ({ ...prev, [q.id]: opt }))} className={cn('flex w-full items-center gap-3 rounded-lg border p-3 text-left text-sm transition-all', answers[q.id] === opt ? 'border-primary bg-primary/5' : 'hover:bg-accent')}>
                    <div className={cn('flex h-5 w-5 items-center justify-center rounded-full border', answers[q.id] === opt ? 'border-primary bg-primary' : 'border-muted-foreground/30')}>
                      {answers[q.id] === opt && <div className="h-2 w-2 rounded-full bg-primary-foreground" />}
                    </div>
                    {opt}
                  </button>
                ))}
              </div>
            ) : q.type === 'fill_blank' ? (
              <Input value={answers[q.id] || ''} onChange={(e) => setAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))} placeholder="Type your answer..." />
            ) : (
              <Textarea value={answers[q.id] || ''} onChange={(e) => setAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))} placeholder="Write your answer..." className="min-h-32" />
            )}
          </CardContent>
        </Card>

        <div className="flex items-center justify-between">
          <Button variant="outline" size="sm" className="gap-1.5" disabled={currentIdx === 0} onClick={() => setCurrentIdx(currentIdx - 1)}>
            <ChevronLeft className="h-4 w-4" /> Previous
          </Button>
          <div className="flex gap-1">
            {questions.map((qq, i) => (
              <button key={qq.id} onClick={() => setCurrentIdx(i)} className={cn('h-7 w-7 rounded text-xs font-medium transition-all', i === currentIdx ? 'bg-primary text-primary-foreground' : markedForReview.has(qq.id) ? 'bg-amber-500/20 text-amber-600' : answers[qq.id] ? 'bg-green-500/20 text-green-600' : 'bg-muted text-muted-foreground')}>
                {i + 1}
              </button>
            ))}
          </div>
          <Button variant="outline" size="sm" className="gap-1.5" disabled={currentIdx === questions.length - 1} onClick={() => setCurrentIdx(currentIdx + 1)}>
            Next <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }

  // Results phase
  return (
    <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6">
      <div className="mb-6 text-center animate-fade-in-up">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10 mb-3">
          <Trophy className="h-8 w-8 text-green-500" />
        </div>
        <h1 className="font-display text-2xl font-bold tracking-tight">Test Complete!</h1>
        <p className="text-muted-foreground mt-1">Here is your detailed performance analysis</p>
      </div>

      {/* Score overview */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card><CardContent className="p-4 text-center">
          <p className="text-3xl font-bold">{score}%</p><p className="text-xs text-muted-foreground mt-1">Score</p>
        </CardContent></Card>
        <Card><CardContent className="p-4 text-center">
          <p className="text-3xl font-bold">{accuracy}%</p><p className="text-xs text-muted-foreground mt-1">Accuracy</p>
        </CardContent></Card>
        <Card><CardContent className="p-4 text-center">
          <p className="text-3xl font-bold">{formatTime(timeTaken)}</p><p className="text-xs text-muted-foreground mt-1">Time Taken</p>
        </CardContent></Card>
      </div>

      {/* Topic analysis */}
      <div className="grid gap-6 md:grid-cols-2 mb-6">
        <Card>
          <CardHeader><CardTitle className="text-sm flex items-center gap-2"><TrendingUp className="h-4 w-4 text-green-500" /> Strong Topics</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {strongTopics.map((t) => (
              <div key={t.topic} className="flex items-center justify-between text-sm">
                <span>{t.topic}</span>
                <Badge variant="outline" className="text-green-500 border-green-500/30">{t.score}%</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-sm flex items-center gap-2"><AlertCircle className="h-4 w-4 text-destructive" /> Weak Topics</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {weakTopics.map((t) => (
              <div key={t.topic} className="flex items-center justify-between text-sm">
                <span>{t.topic}</span>
                <Badge variant="outline" className="text-destructive border-destructive/30">{t.score}%</Badge>
              </div>
            ))}
            <div className="rounded-lg bg-amber-500/10 p-3 mt-2">
              <p className="text-xs text-amber-600 flex items-start gap-1.5">
                <Lightbulb className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                You are close. Let&apos;s strengthen {weakTopics[0]?.topic || 'weak areas'} before moving forward.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Question by question */}
      <Card className="mb-6">
        <CardHeader><CardTitle className="text-base">Question Review</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {questions.map((q, i) => {
            const userAnswer = answers[q.id] || 'Not answered';
            const isCorrect = userAnswer.trim().toLowerCase() === q.correctAnswer.trim().toLowerCase();
            return (
              <div key={q.id} className="rounded-lg border p-4">
                <div className="flex items-start gap-2 mb-2">
                  {isCorrect ? <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" /> : <XCircle className="h-4 w-4 text-destructive mt-0.5 shrink-0" />}
                  <p className="text-sm font-medium flex-1">{i + 1}. {q.question}</p>
                </div>
                <div className="ml-6 space-y-1 text-xs">
                  <p className="text-muted-foreground">Your answer: <span className={isCorrect ? 'text-green-500 font-medium' : 'text-destructive font-medium'}>{userAnswer}</span></p>
                  {!isCorrect && <p className="text-muted-foreground">Correct answer: <span className="text-green-500 font-medium">{q.correctAnswer}</span></p>}
                  <p className="text-muted-foreground mt-1 italic">{q.explanation}</p>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      <div className="flex justify-center gap-3">
        <Button variant="outline" className="gap-2" onClick={() => setPhase('create')}><RotateCcw className="h-4 w-4" /> New Test</Button>
        <Button className="gap-2"><Target className="h-4 w-4" /> Review Weak Topics</Button>
      </div>
    </div>
  );
}
