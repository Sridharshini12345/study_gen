'use client';

import * as React from 'react';
import {
  TrendingUp, Target, Clock, Flame, BookOpen, ClipboardCheck,
  Layers, RefreshCw, AlertCircle, CheckCircle2, Award,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { demoStats, demoWeeklyActivity, demoProgressData, demoQuizResults, demoWeakTopics } from '@/lib/demo-data';
import { cn } from '@/lib/utils';

export default function AnalyticsClient() {
  const strongTopics = demoQuizResults.filter((r) => r.score >= 70);
  const maxMinutes = Math.max(...demoWeeklyActivity.map((d) => d.minutes));

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
      <div className="mb-6 animate-fade-in-up">
        <h1 className="font-display text-2xl font-bold tracking-tight">Progress Analytics</h1>
        <p className="text-muted-foreground mt-1">Track your learning journey and identify areas to improve</p>
      </div>

      {/* Overview stats */}
      <div className="grid grid-cols-2 gap-4 mb-6 sm:grid-cols-4">
        <StatCard icon={TrendingUp} label="Overall Progress" value={`${demoStats.masteryPercentage}%`} color="text-green-500" />
        <StatCard icon={Flame} label="Study Streak" value={`${demoStats.learningStreak} days`} color="text-orange-500" />
        <StatCard icon={Clock} label="Time Spent" value={`${Math.floor(demoStats.timeSpent / 60)}h ${demoStats.timeSpent % 60}m`} color="text-blue-500" />
        <StatCard icon={RefreshCw} label="Revision Done" value={`${demoStats.revisionCompleted}`} color="text-violet-500" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2 mb-6">
        {/* Topic mastery */}
        <Card className="animate-fade-in-up">
          <CardHeader><CardTitle className="text-lg">Topic Mastery</CardTitle><CardDescription>Your mastery level across all topics</CardDescription></CardHeader>
          <CardContent className="space-y-4">
            {demoProgressData.map((item) => (
              <div key={item.topic} className="space-y-1.5">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{item.topic}</span>
                  <span className={cn('text-xs font-semibold', item.mastery >= 70 ? 'text-green-500' : item.mastery >= 50 ? 'text-amber-500' : 'text-destructive')}>{item.mastery}%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                  <div className={cn('h-full rounded-full transition-all duration-1000', item.mastery >= 70 ? 'bg-green-500' : item.mastery >= 50 ? 'bg-amber-500' : 'bg-destructive')} style={{ width: `${item.mastery}%` }} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Weekly activity chart */}
        <Card className="animate-fade-in-up">
          <CardHeader><CardTitle className="text-lg">Weekly Activity</CardTitle><CardDescription>Minutes studied per day</CardDescription></CardHeader>
          <CardContent>
            <div className="flex items-end justify-between gap-3 h-40">
              {demoWeeklyActivity.map((day, i) => {
                const height = (day.minutes / maxMinutes) * 100;
                return (
                  <div key={i} className="flex flex-1 flex-col items-center gap-2">
                    <span className="text-xs font-semibold">{day.minutes}</span>
                    <div className="flex w-full flex-1 items-end">
                      <div className="w-full rounded-t-md bg-gradient-to-t from-indigo-500 to-violet-500 transition-all duration-1000" style={{ height: `${height}%` }} title={`${day.minutes} min`} />
                    </div>
                    <span className="text-xs text-muted-foreground">{day.day}</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2 mb-6">
        {/* Quiz performance */}
        <Card className="animate-fade-in-up">
          <CardHeader><CardTitle className="text-lg">Quiz Performance</CardTitle><CardDescription>Latest test results by topic</CardDescription></CardHeader>
          <CardContent className="space-y-3">
            {demoQuizResults.map((result) => (
              <div key={result.topic} className="flex items-center gap-3">
                <span className="text-sm font-medium w-32 truncate">{result.topic}</span>
                <div className="flex-1 h-2 overflow-hidden rounded-full bg-secondary">
                  <div className={cn('h-full rounded-full', result.score >= 70 ? 'bg-green-500' : result.score >= 50 ? 'bg-amber-500' : 'bg-destructive')} style={{ width: `${result.score}%` }} />
                </div>
                <span className={cn('text-xs font-semibold w-10 text-right', result.score >= 70 ? 'text-green-500' : result.score >= 50 ? 'text-amber-500' : 'text-destructive')}>{result.score}%</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Strong vs Weak */}
        <div className="space-y-4">
          <Card className="animate-fade-in-up">
            <CardHeader><CardTitle className="text-sm flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /> Strong Topics</CardTitle></CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {strongTopics.map((t) => <Badge key={t.topic} variant="outline" className="text-green-500 border-green-500/30">{t.topic} ({t.score}%)</Badge>)}
              </div>
            </CardContent>
          </Card>
          <Card className="animate-fade-in-up">
            <CardHeader><CardTitle className="text-sm flex items-center gap-2"><AlertCircle className="h-4 w-4 text-destructive" /> Weak Topics</CardTitle></CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {demoWeakTopics.map((t) => <Badge key={t.topic} variant="outline" className="text-destructive border-destructive/30">{t.topic} ({t.score}%)</Badge>)}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Achievement summary */}
      <Card className="animate-fade-in-up">
        <CardHeader><CardTitle className="text-lg flex items-center gap-2"><Award className="h-5 w-5 text-primary" /> Achievements</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <Achievement icon={BookOpen} label="Lessons" value={demoStats.topicsLearned} />
            <Achievement icon={ClipboardCheck} label="Tests" value={demoStats.testsCompleted} />
            <Achievement icon={Layers} label="Flashcards" value={demoStats.flashcardsReviewed} />
            <Achievement icon={Target} label="Avg Score" value={`${demoStats.averageScore}%`} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string; color: string }) {
  return (
    <Card className="transition-all hover:shadow-md duration-300">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className={cn('flex h-10 w-10 items-center justify-center rounded-lg bg-muted', color)}><Icon className="h-5 w-5" /></div>
          <div><p className="text-xl font-bold leading-none">{value}</p><p className="text-xs text-muted-foreground mt-1">{label}</p></div>
        </div>
      </CardContent>
    </Card>
  );
}

function Achievement({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string | number }) {
  return (
    <div className="flex flex-col items-center text-center rounded-lg border p-4">
      <Icon className="h-6 w-6 text-primary mb-2" />
      <p className="text-xl font-bold">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}
