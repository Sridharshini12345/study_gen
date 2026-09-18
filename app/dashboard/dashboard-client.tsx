'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  ArrowRight, BookOpen, Upload, MessageSquare, ClipboardCheck,
  RefreshCw, Layers, PlayCircle, AlertCircle, TrendingUp,
  Clock, Target, Flame, Trophy, ChevronRight, Lightbulb, Brain,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/lib/auth-context';
import {
  demoStats, demoRecentLessons, demoWeakTopics, demoRecommendations,
  demoWeeklyActivity, demoProgressData, demoRevisionItems,
} from '@/lib/demo-data';
import { cn } from '@/lib/utils';

export default function DashboardClient() {
  const { profile } = useAuth();
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  const quickActions = [
    { icon: Brain, label: 'Learn New Topic', href: '/dashboard/learn', color: 'bg-indigo-500/10 text-indigo-500' },
    { icon: Upload, label: 'Upload PDF', href: '/dashboard/documents', color: 'bg-violet-500/10 text-violet-500' },
    { icon: MessageSquare, label: 'Ask AI Tutor', href: '/dashboard/tutor', color: 'bg-cyan-500/10 text-cyan-500' },
    { icon: ClipboardCheck, label: 'Take Mock Test', href: '/dashboard/tests', color: 'bg-blue-500/10 text-blue-500' },
    { icon: RefreshCw, label: 'Review Weak Topics', href: '/dashboard/revision', color: 'bg-amber-500/10 text-amber-500' },
    { icon: Layers, label: 'Create Flashcards', href: '/dashboard/flashcards', color: 'bg-green-500/10 text-green-500' },
  ];

  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    AlertCircle, Layers, PlayCircle,
  };

  const currentLesson = demoRecentLessons[0];
  const dueRevisions = demoRevisionItems.filter(r => r.status === 'due');

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:py-8">
      <div className="mb-8 animate-fade-in-up">
        <h1 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
          {greeting}, {profile?.name || 'Learner'}
        </h1>
        <p className="mt-1 text-muted-foreground">Let&apos;s continue where you left off.</p>
      </div>

      <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 animate-fade-in-up" style={{ animationDelay: '0.05s' }}>
        <StatCard icon={BookOpen} label="Topics Learned" value={demoStats.topicsLearned} color="text-indigo-500" />
        <StatCard icon={ClipboardCheck} label="Tests Completed" value={demoStats.testsCompleted} color="text-cyan-500" />
        <StatCard icon={Target} label="Avg Score" value={`${demoStats.averageScore}%`} color="text-violet-500" />
        <StatCard icon={Flame} label="Streak" value={`${demoStats.learningStreak} days`} color="text-orange-500" />
        <StatCard icon={TrendingUp} label="Mastery" value={`${demoStats.masteryPercentage}%`} color="text-green-500" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card className="overflow-hidden animate-fade-in-up">
            <CardHeader className="bg-gradient-to-r from-indigo-500/10 to-violet-500/10">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Today&apos;s Learning</CardTitle>
                  <CardDescription>Continue where you left off</CardDescription>
                </div>
                <Badge variant="secondary">
                  <Clock className="mr-1 h-3 w-3" />
                  {currentLesson.estimatedTime} min
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{currentLesson.title}</h3>
                    <p className="text-sm text-muted-foreground">{currentLesson.topic} • {currentLesson.level}</p>
                  </div>
                </div>
                <Button asChild size="sm" className="shrink-0">
                  <Link href={`/dashboard/lesson/${currentLesson.id}`}>
                    Continue
                    <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                  </Link>
                </Button>
              </div>
              <div className="mt-4 space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-semibold">{currentLesson.progress}%</span>
                </div>
                <Progress value={currentLesson.progress} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card className="animate-fade-in-up">
            <CardHeader>
              <CardTitle className="text-lg">Learning Progress</CardTitle>
              <CardDescription>Your mastery across topics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {demoProgressData.map((item, i) => (
                  <div key={i} className="space-y-1.5">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{item.topic}</span>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span>{item.lessonsCompleted} lessons</span>
                        <span>{item.testsTaken} tests</span>
                        <span className={cn('font-semibold', item.mastery >= 70 ? 'text-green-500' : item.mastery >= 50 ? 'text-amber-500' : 'text-destructive')}>
                          {item.mastery}%
                        </span>
                      </div>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                      <div
                        className={cn(
                          'h-full rounded-full transition-all duration-1000',
                          item.mastery >= 70 ? 'bg-green-500' : item.mastery >= 50 ? 'bg-amber-500' : 'bg-destructive'
                        )}
                        style={{ width: `${item.mastery}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="animate-fade-in-up">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold">Continue Learning</h2>
              <Link href="/dashboard/my-learning" className="text-sm text-primary hover:underline">
                View all
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {demoRecentLessons.slice(1).map((lesson) => (
                <Card key={lesson.id} className="group cursor-pointer transition-all hover:shadow-md hover:-translate-y-0.5 duration-300">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <BookOpen className="h-5 w-5 text-primary" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="truncate text-sm font-semibold">{lesson.title}</h3>
                        <p className="text-xs text-muted-foreground">{lesson.topic}</p>
                        <div className="mt-2 flex items-center gap-2">
                          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-secondary">
                            <div
                              className={cn(
                                'h-full rounded-full',
                                lesson.progress === 100 ? 'bg-green-500' : 'bg-primary'
                              )}
                              style={{ width: `${lesson.progress}%` }}
                            />
                          </div>
                          <span className="text-xs text-muted-foreground">{lesson.progress}%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Card className="animate-fade-in-up">
            <CardHeader>
              <CardTitle className="text-lg">Weekly Activity</CardTitle>
              <CardDescription>Minutes studied per day</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between gap-2 h-32">
                {demoWeeklyActivity.map((day, i) => {
                  const max = Math.max(...demoWeeklyActivity.map(d => d.minutes));
                  const height = (day.minutes / max) * 100;
                  return (
                    <div key={i} className="flex flex-1 flex-col items-center gap-2">
                      <div className="flex w-full flex-1 items-end">
                        <div
                          className="w-full rounded-t-md bg-gradient-to-t from-indigo-500 to-violet-500 transition-all duration-1000 hover:from-indigo-600 hover:to-violet-600"
                          style={{ height: `${height}%` }}
                          title={`${day.minutes} min`}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">{day.day}</span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-amber-500" />
                <CardTitle className="text-base">Recommended For You</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {demoRecommendations.map((rec, i) => {
                const Icon = iconMap[rec.icon] || AlertCircle;
                return (
                  <div key={i} className="rounded-lg border p-3 transition-colors hover:bg-accent/50">
                    <div className="flex items-start gap-2.5">
                      <div className={cn(
                        'flex h-7 w-7 shrink-0 items-center justify-center rounded-lg',
                        rec.priority === 'high' ? 'bg-destructive/10' : rec.priority === 'medium' ? 'bg-amber-500/10' : 'bg-primary/10'
                      )}>
                        <Icon className={cn(
                          'h-3.5 w-3.5',
                          rec.priority === 'high' ? 'text-destructive' : rec.priority === 'medium' ? 'text-amber-500' : 'text-primary'
                        )} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold">{rec.title}</p>
                        <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">{rec.reason}</p>
                        <Button size="sm" variant="ghost" className="mt-2 h-7 px-2 text-xs" asChild>
                          <Link href={rec.href}>
                            {rec.action}
                            <ChevronRight className="ml-0.5 h-3 w-3" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          <Card className="animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
            <CardHeader>
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-destructive" />
                <CardTitle className="text-base">Weak Topics</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {demoWeakTopics.map((wt) => (
                <div key={wt.id} className="space-y-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{wt.topic}</span>
                    <span className="text-xs font-semibold text-destructive">{wt.score}%</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
                    <div className="h-full rounded-full bg-destructive" style={{ width: `${wt.score}%` }} />
                  </div>
                  <p className="text-xs text-muted-foreground">{wt.recommendedAction}</p>
                </div>
              ))}
              <Button variant="outline" size="sm" className="w-full" asChild>
                <Link href="/dashboard/revision">Review All</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <CardHeader>
              <div className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4 text-primary" />
                <CardTitle className="text-base">Upcoming Revision</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              {dueRevisions.map((rev) => (
                <div key={rev.id} className="flex items-center gap-3 rounded-lg border p-2.5 transition-colors hover:bg-accent/50">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-500/10">
                    <RefreshCw className="h-3.5 w-3.5 text-amber-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-sm font-medium">{rev.topic}</p>
                    <p className="text-xs text-muted-foreground">Due now</p>
                  </div>
                  <Badge variant="outline" className="text-xs">Due</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-8 animate-fade-in-up" style={{ animationDelay: '0.25s' }}>
        <h2 className="mb-3 font-display text-lg font-semibold">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {quickActions.map((action, i) => (
            <Link key={i} href={action.href}>
              <Card className="group cursor-pointer transition-all hover:shadow-md hover:-translate-y-0.5 duration-300">
                <CardContent className="flex flex-col items-center gap-2 p-4 text-center">
                  <div className={cn('flex h-10 w-10 items-center justify-center rounded-xl transition-transform group-hover:scale-110', action.color)}>
                    <action.icon className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-medium">{action.label}</span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color }: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string | number;
  color: string;
}) {
  return (
    <Card className="transition-all hover:shadow-md duration-300">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className={cn('flex h-9 w-9 items-center justify-center rounded-lg bg-muted', color)}>
            <Icon className="h-4 w-4" />
          </div>
          <div>
            <p className="text-lg font-bold leading-none">{value}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">{label}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
