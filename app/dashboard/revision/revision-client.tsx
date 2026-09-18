'use client';

import * as React from 'react';
import {
  RefreshCw, Clock, CheckCircle2, AlertCircle, BookOpen,
  Zap, Loader2, Lightbulb, ChevronDown, ChevronUp,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { demoRevisionItems, demoWeakTopics } from '@/lib/demo-data';
import type { RevisionItem } from '@/lib/types';
import { cn } from '@/lib/utils';

export default function RevisionClient() {
  const [quickRev, setQuickRev] = React.useState<RevisionItem | null>(null);
  const [generating, setGenerating] = React.useState(false);
  const [expandedItems, setExpandedItems] = React.useState<Set<string>>(new Set());

  const dueItems = demoRevisionItems.filter((r) => r.status === 'due');
  const reviewedItems = demoRevisionItems.filter((r) => r.status === 'reviewed');
  const masteredItems = demoRevisionItems.filter((r) => r.status === 'mastered');

  const handleQuickRevision = (item: RevisionItem) => {
    setGenerating(true);
    setTimeout(() => { setGenerating(false); setQuickRev(item); }, 1000);
  };

  const toggleItem = (id: string) => {
    setExpandedItems((prev) => { const next = new Set(prev); if (next.has(id)) next.delete(id); else next.add(id); return next; });
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
      <div className="mb-6 animate-fade-in-up">
        <h1 className="font-display text-2xl font-bold tracking-tight">Revision</h1>
        <p className="text-muted-foreground mt-1">Spaced repetition to keep your knowledge fresh</p>
      </div>

      <Tabs defaultValue="due">
        <TabsList className="mb-4">
          <TabsTrigger value="due">Review Today ({dueItems.length})</TabsTrigger>
          <TabsTrigger value="weak">Weak Topics</TabsTrigger>
          <TabsTrigger value="reviewed">Recently Reviewed</TabsTrigger>
          <TabsTrigger value="mastered">Mastered</TabsTrigger>
        </TabsList>

        {/* Due for revision */}
        <TabsContent value="due" className="space-y-3">
          {dueItems.length === 0 ? (
            <EmptyState icon={CheckCircle2} message="All caught up! No items due for revision." />
          ) : (
            dueItems.map((item) => (
              <RevisionCard key={item.id} item={item} onQuickRev={handleQuickRevision} generating={generating} expanded={expandedItems.has(item.id)} onToggle={() => toggleItem(item.id)} />
            ))
          )}
        </TabsContent>

        {/* Weak topics */}
        <TabsContent value="weak" className="space-y-3">
          {demoWeakTopics.map((wt) => (
            <Card key={wt.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-destructive" />
                    <span className="font-semibold text-sm">{wt.topic}</span>
                  </div>
                  <Badge variant="outline" className="text-destructive border-destructive/30">{wt.score}%</Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-3">{wt.recommendedAction}</p>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline"><BookOpen className="mr-1 h-3 w-3" /> Review</Button>
                  <Button size="sm" variant="outline"><RefreshCw className="mr-1 h-3 w-3" /> Retake</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="reviewed" className="space-y-3">
          {reviewedItems.length === 0 ? <EmptyState icon={Clock} message="No reviewed items yet." /> : (
            reviewedItems.map((item) => <RevisionCard key={item.id} item={item} onQuickRev={handleQuickRevision} generating={generating} expanded={expandedItems.has(item.id)} onToggle={() => toggleItem(item.id)} />)
          )}
        </TabsContent>

        <TabsContent value="mastered" className="space-y-3">
          {masteredItems.length === 0 ? <EmptyState icon={CheckCircle2} message="Master a topic to see it here!" /> : (
            masteredItems.map((item) => <RevisionCard key={item.id} item={item} onQuickRev={handleQuickRevision} generating={generating} expanded={expandedItems.has(item.id)} onToggle={() => toggleItem(item.id)} />)
          )}
        </TabsContent>
      </Tabs>

      {/* Quick Revision Result */}
      {quickRev && (
        <Card className="mt-6 animate-fade-in-up border-primary/30">
          <CardHeader className="bg-primary/5">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2"><Zap className="h-4 w-4 text-primary" /> Quick Revision: {quickRev.topic}</CardTitle>
              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setQuickRev(null)}>x</Button>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">30-Second Summary</p>
              <p className="text-sm leading-relaxed">{quickRev.summary}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Important Points</p>
              <ul className="space-y-1">{quickRev.keyPoints.map((p, i) => <li key={i} className="text-sm flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />{p}</li>)}</ul>
            </div>
            {quickRev.formulas && quickRev.formulas.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Formulas</p>
                <ul className="space-y-1">{quickRev.formulas.map((f, i) => <li key={i} className="text-sm font-mono bg-muted rounded px-3 py-1.5">{f}</li>)}</ul>
              </div>
            )}
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Common Mistakes</p>
              <ul className="space-y-1">{quickRev.commonMistakes.map((m, i) => <li key={i} className="text-sm flex items-start gap-2"><AlertCircle className="h-3.5 w-3.5 text-amber-500 mt-0.5 shrink-0" />{m}</li>)}</ul>
            </div>
            <div className="rounded-lg border p-4">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">3 Quick Questions</p>
              <ol className="space-y-1.5 text-sm text-muted-foreground">
                <li>1. What is the main purpose of {quickRev.topic}?</li>
                <li>2. Name two key principles of {quickRev.topic}.</li>
                <li>3. What is a common mistake when working with {quickRev.topic}?</li>
              </ol>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function RevisionCard({ item, onQuickRev, generating, expanded, onToggle }: {
  item: RevisionItem; onQuickRev: (i: RevisionItem) => void; generating: boolean; expanded: boolean; onToggle: () => void;
}) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <button onClick={onToggle} className="flex items-center gap-2 flex-1 text-left">
            <div className={cn('flex h-8 w-8 items-center justify-center rounded-lg', item.status === 'due' ? 'bg-amber-500/10' : item.status === 'reviewed' ? 'bg-blue-500/10' : 'bg-green-500/10')}>
              <RefreshCw className={cn('h-4 w-4', item.status === 'due' ? 'text-amber-500' : item.status === 'reviewed' ? 'text-blue-500' : 'text-green-500')} />
            </div>
            <div>
              <p className="text-sm font-semibold">{item.topic}</p>
              <p className="text-xs text-muted-foreground">{item.status === 'due' ? 'Due now' : item.status === 'reviewed' ? 'Reviewed recently' : 'Mastered'}</p>
            </div>
          </button>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" disabled={generating} onClick={() => onQuickRev(item)} className="gap-1.5">
              {generating ? <Loader2 className="h-3 w-3 animate-spin" /> : <Zap className="h-3 w-3" />}
              Quick Revision
            </Button>
            {expanded ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
          </div>
        </div>
        {expanded && (
          <div className="mt-3 pt-3 border-t animate-fade-in">
            <p className="text-xs text-muted-foreground leading-relaxed mb-2">{item.summary}</p>
            <div className="flex flex-wrap gap-1">
              {item.keyPoints.slice(0, 3).map((p, i) => <Badge key={i} variant="outline" className="text-xs">{p}</Badge>)}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function EmptyState({ icon: Icon, message }: { icon: React.ComponentType<{ className?: string }>; message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <Icon className="h-12 w-12 text-muted-foreground/30 mb-3" />
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  );
}
