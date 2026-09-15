'use client';

import * as React from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft, BookOpen, Lightbulb, Code2, AlertCircle, Target,
  MessageSquare, Layers, ClipboardCheck, Video, Send,
  BrainCircuit, ChevronDown, ChevronUp, Sparkles, GraduationCap,
  CheckCircle2, Clock,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAuth } from '@/lib/auth-context';
import { demoRecentLessons } from '@/lib/demo-data';
import { generateLessonDemo } from '@/lib/ai-demo';
import { answerQuestionDemo } from '@/lib/ai-demo';
import type { Lesson, ChatMessage } from '@/lib/types';
import { cn } from '@/lib/utils';

const sectionIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  'What you will learn': Target,
  'Prerequisites': GraduationCap,
  'Simple explanation': BookOpen,
  'Real-world analogy': Lightbulb,
  'Visual explanation': Sparkles,
  'Example': CheckCircle2,
  'Code example': Code2,
  'Common mistakes': AlertCircle,
  'Key takeaways': Target,
  'Quick test': ClipboardCheck,
};

export default function LessonClient() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { profile } = useAuth();
  const [lesson, setLesson] = React.useState<Lesson | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [expandedSections, setExpandedSections] = React.useState<Set<number>>(new Set([0, 2]));
  const [tutorMessages, setTutorMessages] = React.useState<ChatMessage[]>([]);
  const [tutorInput, setTutorInput] = React.useState('');
  const [tutorTyping, setTutorTyping] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState(0);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const customTopic = searchParams.get('topic');
  const lessonId = params.id as string;

  React.useEffect(() => {
    if (customTopic) {
      setLoading(true);
      generateLessonDemo({
        topic: customTopic,
        level: (searchParams.get('level') as any) || profile?.knowledgeLevel || 'intermediate',
        language: (searchParams.get('lang') as any) || profile?.preferredLanguage || 'english',
        learningStyle: (searchParams.get('style') as any) || profile?.learningStyle || 'mixed',
        duration: searchParams.get('duration') || '20 min',
      }).then((l) => {
        setLesson(l);
        setLoading(false);
      });
    } else {
      const existing = demoRecentLessons.find((l) => l.id === lessonId);
      if (existing) {
        generateLessonDemo({
          topic: existing.topic,
          level: existing.level,
          language: existing.language,
          learningStyle: 'mixed',
          duration: `${existing.estimatedTime} min`,
        }).then((l) => {
          l.id = existing.id;
          l.progress = existing.progress;
          setLesson(l);
          setLoading(false);
        });
      } else {
        setLoading(false);
      }
    }
  }, [customTopic, lessonId, searchParams, profile]);

  const toggleSection = (i: number) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  const handleTutorSend = async () => {
    if (!tutorInput.trim() || tutorTyping) return;
    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: tutorInput,
      timestamp: new Date().toISOString(),
    };
    setTutorMessages((prev) => [...prev, userMsg]);
    setTutorInput('');
    setTutorTyping(true);

    const response = await answerQuestionDemo(tutorInput, {
      topic: lesson?.topic,
      knowledgeLevel: profile?.knowledgeLevel,
      learningStyle: profile?.learningStyle,
    });

    const aiMsg: ChatMessage = {
      id: `msg-${Date.now()}-ai`,
      role: 'assistant',
      content: response,
      timestamp: new Date().toISOString(),
    };
    setTutorMessages((prev) => [...prev, aiMsg]);
    setTutorTyping(false);
    setTimeout(() => {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }, 100);
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <div className="text-center">
            <p className="font-medium">Building your personalized lesson...</p>
            <p className="text-sm text-muted-foreground mt-1">StudyGen is crafting content tailored to your level</p>
          </div>
        </div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-muted-foreground">Lesson not found.</p>
      </div>
    );
  }

  const actions = [
    { label: 'Explain Simpler', icon: BookOpen },
    { label: 'Explain Deeper', icon: BrainCircuit },
    { label: 'Another Example', icon: Lightbulb },
    { label: 'Show Diagram', icon: Sparkles },
    { label: 'Ask AI', icon: MessageSquare },
    { label: 'Flashcards', icon: Layers },
    { label: 'Take Quiz', icon: ClipboardCheck },
    { label: 'Generate Video', icon: Video },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
      <Button variant="ghost" size="sm" className="mb-4 gap-1.5" onClick={() => router.back()}>
        <ArrowLeft className="h-4 w-4" />
        Back
      </Button>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main lesson content */}
        <div className="lg:col-span-2 space-y-4">
          <div className="animate-fade-in-up">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary">{lesson.topic}</Badge>
              <Badge variant="outline">{lesson.level}</Badge>
              <Badge variant="outline">
                <Clock className="mr-1 h-3 w-3" />
                {lesson.estimatedTime} min
              </Badge>
            </div>
            <h1 className="font-display text-2xl font-bold tracking-tight sm:text-3xl mb-3">{lesson.title}</h1>
            <div className="space-y-1.5 mb-4">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Lesson Progress</span>
                <span className="font-semibold">{lesson.progress}%</span>
              </div>
              <Progress value={lesson.progress} className="h-2" />
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-2 animate-fade-in-up">
            {actions.map((action) => (
              <Button key={action.label} variant="outline" size="sm" className="gap-1.5">
                <action.icon className="h-3.5 w-3.5" />
                {action.label}
              </Button>
            ))}
          </div>

          {/* Lesson sections */}
          <div className="space-y-3">
            {lesson.sections.map((section, i) => {
              const Icon = sectionIcons[section.title] || BookOpen;
              const expanded = expandedSections.has(i);
              return (
                <Card key={section.id} className={cn('transition-all', expanded && 'shadow-md')}>
                  <button
                    onClick={() => toggleSection(i)}
                    className="flex w-full items-center justify-between p-4 text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
                        <Icon className="h-4.5 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold">{section.title}</p>
                        <p className="text-xs text-muted-foreground">Section {i + 1} of {lesson.sections.length}</p>
                      </div>
                    </div>
                    {expanded ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
                  </button>
                  {expanded && (
                    <CardContent className="pt-0 animate-fade-in">
                      <div className="border-t pt-4">
                        <p className="text-sm leading-relaxed whitespace-pre-line">{section.content}</p>
                      </div>
                    </CardContent>
                  )}
                </Card>
              );
            })}
          </div>
        </div>

        {/* Right: AI Tutor panel */}
        <div className="lg:col-span-1">
          <Card className="sticky top-6 flex h-[calc(100vh-8rem)] flex-col">
            <CardHeader className="border-b py-3">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                  <BrainCircuit className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-sm">StudyGen Tutor</CardTitle>
                  <CardDescription className="text-xs flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                    Active • {lesson.topic}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <ScrollArea className="flex-1 px-4" ref={scrollRef as any}>
              <div className="space-y-3 py-3">
                {tutorMessages.length === 0 && (
                  <div className="text-center py-8">
                    <BrainCircuit className="mx-auto h-10 w-10 text-primary/30 mb-2" />
                    <p className="text-sm text-muted-foreground">Ask me anything about this lesson!</p>
                    <div className="mt-3 space-y-1.5">
                      {['Explain this simply', 'Give me an example', 'Test me'].map((q) => (
                        <button
                          key={q}
                          onClick={() => setTutorInput(q)}
                          className="block w-full rounded-lg border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {tutorMessages.map((msg) => (
                  <div key={msg.id} className={cn('flex', msg.role === 'user' ? 'justify-end' : 'justify-start')}>
                    <div className={cn(
                      'max-w-[85%] rounded-2xl px-3 py-2 text-xs',
                      msg.role === 'user' ? 'bg-primary text-primary-foreground rounded-br-md' : 'bg-muted rounded-bl-md'
                    )}>
                      <p className="whitespace-pre-line leading-relaxed">{msg.content}</p>
                    </div>
                  </div>
                ))}
                {tutorTyping && (
                  <div className="flex justify-start">
                    <div className="rounded-2xl rounded-bl-md bg-muted px-3 py-2.5">
                      <div className="flex gap-1">
                        {[0, 1, 2].map((i) => (
                          <span key={i} className="h-1.5 w-1.5 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
            <div className="border-t p-3">
              <div className="flex gap-2">
                <Input
                  value={tutorInput}
                  onChange={(e) => setTutorInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleTutorSend()}
                  placeholder="Ask a question..."
                  className="h-9 text-sm"
                  disabled={tutorTyping}
                />
                <Button size="icon" className="h-9 w-9 shrink-0" onClick={handleTutorSend} disabled={tutorTyping || !tutorInput.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
