'use client';

import * as React from 'react';
import {
  Code2, Coffee, BarChart3, BrainCircuit, Cloud, GitBranch,
  ShieldCheck, FileCode2, CheckCircle2, Briefcase, Search,
  ArrowRight, Sparkles, Target, TrendingUp,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { demoCareerPaths } from '@/lib/demo-data';
import type { CareerPath } from '@/lib/types';
import { cn } from '@/lib/utils';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Code2, Coffee, BarChart3, BrainCircuit, Cloud, GitBranch, ShieldCheck, FileCode2, CheckCircle2, Briefcase,
};

export default function CareerClient() {
  const [selected, setSelected] = React.useState<CareerPath | null>(null);
  const [customRole, setCustomRole] = React.useState('');

  const handleSelect = (career: CareerPath) => {
    setSelected(career);
  };

  const handleCustom = () => {
    if (!customRole.trim()) return;
    setSelected({
      id: 'custom',
      title: customRole,
      description: 'Your custom career path',
      icon: 'Briefcase',
      stages: [],
    });
  };

  if (selected) {
    const Icon = iconMap[selected.icon] || Briefcase;
    const totalSkills = selected.stages.reduce((acc, s) => acc + s.skills.length, 0);
    const avgProgress = totalSkills > 0
      ? Math.round(selected.stages.reduce((acc, s) => acc + s.skills.reduce((a, sk) => a + sk.progress, 0), 0) / totalSkills)
      : 0;

    return (
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
        <Button variant="ghost" size="sm" className="mb-4 gap-1.5" onClick={() => setSelected(null)}>
          <Search className="h-4 w-4" /> Browse All Careers
        </Button>

        <div className="mb-6 animate-fade-in-up">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <Icon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold tracking-tight">{selected.title}</h1>
              <p className="text-sm text-muted-foreground">{selected.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="flex justify-between text-xs mb-1"><span className="text-muted-foreground">Overall Progress</span><span className="font-semibold">{avgProgress}%</span></div>
              <Progress value={avgProgress} className="h-2" />
            </div>
            <Badge variant="secondary">{totalSkills} skills</Badge>
          </div>
        </div>

        {selected.stages.length === 0 ? (
          <Card><CardContent className="p-8 text-center">
            <Sparkles className="mx-auto h-10 w-10 text-primary/30 mb-3" />
            <p className="text-sm text-muted-foreground">Generate a personalized roadmap for {selected.title} using AI.</p>
            <Button className="mt-4 gap-2"><Sparkles className="h-4 w-4" /> Generate Roadmap</Button>
          </CardContent></Card>
        ) : (
          <div className="space-y-6">
            {selected.stages.map((stage, si) => (
              <div key={stage.id} className="animate-fade-in-up" style={{ animationDelay: `${si * 0.05}s` }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">{si + 1}</div>
                  <div>
                    <h2 className="font-semibold">{stage.name}</h2>
                    <Badge variant="outline" className="text-xs capitalize">{stage.level}</Badge>
                  </div>
                </div>
                <div className="ml-11 space-y-2">
                  {stage.skills.map((skill) => (
                    <Card key={skill.id} className="transition-all hover:shadow-md">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">{skill.name}</span>
                            <Badge variant="outline" className="text-xs capitalize">{skill.level}</Badge>
                          </div>
                          <span className={cn('text-xs font-semibold', skill.progress >= 70 ? 'text-green-500' : skill.progress >= 40 ? 'text-amber-500' : 'text-muted-foreground')}>{skill.progress}%</span>
                        </div>
                        <Progress value={skill.progress} className="h-1.5 mb-2" />
                        <div className="flex flex-wrap gap-1">
                          {skill.resources.map((r, i) => <Badge key={i} variant="secondary" className="text-xs">{r}</Badge>)}
                        </div>
                        {skill.progress < 100 && (
                          <Button size="sm" variant="ghost" className="mt-2 h-7 text-xs gap-1">Start Lesson <ArrowRight className="h-3 w-3" /></Button>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
                {si < selected.stages.length - 1 && <Separator className="ml-11 mt-4" />}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
      <div className="mb-6 animate-fade-in-up">
        <h1 className="font-display text-2xl font-bold tracking-tight">Career Roadmaps</h1>
        <p className="text-muted-foreground mt-1">Choose a career path and get a personalized learning roadmap</p>
      </div>

      {/* Custom role */}
      <Card className="mb-6 animate-fade-in-up">
        <CardContent className="p-4">
          <div className="flex gap-2">
            <Input value={customRole} onChange={(e) => setCustomRole(e.target.value)} placeholder="Enter a custom career role (e.g., Mobile Developer)" className="h-10" onKeyDown={(e) => e.key === 'Enter' && handleCustom()} />
            <Button onClick={handleCustom} disabled={!customRole.trim()} className="gap-2"><Target className="h-4 w-4" /> Create</Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {demoCareerPaths.map((career, i) => {
          const Icon = iconMap[career.icon] || Briefcase;
          const totalSkills = career.stages.reduce((acc, s) => acc + s.skills.length, 0);
          const avgProgress = totalSkills > 0
            ? Math.round(career.stages.reduce((acc, s) => acc + s.skills.reduce((a, sk) => a + sk.progress, 0), 0) / totalSkills)
            : 0;
          return (
            <Card key={career.id} className="group cursor-pointer transition-all hover:shadow-lg hover:-translate-y-0.5 duration-300 animate-fade-in-up" style={{ animationDelay: `${i * 0.05}s` }} onClick={() => handleSelect(career)}>
              <CardContent className="p-5">
                <div className="flex items-start gap-3 mb-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-5 w-5 text-primary group-hover:text-primary-foreground" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-sm">{career.title}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{career.description}</p>
                  </div>
                </div>
                {totalSkills > 0 ? (
                  <>
                    <div className="flex justify-between text-xs mb-1"><span className="text-muted-foreground">{career.stages.length} stages • {totalSkills} skills</span><span className="font-semibold">{avgProgress}%</span></div>
                    <Progress value={avgProgress} className="h-1.5" />
                  </>
                ) : (
                  <Badge variant="outline" className="text-xs">Not started</Badge>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
