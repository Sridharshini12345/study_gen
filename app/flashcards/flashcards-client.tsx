'use client';

import * as React from 'react';
import {
  Layers, Shuffle, ChevronLeft, ChevronRight, Check,
  AlertCircle, RotateCcw, Sparkles, Loader2,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { demoFlashcards } from '@/lib/demo-data';
import type { Flashcard } from '@/lib/types';
import { cn } from '@/lib/utils';

export default function FlashcardsClient() {
  const [cards, setCards] = React.useState<Flashcard[]>(demoFlashcards);
  const [currentIdx, setCurrentIdx] = React.useState(0);
  const [flipped, setFlipped] = React.useState(false);
  const [statuses, setStatuses] = React.useState<Record<string, string>>({});
  const [generating, setGenerating] = React.useState(false);
  const [topicFilter, setTopicFilter] = React.useState('all');

  const topics = ['all', ...Array.from(new Set(demoFlashcards.map((c) => c.topic)))];
  const filteredCards = topicFilter === 'all' ? cards : cards.filter((c) => c.topic === topicFilter);
  const card = filteredCards[currentIdx];

  const handleStatus = (status: 'known' | 'learning' | 'difficult') => {
    if (!card) return;
    setStatuses((prev) => ({ ...prev, [card.id]: status }));
    setFlipped(false);
    setTimeout(() => {
      if (currentIdx < filteredCards.length - 1) setCurrentIdx(currentIdx + 1);
      else setCurrentIdx(0);
    }, 200);
  };

  const handleShuffle = () => {
    setCards((prev) => [...prev].sort(() => Math.random() - 0.5));
    setCurrentIdx(0);
    setFlipped(false);
  };

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      setCards((prev) => [...prev, ...demoFlashcards]);
    }, 1500);
  };

  const known = Object.values(statuses).filter((s) => s === 'known').length;
  const difficult = Object.values(statuses).filter((s) => s === 'difficult').length;
  const progress = filteredCards.length > 0 ? Math.round((Object.keys(statuses).length / filteredCards.length) * 100) : 0;

  if (!card) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-6">
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Layers className="h-12 w-12 text-muted-foreground/30 mb-3" />
          <p className="text-sm text-muted-foreground mb-4">No flashcards yet</p>
          <Button onClick={handleGenerate} disabled={generating} className="gap-2">
            {generating ? <><Loader2 className="h-4 w-4 animate-spin" /> Generating...</> : <><Sparkles className="h-4 w-4" /> Generate Flashcards</>}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6">
      <div className="mb-6 animate-fade-in-up">
        <h1 className="font-display text-2xl font-bold tracking-tight">Flashcards</h1>
        <p className="text-muted-foreground mt-1">Review and master key concepts with spaced repetition</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <Card><CardContent className="p-3 text-center"><p className="text-xl font-bold text-green-500">{known}</p><p className="text-xs text-muted-foreground">Known</p></CardContent></Card>
        <Card><CardContent className="p-3 text-center"><p className="text-xl font-bold text-amber-500">{filteredCards.length - known - difficult}</p><p className="text-xs text-muted-foreground">Learning</p></CardContent></Card>
        <Card><CardContent className="p-3 text-center"><p className="text-xl font-bold text-destructive">{difficult}</p><p className="text-xs text-muted-foreground">Difficult</p></CardContent></Card>
      </div>

      {/* Topic filter */}
      <div className="flex flex-wrap gap-2 mb-4">
        {topics.map((t) => (
          <button key={t} onClick={() => { setTopicFilter(t); setCurrentIdx(0); setFlipped(false); }} className={cn('rounded-full border px-3 py-1.5 text-xs font-medium capitalize transition-all', topicFilter === t ? 'border-primary bg-primary text-primary-foreground' : 'hover:bg-accent')}>{t === 'all' ? 'All Topics' : t}</button>
        ))}
      </div>

      {/* Progress */}
      <div className="mb-4">
        <div className="flex justify-between text-xs mb-1.5">
          <span className="text-muted-foreground">Card {currentIdx + 1} of {filteredCards.length}</span>
          <span className="font-semibold">{progress}% reviewed</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Flashcard */}
      <div className="mb-6 perspective-1000">
        <div
          className={cn('relative h-72 cursor-pointer preserve-3d transition-transform duration-500', flipped && 'rotate-y-180')}
          onClick={() => setFlipped(!flipped)}
        >
          {/* Front */}
          <Card className="absolute inset-0 backface-hidden flex items-center justify-center">
            <CardContent className="p-8 text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Badge variant={card.difficulty === 'easy' ? 'secondary' : card.difficulty === 'hard' ? 'destructive' : 'outline'} className="text-xs capitalize">{card.difficulty}</Badge>
                <Badge variant="outline" className="text-xs">{card.topic}</Badge>
              </div>
              <p className="text-lg font-semibold mb-4">{card.front}</p>
              <p className="text-xs text-muted-foreground">Click to reveal answer</p>
            </CardContent>
          </Card>
          {/* Back */}
          <Card className="absolute inset-0 backface-hidden rotate-y-180 flex items-center justify-center bg-primary/5">
            <CardContent className="p-8 text-center">
              <p className="text-sm leading-relaxed">{card.back}</p>
              <p className="text-xs text-muted-foreground mt-4">Click to flip back</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between gap-3">
        <Button variant="outline" size="icon" onClick={() => { setFlipped(false); setCurrentIdx((prev) => (prev === 0 ? filteredCards.length - 1 : prev - 1)); }}>
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-1.5 text-green-600 hover:text-green-700" onClick={() => handleStatus('known')}>
            <Check className="h-3.5 w-3.5" /> Know it
          </Button>
          <Button variant="outline" size="sm" className="gap-1.5 text-amber-600 hover:text-amber-700" onClick={() => handleStatus('learning')}>
            <RotateCcw className="h-3.5 w-3.5" /> Need practice
          </Button>
          <Button variant="outline" size="sm" className="gap-1.5 text-destructive hover:text-destructive" onClick={() => handleStatus('difficult')}>
            <AlertCircle className="h-3.5 w-3.5" /> Difficult
          </Button>
        </div>

        <Button variant="outline" size="icon" onClick={() => { setFlipped(false); setCurrentIdx((prev) => (prev >= filteredCards.length - 1 ? 0 : prev + 1)); }}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="mt-6 flex justify-center gap-2">
        <Button variant="outline" size="sm" className="gap-1.5" onClick={handleShuffle}><Shuffle className="h-3.5 w-3.5" /> Shuffle</Button>
        <Button variant="outline" size="sm" className="gap-1.5" onClick={handleGenerate} disabled={generating}>
          {generating ? <><Loader2 className="h-3.5 w-3.5 animate-spin" /> Generating...</> : <><Sparkles className="h-3.5 w-3.5" /> Generate More</>}
        </Button>
      </div>
    </div>
  );
}
