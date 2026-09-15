'use client';

import * as React from 'react';
import {
  Send, BrainCircuit, Plus, MessageSquare, Copy, RefreshCw,
  Trash2, ThumbsUp, ThumbsDown, Lightbulb, Code2, Globe,
  BarChart3, Sparkles, GraduationCap, FlaskConical,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/lib/auth-context';
import { demoConversation } from '@/lib/demo-data';
import { answerQuestionDemo } from '@/lib/ai-demo';
import type { ChatMessage } from '@/lib/types';
import { cn } from '@/lib/utils';

const quickActions = [
  { label: 'Explain Simply', icon: GraduationCap },
  { label: 'Give Hint', icon: Lightbulb },
  { label: 'Real-world Example', icon: Globe },
  { label: 'Show Diagram', icon: BarChart3 },
  { label: 'Show Code', icon: Code2 },
  { label: 'Test Me', icon: FlaskConical },
];

const conversations = [
  { id: 'conv-1', title: 'Understanding Polymorphism', preview: 'What is polymorphism?', date: 'Today' },
  { id: 'conv-2', title: 'SQL Joins Help', preview: 'How do LEFT JOINs work?', date: 'Yesterday' },
  { id: 'conv-3', title: 'TCP/IP vs OSI', preview: 'What is the difference...', date: '3 days ago' },
];

export default function TutorClient() {
  const { profile } = useAuth();
  const [messages, setMessages] = React.useState<ChatMessage[]>(demoConversation.messages);
  const [input, setInput] = React.useState('');
  const [typing, setTyping] = React.useState(false);
  const [showSidebar, setShowSidebar] = React.useState(true);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, typing]);

  const handleSend = async (content?: string) => {
    const text = content || input;
    if (!text.trim() || typing) return;
    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setTyping(true);

    const response = await answerQuestionDemo(text, {
      topic: profile?.topic || 'Java OOP',
      knowledgeLevel: profile?.knowledgeLevel,
      learningStyle: profile?.learningStyle,
    });

    setMessages((prev) => [...prev, {
      id: `msg-${Date.now()}-ai`,
      role: 'assistant',
      content: response,
      timestamp: new Date().toISOString(),
    }]);
    setTyping(false);
  };

  const handleClear = () => setMessages([]);

  const handleCopy = (content: string) => {
    navigator.clipboard?.writeText(content);
  };

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Conversation sidebar */}
      {showSidebar && (
        <div className="hidden md:flex w-64 shrink-0 border-r flex-col">
          <div className="p-3 border-b">
            <Button className="w-full gap-2" size="sm">
              <Plus className="h-4 w-4" />
              New Conversation
            </Button>
          </div>
          <ScrollArea className="flex-1 px-2 py-3">
            <div className="space-y-1">
              {conversations.map((conv) => (
                <button
                  key={conv.id}
                  className={cn(
                    'flex w-full items-start gap-2.5 rounded-lg p-2.5 text-left transition-colors',
                    conv.id === 'conv-1' ? 'bg-accent' : 'hover:bg-accent/50'
                  )}
                >
                  <MessageSquare className="h-4 w-4 mt-0.5 shrink-0 text-muted-foreground" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{conv.title}</p>
                    <p className="truncate text-xs text-muted-foreground">{conv.preview}</p>
                  </div>
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}

      {/* Chat area */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
              <BrainCircuit className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold">StudyGen Tutor</p>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                Active • {profile?.topic || 'Java OOP'} • {profile?.knowledgeLevel || 'intermediate'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleClear} title="Clear conversation">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1" ref={scrollRef as any}>
          <div className="mx-auto max-w-3xl px-4 py-6 space-y-6">
            {messages.map((msg) => (
              <div key={msg.id} className={cn('flex gap-3 animate-fade-in-up', msg.role === 'user' && 'flex-row-reverse')}>
                <div className={cn(
                  'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg',
                  msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-primary/10'
                )}>
                  {msg.role === 'user' ? (
                    <span className="text-xs font-bold">{profile?.name?.[0]?.toUpperCase() || 'U'}</span>
                  ) : (
                    <BrainCircuit className="h-4 w-4 text-primary" />
                  )}
                </div>
                <div className={cn('flex-1', msg.role === 'user' && 'flex flex-col items-end')}>
                  <div className={cn(
                    'max-w-[80%] rounded-2xl px-4 py-3',
                    msg.role === 'user' ? 'bg-primary text-primary-foreground rounded-tr-md' : 'bg-muted rounded-tl-md'
                  )}>
                    <p className="text-sm whitespace-pre-line leading-relaxed">{msg.content}</p>
                  </div>
                  {msg.role === 'assistant' && (
                    <div className="flex items-center gap-1 mt-1.5 max-w-[80%]">
                      <button onClick={() => handleCopy(msg.content)} className="flex items-center gap-1 rounded px-2 py-1 text-xs text-muted-foreground hover:bg-accent transition-colors">
                        <Copy className="h-3 w-3" /> Copy
                      </button>
                      <button className="flex items-center gap-1 rounded px-2 py-1 text-xs text-muted-foreground hover:bg-accent transition-colors">
                        <RefreshCw className="h-3 w-3" /> Regenerate
                      </button>
                      <button className="rounded p-1 text-muted-foreground hover:text-green-500 transition-colors">
                        <ThumbsUp className="h-3 w-3" />
                      </button>
                      <button className="rounded p-1 text-muted-foreground hover:text-destructive transition-colors">
                        <ThumbsDown className="h-3 w-3" />
                      </button>
                      <span className="text-xs text-muted-foreground ml-auto">
                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex gap-3 animate-fade-in">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <BrainCircuit className="h-4 w-4 text-primary" />
                </div>
                <div className="rounded-2xl rounded-tl-md bg-muted px-4 py-3">
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <span key={i} className="h-2 w-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Quick actions + input */}
        <div className="border-t p-4">
          <div className="mx-auto max-w-3xl">
            <div className="flex flex-wrap gap-2 mb-3">
              {quickActions.map((action) => (
                <button
                  key={action.label}
                  onClick={() => handleSend(action.label)}
                  disabled={typing}
                  className="flex items-center gap-1.5 rounded-full border bg-card px-3 py-1.5 text-xs font-medium transition-colors hover:bg-accent disabled:opacity-50"
                >
                  <action.icon className="h-3.5 w-3.5 text-primary" />
                  {action.label}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask StudyGen anything..."
                className="h-11"
                disabled={typing}
              />
              <Button size="icon" className="h-11 w-11 shrink-0" onClick={() => handleSend()} disabled={typing || !input.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
