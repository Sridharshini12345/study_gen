'use client';

import * as React from 'react';
import Link from 'next/link';
import { BookOpen, Clock, CheckCircle2, PlayCircle, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { demoRecentLessons } from '@/lib/demo-data';
import { cn } from '@/lib/utils';

export default function MyLearningClient() {
  const topics = ['All', ...Array.from(new Set(demoRecentLessons.map((l) => l.topic)))];
  const [filter, setFilter] = React.useState('All');
  const filtered = filter === 'All' ? demoRecentLessons : demoRecentLessons.filter((l) => l.topic === filter);
  const completed = demoRecentLessons.filter((l) => l.progress === 100);
  const inProgress = demoRecentLessons.filter((l) => l.progress > 0 && l.progress < 100);

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
      <div className="mb-6 animate-fade-in-up">
        <h1 className="font-display text-2xl font-bold tracking-tight">My Learning</h1>
        <p className="text-muted-foreground mt-1">Track your lessons and continue where you left off</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card><CardContent className="p-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-500"><BookOpen className="h-5 w-5" /></div>
          <div><p className="text-2xl font-bold">{demoRecentLessons.length}</p><p className="text-xs text-muted-foreground">Total Lessons</p></div>
        </CardContent></Card>
        <Card><CardContent className="p-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10 text-green-500"><CheckCircle2 className="h-5 w-5" /></div>
          <div><p className="text-2xl font-bold">{completed.length}</p><p className="text-xs text-muted-foreground">Completed</p></div>
        </CardContent></Card>
        <Card><CardContent className="p-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500"><PlayCircle className="h-5 w-5" /></div>
          <div><p className="text-2xl font-bold">{inProgress.length}</p><p className="text-xs text-muted-foreground">In Progress</p></div>
        </CardContent></Card>
      </div>

      <Tabs defaultValue="all" className="animate-fade-in-up">
        <TabsList>
          <TabsTrigger value="all">All Lessons</TabsTrigger>
          <TabsTrigger value="progress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="flex flex-wrap gap-2 mb-4">
            {topics.map((t) => (
              <button key={t} onClick={() => setFilter(t)} className={cn('rounded-full border px-3 py-1.5 text-xs font-medium transition-all', filter === t ? 'border-primary bg-primary text-primary-foreground' : 'hover:bg-accent')}>{t}</button>
            ))}
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {filtered.map((lesson) => (
              <Link key={lesson.id} href={`/dashboard/lesson/${lesson.id}`}>
                <Card className="group cursor-pointer transition-all hover:shadow-lg hover:-translate-y-0.5 duration-300">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                        <BookOpen className="h-5 w-5 text-primary" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-sm leading-snug">{lesson.title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">{lesson.topic}</Badge>
                          <Badge variant="secondary" className="text-xs">{lesson.level}</Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{lesson.estimatedTime} min</span>
                      <span className="text-xs text-muted-foreground ml-auto">{lesson.progress}%</span>
                    </div>
                    <Progress value={lesson.progress} className="h-1.5" />
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="progress" className="space-y-4">
          {inProgress.length === 0 ? (
            <EmptyState message="No lessons in progress. Start learning a new topic!" />
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {inProgress.map((lesson) => (
                <Link key={lesson.id} href={`/dashboard/lesson/${lesson.id}`}>
                  <Card className="group cursor-pointer transition-all hover:shadow-lg hover:-translate-y-0.5 duration-300">
                    <CardContent className="p-5">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-500/10">
                          <PlayCircle className="h-5 w-5 text-amber-500" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-semibold text-sm leading-snug">{lesson.title}</h3>
                          <p className="text-xs text-muted-foreground mt-1">{lesson.topic}</p>
                        </div>
                      </div>
                      <Progress value={lesson.progress} className="h-1.5 mb-2" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{lesson.progress}% complete</span>
                        <span>{lesson.estimatedTime} min</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {completed.length === 0 ? (
            <EmptyState message="No completed lessons yet. Keep learning!" />
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {completed.map((lesson) => (
                <Link key={lesson.id} href={`/dashboard/lesson/${lesson.id}`}>
                  <Card className="group cursor-pointer transition-all hover:shadow-lg duration-300">
                    <CardContent className="p-5">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-500/10">
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-semibold text-sm leading-snug">{lesson.title}</h3>
                          <p className="text-xs text-muted-foreground mt-1">{lesson.topic}</p>
                        </div>
                        <Badge variant="outline" className="text-xs text-green-500 border-green-500/30">Completed</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <BookOpen className="h-12 w-12 text-muted-foreground/30 mb-3" />
      <p className="text-sm text-muted-foreground">{message}</p>
      <Button asChild className="mt-4" size="sm"><Link href="/dashboard/learn">Learn Something New</Link></Button>
    </div>
  );
}
