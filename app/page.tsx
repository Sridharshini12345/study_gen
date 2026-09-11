'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Brain, Sparkles, BookOpen, FileText, Video, Layers,
  ClipboardCheck, Target, RefreshCw, TrendingUp, Languages,
  ArrowRight, CheckCircle2, Play, Upload, Search, Lightbulb,
  Code2, BarChart3, MessageSquare, Zap, GraduationCap, Clock,
  ChevronRight, BrainCircuit, FileCode2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Logo } from '@/components/logo';
import { ThemeToggle } from '@/components/theme-toggle';
import { cn } from '@/lib/utils';

export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <LandingNav />
      <LandingHero />
      <HowItWorks />
      <CoreFeatures />
      <OneTopicSection />
      <AITutorPreview />
      <PDFLearningSection />
      <VideoLearningSection />
      <FinalCTA />
      <LandingFooter />
    </div>
  );
}

function LandingNav() {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled ? 'glass border-b py-3' : 'py-5'
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6">
        <Logo />
        <div className="hidden items-center gap-8 md:flex">
          <Link href="#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            How it Works
          </Link>
          <Link href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Features
          </Link>
          <Link href="#ai-tutor" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            AI Tutor
          </Link>
          <Link href="#video" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Videos
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button variant="ghost" size="sm" asChild className="hidden sm:flex">
            <Link href="/login">Sign In</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/register">
              Start Learning
              <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
      </nav>
    </header>
  );
}

function LandingHero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-20">
      {/* Animated background */}
      <div className="absolute inset-0 bg-grid opacity-[0.15] dark:opacity-[0.08]" />
      <div className="absolute inset-0">
        <div className="absolute left-1/4 top-1/4 h-72 w-72 rounded-full bg-indigo-500/20 blur-[120px] animate-pulse-slow" />
        <div className="absolute right-1/4 top-1/3 h-96 w-96 rounded-full bg-violet-500/15 blur-[140px] animate-pulse-slow" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/4 left-1/3 h-80 w-80 rounded-full bg-cyan-500/15 blur-[130px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left: Content */}
          <div className="flex flex-col items-start gap-6 animate-fade-in-up">
            <Badge variant="outline" className="border-primary/30 bg-primary/5 px-3 py-1 text-primary">
              <Sparkles className="mr-1.5 h-3 w-3" />
              AI-Powered Adaptive Learning
            </Badge>

            <h1 className="font-display text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl text-balance">
              Learning that{' '}
              <span className="gradient-text">adapts to you.</span>
            </h1>

            <p className="max-w-xl text-lg text-muted-foreground leading-relaxed text-balance">
              Tell AI StudyGen what you want to learn. We adapt every lesson,
              explanation, quiz and revision plan to your knowledge level and
              learning goals.
            </p>

            <div className="flex flex-wrap gap-3">
              <Button size="lg" asChild className="group">
                <Link href="/register">
                  Start Learning
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#how-it-works">
                  <Play className="mr-2 h-4 w-4" />
                  Explore How It Works
                </Link>
              </Button>
            </div>

            <div className="flex items-center gap-6 pt-4">
              <div className="flex -space-x-2">
                {['bg-indigo-500', 'bg-violet-500', 'bg-cyan-500', 'bg-blue-500'].map((color, i) => (
                  <div key={i} className={cn('h-8 w-8 rounded-full border-2 border-background', color)} />
                ))}
              </div>
              <div className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">10,000+</span> learners
                <br />
                improving every day
              </div>
            </div>
          </div>

          {/* Right: Dashboard Preview */}
          <div className="relative animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <HeroDashboardPreview />
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroDashboardPreview() {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(68), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative">
      {/* Floating decorative elements */}
      <div className="absolute -right-4 -top-4 flex items-center gap-2 rounded-lg border bg-card p-3 shadow-lg animate-float">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/10">
          <Sparkles className="h-4 w-4 text-violet-500" />
        </div>
        <div className="text-xs">
          <p className="font-semibold">AI Tutor</p>
          <p className="text-muted-foreground">Active</p>
        </div>
      </div>

      <div className="absolute -bottom-4 -left-4 flex items-center gap-2 rounded-lg border bg-card p-3 shadow-lg animate-float-delayed">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-500/10">
          <TrendingUp className="h-4 w-4 text-green-500" />
        </div>
        <div className="text-xs">
          <p className="font-semibold">7-day streak</p>
          <p className="text-muted-foreground">Keep it up!</p>
        </div>
      </div>

      {/* Main dashboard card */}
      <Card className="overflow-hidden shadow-2xl border-border/50">
        <CardHeader className="bg-muted/30 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                <BookOpen className="h-4 w-4 text-primary" />
              </div>
              <div>
                <CardTitle className="text-sm">Java OOP</CardTitle>
                <CardDescription className="text-xs">Intermediate level</CardDescription>
              </div>
            </div>
            <Badge variant="secondary" className="text-xs">In Progress</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 p-5">
          {/* Progress bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Lesson Progress</span>
              <span className="font-semibold">{progress}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-1000"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* AI Tutor message */}
          <div className="rounded-lg border bg-muted/30 p-3">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-primary mb-1">
              <BrainCircuit className="h-3 w-3" />
              StudyGen Tutor
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              You're doing great! I noticed you struggled with polymorphism.
              Want me to explain it with a real-world analogy?
            </p>
          </div>

          {/* Mini stats */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: 'Topics', value: '12', icon: BookOpen },
              { label: 'Tests', value: '8', icon: ClipboardCheck },
              { label: 'Score', value: '74%', icon: Target },
            ].map((stat) => (
              <div key={stat.label} className="rounded-lg border p-2.5 text-center">
                <stat.icon className="mx-auto mb-1 h-3.5 w-3.5 text-muted-foreground" />
                <p className="text-sm font-bold">{stat.value}</p>
                <p className="text-[10px] text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Recommendation */}
          <div className="flex items-center gap-2 rounded-lg bg-amber-500/10 p-2.5">
            <Lightbulb className="h-3.5 w-3.5 text-amber-500 shrink-0" />
            <p className="text-xs text-muted-foreground">
              Review <span className="font-semibold text-foreground">Polymorphism</span> before your next test
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function HowItWorks() {
  const steps = [
    { icon: Search, title: 'Tell us what you want to learn', desc: 'Enter any topic — Java, Python, DSA, Cloud, or anything else.' },
    { icon: GraduationCap, title: 'Choose your knowledge level', desc: 'Beginner, intermediate, advanced, or just need a revision.' },
    { icon: Upload, title: 'Upload your study material', desc: 'Optional: share PDFs and notes so AI can learn from them too.' },
    { icon: Brain, title: 'Learn with personalized AI content', desc: 'Get lessons, examples, and explanations crafted for your level.' },
    { icon: Target, title: 'Practice, identify weaknesses and improve', desc: 'Take quizzes, detect weak topics, and get targeted revision.' },
  ];

  return (
    <section id="how-it-works" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            <Zap className="mr-1.5 h-3 w-3 text-primary" />
            Simple Process
          </Badge>
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl text-balance">
            How StudyGen Works
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            Five steps to a fully personalized learning experience
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
          {steps.map((step, i) => (
            <div key={i} className="group relative">
              <Card className="h-full transition-all hover:shadow-lg hover:-translate-y-1 duration-300">
                <CardContent className="p-6 text-center">
                  <div className="relative mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 transition-transform group-hover:scale-110 duration-300">
                    <step.icon className="h-6 w-6 text-primary" />
                    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="text-sm font-semibold mb-2 leading-snug">{step.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
                </CardContent>
              </Card>
              {i < steps.length - 1 && (
                <div className="hidden lg:flex absolute top-1/2 -right-3 z-10 h-6 w-6 -translate-y-1/2 items-center justify-center">
                  <ChevronRight className="h-5 w-5 text-muted-foreground/40" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CoreFeatures() {
  const features = [
    { icon: Brain, title: 'Adaptive Learning', desc: 'Content that adjusts to your level, pace, and learning style.' },
    { icon: MessageSquare, title: 'AI Tutor', desc: 'Context-aware chat that knows your lesson and weaknesses.' },
    { icon: FileText, title: 'PDF to Smart Notes', desc: 'Upload any PDF and get summaries, key concepts, and quizzes.' },
    { icon: Video, title: 'AI Explainer Videos', desc: 'Auto-generated lessons with narration, visuals, and subtitles.' },
    { icon: Layers, title: 'Flashcards', desc: 'AI-generated cards with flip animation and spaced repetition.' },
    { icon: ClipboardCheck, title: 'Mock Tests', desc: 'MCQs, coding questions, and timed tests with detailed analysis.' },
    { icon: Target, title: 'Weak Topic Detection', desc: 'Identify exactly where you struggle and get targeted help.' },
    { icon: RefreshCw, title: 'Personalized Revision', desc: 'Spaced repetition that brings back topics at the right time.' },
    { icon: TrendingUp, title: 'Career Roadmaps', desc: 'Step-by-step paths from beginner to job-ready for any career.' },
    { icon: Languages, title: 'English + Tamil', desc: 'Learn in your preferred language with bilingual support.' },
  ];

  return (
    <section id="features" className="relative py-24 bg-muted/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            <Sparkles className="mr-1.5 h-3 w-3 text-primary" />
            Core Features
          </Badge>
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl text-balance">
            Everything you need to master any topic
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            A complete learning toolkit powered by AI
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <Card key={i} className="group transition-all hover:shadow-lg hover:-translate-y-0.5 duration-300 border-border/50">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary group-hover:text-primary-foreground duration-300">
                    <f.icon className="h-5 w-5 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm mb-1">{f.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function OneTopicSection() {
  const levels = [
    {
      level: 'Beginner',
      tag: '"Explain it like I\'m 5."',
      example: 'Polymorphism is like a Swiss Army knife — one tool that can do different things depending on what you need.',
      color: 'from-emerald-500 to-teal-500',
      bgColor: 'bg-emerald-500/5',
      borderColor: 'border-emerald-500/20',
    },
    {
      level: 'Intermediate',
      tag: '"Give me practical examples."',
      example: 'Method overloading lets you call print() with an int or a String — same name, different behavior based on parameters.',
      color: 'from-indigo-500 to-blue-500',
      bgColor: 'bg-indigo-500/5',
      borderColor: 'border-indigo-500/20',
    },
    {
      level: 'Advanced',
      tag: '"Give me technical depth and interview questions."',
      example: 'Runtime polymorphism via virtual method dispatch in the JVM — covariant return types, bridge methods, and the bytecode-level implications.',
      color: 'from-violet-500 to-purple-500',
      bgColor: 'bg-violet-500/5',
      borderColor: 'border-violet-500/20',
    },
    {
      level: 'Revision',
      tag: '"Give me a quick refresher."',
      example: 'Polymorphism = many forms. Compile-time: overloading. Runtime: overriding. That\'s 90% of what you need.',
      color: 'from-amber-500 to-orange-500',
      bgColor: 'bg-amber-500/5',
      borderColor: 'border-amber-500/20',
    },
  ];

  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            <GraduationCap className="mr-1.5 h-3 w-3 text-primary" />
            Signature Feature
          </Badge>
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl text-balance">
            One Topic. <span className="gradient-text">Your Way.</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            The same concept explained four different ways — pick the one that works for you right now
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {levels.map((item, i) => (
            <Card
              key={i}
              className={cn(
                'group relative overflow-hidden border-2 transition-all hover:shadow-xl duration-300',
                item.bgColor,
                item.borderColor
              )}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={cn('flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br text-white', item.color)}>
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <Badge variant="outline" className="font-medium">{item.level}</Badge>
                </div>
                <p className="text-sm font-medium text-muted-foreground italic mb-3">{item.tag}</p>
                <p className="text-sm leading-relaxed">{item.example}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function AITutorPreview() {
  const messages = [
    {
      role: 'user',
      content: 'What is polymorphism?',
    },
    {
      role: 'assistant',
      content: 'Polymorphism means "many forms." In Java, it lets one method behave differently depending on the context.\n\nFor your level, here\'s the simplest way to think about it:\n\nA TV remote has a "power" button. It works on any TV — Sony, Samsung, LG — but each TV responds differently. That button is polymorphic: one interface, many implementations.\n\nWant me to show you the code version?',
    },
  ];

  const quickActions = [
    { icon: '🧒', label: 'Explain Simply' },
    { icon: '💡', label: 'Give Hint' },
    { icon: '🌍', label: 'Real-world Example' },
    { icon: '📊', label: 'Show Diagram' },
    { icon: '💻', label: 'Show Code' },
    { icon: '🧪', label: 'Test Me' },
  ];

  return (
    <section id="ai-tutor" className="relative py-24 bg-muted/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <Badge variant="outline" className="mb-4">
              <BrainCircuit className="mr-1.5 h-3 w-3 text-primary" />
              StudyGen Tutor
            </Badge>
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl text-balance">
              Your AI tutor knows <span className="gradient-text">exactly</span> where you are
            </h2>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              StudyGen Tutor is context-aware. It knows your current lesson,
              your knowledge level, your past mistakes, and your learning style —
              so every answer is tailored to you.
            </p>
            <div className="mt-6 space-y-3">
              {['Knows your current topic and lesson', 'Remembers your previous mistakes', 'Adjusts explanations to your level', 'Available in English and Tamil'].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Chat preview */}
          <Card className="overflow-hidden shadow-xl border-border/50">
            <CardHeader className="border-b bg-muted/30 py-3">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                  <BrainCircuit className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-sm">StudyGen Tutor</CardTitle>
                  <CardDescription className="text-xs flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                    Active • Java OOP • Intermediate
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4 space-y-4 max-h-[400px] overflow-y-auto">
              {messages.map((msg, i) => (
                <div key={i} className={cn('flex', msg.role === 'user' ? 'justify-end' : 'justify-start')}>
                  <div className={cn(
                    'max-w-[80%] rounded-2xl px-4 py-2.5 text-sm',
                    msg.role === 'user'
                      ? 'bg-primary text-primary-foreground rounded-br-md'
                      : 'bg-muted rounded-bl-md'
                  )}>
                    <p className="whitespace-pre-line leading-relaxed">{msg.content}</p>
                  </div>
                </div>
              ))}
              <div className="flex flex-wrap gap-2 pt-2 border-t">
                {quickActions.map((action) => (
                  <button
                    key={action.label}
                    className="flex items-center gap-1.5 rounded-full border bg-card px-3 py-1.5 text-xs font-medium transition-colors hover:bg-accent"
                  >
                    <span>{action.icon}</span>
                    {action.label}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

function PDFLearningSection() {
  const pipeline = ['PDF', 'Extract', 'Understand', 'Summarize', 'Knowledge Chunks', 'Make Searchable', 'Learning Material'];

  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* PDF Pipeline visual */}
          <div className="order-2 lg:order-1">
            <Card className="p-6 shadow-xl border-border/50">
              <div className="space-y-3">
                <div className="flex items-center gap-3 rounded-lg border-2 border-dashed bg-muted/30 p-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10">
                    <FileText className="h-6 w-6 text-red-500" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Computer Networks Unit 3.pdf</p>
                    <p className="text-xs text-muted-foreground">42 pages • 2.4 MB</p>
                  </div>
                  <Badge variant="secondary" className="ml-auto text-xs">Uploaded</Badge>
                </div>

                <div className="flex items-center justify-center gap-1 text-muted-foreground">
                  <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />
                </div>

                <div className="rounded-lg bg-muted/30 p-4 space-y-2.5">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Processing Pipeline</p>
                  {pipeline.map((step, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500/10">
                        <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                      </div>
                      <span className="text-sm">{step}</span>
                      {i < pipeline.length - 1 && (
                        <ArrowRight className="ml-auto h-3 w-3 text-muted-foreground/40" />
                      )}
                    </div>
                  ))}
                </div>

                <div className="rounded-lg border bg-card p-4">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wader mb-2">Generated Output</p>
                  <div className="grid grid-cols-2 gap-2">
                    {['Smart Notes', 'Key Concepts', 'Flashcards', 'Quiz', 'Summary', 'Revision Guide'].map((item) => (
                      <div key={item} className="flex items-center gap-1.5 rounded-md bg-primary/5 px-2.5 py-1.5 text-xs">
                        <CheckCircle2 className="h-3 w-3 text-primary" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <Badge variant="outline" className="mb-4">
              <FileText className="mr-1.5 h-3 w-3 text-primary" />
              PDF Learning
            </Badge>
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl text-balance">
              Turn any PDF into a <span className="gradient-text">smart learning experience</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              Upload your study material and StudyGen extracts key concepts,
              generates notes, creates quizzes, and lets you chat with your document
              using RAG technology.
            </p>
            <div className="mt-6 space-y-3">
              {[
                'Executive summary and key concepts',
                'Important definitions and formulas',
                'Auto-generated flashcards and quizzes',
                'Ask questions about your PDF',
                'Source references for every answer',
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function VideoLearningSection() {
  const steps = ['Topic', 'AI Script', 'Visual Explanation', 'Voice', 'Subtitles', 'Video'];
  const languages = [
    { voice: 'English Voice', sub: 'English Subtitles' },
    { voice: 'Tamil Voice', sub: 'Tamil Subtitles' },
    { voice: 'English Voice', sub: 'Tamil Subtitles' },
    { voice: 'Tamil Voice', sub: 'English Subtitles' },
  ];

  return (
    <section id="video" className="relative py-24 bg-muted/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <Badge variant="outline" className="mb-4">
              <Video className="mr-1.5 h-3 w-3 text-primary" />
              AI Video Learning
            </Badge>
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl text-balance">
              Watch AI-generated <span className="gradient-text">explainer videos</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              StudyGen creates personalized video lessons with AI-generated scripts,
              visuals, narration, and subtitles — in English and Tamil.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3">
              {languages.map((lang, i) => (
                <div key={i} className="flex items-center gap-2 rounded-lg border p-3 text-xs">
                  <div className="flex h-6 w-6 items-center justify-center rounded bg-primary/10">
                    <Languages className="h-3 w-3 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">{lang.voice}</p>
                    <p className="text-muted-foreground">{lang.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Video pipeline */}
          <Card className="p-6 shadow-xl border-border/50">
            <div className="mb-4 rounded-lg bg-gradient-to-br from-indigo-500/10 to-violet-500/10 p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold">Polymorphism in Java</span>
                <Badge variant="secondary" className="text-xs">5 min</Badge>
              </div>
              <div className="aspect-video rounded-lg bg-gradient-to-br from-indigo-600/20 via-violet-600/20 to-cyan-500/20 flex items-center justify-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-background/80 backdrop-blur transition-transform hover:scale-110 cursor-pointer">
                  <Play className="h-6 w-6 text-primary ml-1" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Generation Pipeline</p>
              <div className="flex items-center gap-1 overflow-x-auto pb-1">
                {steps.map((step, i) => (
                  <React.Fragment key={i}>
                    <div className="flex shrink-0 items-center gap-1.5 rounded-full bg-primary/5 px-2.5 py-1 text-xs">
                      <CheckCircle2 className="h-3 w-3 text-green-500" />
                      {step}
                    </div>
                    {i < steps.length - 1 && (
                      <ArrowRight className="h-3 w-3 text-muted-foreground/40 shrink-0" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            <div className="mt-4 space-y-2">
              {['Understanding topic ✓', 'Creating lesson script ✓', 'Planning scenes ✓', 'Generating narration...'].map((s, i) => (
                <div key={i} className="flex items-center gap-2 text-xs">
                  <div className={cn('h-1.5 w-1.5 rounded-full', i < 3 ? 'bg-green-500' : 'bg-primary animate-pulse')} />
                  <span className={i < 3 ? 'text-muted-foreground' : 'font-medium'}>{s}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-indigo-600 via-violet-600 to-cyan-500 p-12 text-center shadow-2xl">
          <div className="absolute inset-0 bg-grid opacity-10" />
          <div className="relative z-10">
            <h2 className="font-display text-3xl font-bold text-white tracking-tight sm:text-4xl text-balance">
              Stop studying harder.
              <br />
              Start learning smarter.
            </h2>
            <p className="mt-4 text-lg text-white/80 max-w-xl mx-auto text-balance">
              Join thousands of learners who let AI personalize their education
            </p>
            <Button size="lg" variant="secondary" asChild className="mt-8 group">
              <Link href="/register">
                Start Learning Free
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <p className="mt-3 text-xs text-white/60">No credit card required</p>
          </div>
        </Card>
      </div>
    </section>
  );
}

function LandingFooter() {
  return (
    <footer className="border-t py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex flex-col items-center gap-2 md:items-start">
            <Logo />
            <p className="text-sm text-muted-foreground">Learn smarter. Learn your way.</p>
          </div>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link href="#how-it-works" className="hover:text-foreground transition-colors">How it Works</Link>
            <Link href="#features" className="hover:text-foreground transition-colors">Features</Link>
            <Link href="/login" className="hover:text-foreground transition-colors">Sign In</Link>
            <Link href="/register" className="hover:text-foreground transition-colors">Get Started</Link>
          </div>
        </div>
        <div className="mt-8 border-t pt-6 text-center text-xs text-muted-foreground">
          © 2025 AI StudyGen. Built for smarter learning.
        </div>
      </div>
    </footer>
  );
}
