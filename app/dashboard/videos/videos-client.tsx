'use client';

import * as React from 'react';
import {
  Video, Play, Download, Save, RefreshCw, ClipboardCheck,
  Film, Clock, Languages, Sparkles, CheckCircle2, Loader2,
  Zap, Heart, Search,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useAuth } from '@/lib/auth-context';
import { demoVideoLibrary, demoVideoJob } from '@/lib/demo-data';
import type { VideoGenerationJob as VideoJob, KnowledgeLevel, Language, VideoStyle, SubtitleOption } from '@/lib/types';
import { cn } from '@/lib/utils';

const generationSteps = [
  'Understanding topic', 'Creating lesson script', 'Planning scenes',
  'Creating visuals', 'Generating narration', 'Creating subtitles',
  'Rendering video', 'Finalizing',
];

export default function VideosClient() {
  const { profile } = useAuth();
  const [tab, setTab] = React.useState('library');
  const [topic, setTopic] = React.useState('');
  const [level, setLevel] = React.useState<KnowledgeLevel>('intermediate');
  const [language, setLanguage] = React.useState<Language>('english');
  const [duration, setDuration] = React.useState('5 min');
  const [voiceLang, setVoiceLang] = React.useState<Language>('english');
  const [subtitles, setSubtitles] = React.useState<SubtitleOption>('both');
  const [style, setStyle] = React.useState<VideoStyle>('diagram_based');
  const [generating, setGenerating] = React.useState(false);
  const [genStep, setGenStep] = React.useState(0);
  const [genComplete, setGenComplete] = React.useState(false);
  const [favorites, setFavorites] = React.useState<Set<string>>(new Set());
  const [filter, setFilter] = React.useState('all');

  const handleGenerate = () => {
    if (!topic.trim()) return;
    setGenerating(true);
    setGenStep(0);
    setGenComplete(false);
    const interval = setInterval(() => {
      setGenStep((prev) => {
        if (prev >= generationSteps.length - 1) {
          clearInterval(interval);
          setGenerating(false);
          setGenComplete(true);
          return prev;
        }
        return prev + 1;
      });
    }, 700);
  };

  const toggleFav = (id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const filteredVideos = filter === 'favorites'
    ? demoVideoLibrary.filter((v) => favorites.has(v.id))
    : filter === 'recent'
    ? [...demoVideoLibrary].sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    : demoVideoLibrary;

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
      <div className="mb-6 animate-fade-in-up">
        <h1 className="font-display text-2xl font-bold tracking-tight">AI Video Lessons</h1>
        <p className="text-muted-foreground mt-1">Generate personalized explainer videos or browse your library</p>
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="library">Library</TabsTrigger>
          <TabsTrigger value="create">Create Video</TabsTrigger>
        </TabsList>

        {/* Library Tab */}
        <TabsContent value="library" className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {['all', 'recent', 'favorites'].map((f) => (
              <button key={f} onClick={() => setFilter(f)} className={cn('rounded-full border px-3 py-1.5 text-xs font-medium capitalize transition-all', filter === f ? 'border-primary bg-primary text-primary-foreground' : 'hover:bg-accent')}>{f}</button>
            ))}
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredVideos.map((video) => (
              <Card key={video.id} className="group cursor-pointer overflow-hidden transition-all hover:shadow-lg hover:-translate-y-0.5 duration-300">
                <div className="relative aspect-video bg-gradient-to-br from-indigo-600/20 via-violet-600/20 to-cyan-500/20 flex items-center justify-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-background/80 backdrop-blur transition-transform group-hover:scale-110">
                    <Play className="h-5 w-5 text-primary ml-0.5" />
                  </div>
                  <button onClick={(e) => { e.stopPropagation(); toggleFav(video.id); }} className="absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-background/80 backdrop-blur transition-colors hover:bg-background">
                    <Heart className={cn('h-4 w-4', favorites.has(video.id) ? 'fill-destructive text-destructive' : 'text-muted-foreground')} />
                  </button>
                  <Badge className="absolute bottom-2 right-2 text-xs">{video.duration}</Badge>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-sm truncate">{video.topic}</h3>
                  <div className="flex items-center gap-2 mt-2 flex-wrap">
                    <Badge variant="outline" className="text-xs">{video.level}</Badge>
                    <Badge variant="secondary" className="text-xs capitalize">{video.voiceLanguage}</Badge>
                    {video.subtitles !== 'none' && <Badge variant="outline" className="text-xs">CC: {video.subtitles}</Badge>}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">{new Date(video.createdAt).toLocaleDateString()}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          {filteredVideos.length === 0 && (
            <div className="flex flex-col items-center py-16 text-center">
              <Video className="h-12 w-12 text-muted-foreground/30 mb-3" />
              <p className="text-sm text-muted-foreground">No videos found. Try a different filter or create a new video!</p>
            </div>
          )}
        </TabsContent>

        {/* Create Video Tab */}
        <TabsContent value="create" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2"><Film className="h-5 w-5 text-primary" /> Create an AI Learning Video</CardTitle>
              <CardDescription>Generate a personalized video lesson with AI narration and subtitles</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-2">
                <Label>Topic</Label>
                <Input value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="e.g., Polymorphism in Java" />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Knowledge Level</Label>
                  <div className="flex flex-wrap gap-2">
                    {['beginner', 'intermediate', 'advanced'].map((l) => (
                      <button key={l} onClick={() => setLevel(l as KnowledgeLevel)} className={cn('rounded-lg border px-3 py-1.5 text-xs font-medium capitalize transition-all', level === l ? 'border-primary bg-primary text-primary-foreground' : 'hover:bg-accent')}>{l}</button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Duration</Label>
                  <div className="flex flex-wrap gap-2">
                    {['5 min', '10 min', '20 min'].map((d) => (
                      <button key={d} onClick={() => setDuration(d)} className={cn('rounded-lg border px-3 py-1.5 text-xs font-medium transition-all', duration === d ? 'border-primary bg-primary text-primary-foreground' : 'hover:bg-accent')}>{d}</button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Voice Language</Label>
                  <div className="flex gap-2">
                    {['english', 'tamil'].map((l) => (
                      <button key={l} onClick={() => setVoiceLang(l as Language)} className={cn('rounded-lg border px-4 py-1.5 text-xs font-medium capitalize transition-all', voiceLang === l ? 'border-primary bg-primary text-primary-foreground' : 'hover:bg-accent')}>{l}</button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Subtitles</Label>
                  <div className="flex flex-wrap gap-2">
                    {['english', 'tamil', 'both', 'none'].map((s) => (
                      <button key={s} onClick={() => setSubtitles(s as SubtitleOption)} className={cn('rounded-lg border px-3 py-1.5 text-xs font-medium capitalize transition-all', subtitles === s ? 'border-primary bg-primary text-primary-foreground' : 'hover:bg-accent')}>{s}</button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Visual Style</Label>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {[
                    { v: 'clean_educational', l: 'Clean Educational' },
                    { v: 'diagram_based', l: 'Diagram-based' },
                    { v: 'code_focused', l: 'Code-focused' },
                    { v: 'presentation', l: 'Presentation' },
                  ].map((s) => (
                    <button key={s.v} onClick={() => setStyle(s.v as VideoStyle)} className={cn('rounded-lg border p-3 text-xs font-medium text-center transition-all', style === s.v ? 'border-primary bg-primary/5' : 'hover:bg-accent')}>{s.l}</button>
                  ))}
                </div>
              </div>

              <Button onClick={handleGenerate} disabled={!topic.trim() || generating} className="w-full h-12 gap-2">
                {generating ? <><Loader2 className="h-4 w-4 animate-spin" /> Generating...</> : <><Zap className="h-4 w-4" /> Generate Video</>}
              </Button>
            </CardContent>
          </Card>

          {/* Generation pipeline */}
          {generating && (
            <Card className="animate-fade-in-up">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin text-primary" />
                  Generating your video...
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-semibold">{Math.round(((genStep + 1) / generationSteps.length) * 100)}%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                    <div className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-500" style={{ width: `${((genStep + 1) / generationSteps.length) * 100}%` }} />
                  </div>
                </div>
                <div className="space-y-2">
                  {generationSteps.map((step, i) => (
                    <div key={step} className="flex items-center gap-3 text-sm">
                      <div className={cn('flex h-5 w-5 items-center justify-center rounded-full', i < genStep ? 'bg-green-500/10' : i === genStep ? 'bg-primary/10' : 'bg-muted')}>
                        {i < genStep ? <CheckCircle2 className="h-3 w-3 text-green-500" /> : i === genStep ? <Loader2 className="h-3 w-3 animate-spin text-primary" /> : <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground/30" />}
                      </div>
                      <span className={cn(i <= genStep ? 'font-medium' : 'text-muted-foreground')}>{step}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Complete */}
          {genComplete && (
            <Card className="animate-fade-in-up">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center mb-4">
                  <CheckCircle2 className="h-12 w-12 text-green-500 mb-2" />
                  <p className="font-semibold">Video generated successfully!</p>
                  <p className="text-sm text-muted-foreground">Your AI lesson video is ready to watch</p>
                </div>
                <div className="relative aspect-video rounded-lg bg-gradient-to-br from-indigo-600/20 via-violet-600/20 to-cyan-500/20 flex items-center justify-center mb-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-background/80 backdrop-blur cursor-pointer transition-transform hover:scale-110">
                    <Play className="h-7 w-7 text-primary ml-1" />
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 justify-center">
                  <Button size="sm" className="gap-1.5"><Play className="h-3.5 w-3.5" /> Watch</Button>
                  <Button size="sm" variant="outline" className="gap-1.5"><Download className="h-3.5 w-3.5" /> Download</Button>
                  <Button size="sm" variant="outline" className="gap-1.5"><Save className="h-3.5 w-3.5" /> Save to Library</Button>
                  <Button size="sm" variant="outline" className="gap-1.5"><RefreshCw className="h-3.5 w-3.5" /> Regenerate</Button>
                  <Button size="sm" variant="outline" className="gap-1.5"><ClipboardCheck className="h-3.5 w-3.5" /> Create Quiz</Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
