'use client';

import * as React from 'react';
import {
  Upload, FileText, CheckCircle2, Loader2, Sparkles, BookOpen,
  Layers, ClipboardCheck, Video, RefreshCw, Send, MessageSquare,
  FileSearch, Brain, ListChecks,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { demoUploadedDocument } from '@/lib/demo-data';
import { cn } from '@/lib/utils';

const pipeline = ['PDF', 'Extract', 'Understand', 'Summarize', 'Knowledge Chunks', 'Make Searchable', 'Learning Material'];

export default function DocumentsClient() {
  const [uploading, setUploading] = React.useState(false);
  const [processing, setProcessing] = React.useState(false);
  const [pipelineStep, setPipelineStep] = React.useState(0);
  const [documents, setDocuments] = React.useState([demoUploadedDocument]);
  const [selectedDoc, setSelectedDoc] = React.useState(demoUploadedDocument);
  const [docOnly, setDocOnly] = React.useState(true);
  const [chatMessages, setChatMessages] = React.useState<{ role: string; content: string; source?: string }[]>([]);
  const [chatInput, setChatInput] = React.useState('');
  const [dragOver, setDragOver] = React.useState(false);

  const handleUpload = () => {
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      setProcessing(true);
      setPipelineStep(0);
      const interval = setInterval(() => {
        setPipelineStep((prev) => {
          if (prev >= pipeline.length - 1) {
            clearInterval(interval);
            setProcessing(false);
            return prev;
          }
          return prev + 1;
        });
      }, 600);
    }, 1200);
  };

  const handleChatSend = () => {
    if (!chatInput.trim()) return;
    const userMsg = { role: 'user', content: chatInput };
    setChatMessages((prev) => [...prev, userMsg]);
    setChatInput('');
    setTimeout(() => {
      setChatMessages((prev) => [...prev, {
        role: 'assistant',
        content: docOnly
          ? 'Based on your document, the three main types of cloud service models are: 1) IaaS (Infrastructure as a Service) - provides virtualized computing resources, 2) PaaS (Platform as a Service) - provides a platform allowing customers to develop, run, and manage applications, 3) SaaS (Software as a Service) - provides software applications over the internet.'
          : 'Cloud service models are typically categorized into IaaS, PaaS, and SaaS. Each model offers different levels of abstraction and management responsibility.',
        source: docOnly ? 'Page 12' : undefined,
      }]);
    }, 1000);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
      <div className="mb-6 animate-fade-in-up">
        <h1 className="font-display text-2xl font-bold tracking-tight">Documents</h1>
        <p className="text-muted-foreground mt-1">Upload PDFs and turn them into smart learning material</p>
      </div>

      {/* Upload area */}
      <Card
        className={cn('mb-6 transition-all animate-fade-in-up', dragOver && 'border-primary border-2')}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => { e.preventDefault(); setDragOver(false); handleUpload(); }}
      >
        <CardContent className="p-8">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 mb-4">
              <Upload className="h-8 w-8 text-primary" />
            </div>
            <p className="font-semibold">Drag and drop your PDF here</p>
            <p className="text-sm text-muted-foreground mt-1 mb-4">or browse files from your computer</p>
            <Button onClick={handleUpload} disabled={uploading || processing} className="gap-2">
              {uploading ? (
                <><Loader2 className="h-4 w-4 animate-spin" /> Uploading...</>
              ) : (
                <><Upload className="h-4 w-4" /> Browse Files</>
              )}
            </Button>
            <p className="text-xs text-muted-foreground mt-3">Max file size: {process.env.MAX_PDF_SIZE || '10'}MB • PDF only</p>
          </div>
        </CardContent>
      </Card>

      {/* Processing pipeline */}
      {processing && (
        <Card className="mb-6 animate-fade-in-up">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin text-primary" />
              <CardTitle className="text-base">Analyzing your document...</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2.5">
              {pipeline.map((step, i) => (
                <div key={step} className="flex items-center gap-3">
                  <div className={cn('flex h-6 w-6 items-center justify-center rounded-full', i <= pipelineStep ? 'bg-green-500/10' : 'bg-muted')}>
                    {i < pipelineStep ? <CheckCircle2 className="h-3.5 w-3.5 text-green-500" /> :
                     i === pipelineStep ? <Loader2 className="h-3.5 w-3.5 animate-spin text-primary" /> :
                     <div className="h-2 w-2 rounded-full bg-muted-foreground/30" />}
                  </div>
                  <span className={cn('text-sm', i <= pipelineStep ? 'font-medium' : 'text-muted-foreground')}>{step}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Document list */}
        <div className="space-y-3">
          <h2 className="font-semibold text-sm">Your Documents</h2>
          {documents.map((doc) => (
            <Card key={doc.id} className={cn('cursor-pointer transition-all hover:shadow-md', selectedDoc.id === doc.id && 'border-primary')}>
              <CardContent className="p-4" onClick={() => setSelectedDoc(doc)}>
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-500/10">
                    <FileText className="h-5 w-5 text-red-500" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">{doc.name}</p>
                    <p className="text-xs text-muted-foreground">{doc.pages} pages • {(doc.size / 1048576).toFixed(1)} MB</p>
                    <Badge variant={doc.status === 'completed' ? 'secondary' : 'outline'} className="mt-1 text-xs">
                      {doc.status === 'completed' && <CheckCircle2 className="mr-1 h-2.5 w-2.5 text-green-500" />}
                      {doc.status}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Document content */}
        <div className="lg:col-span-2 space-y-4">
          {selectedDoc.status === 'completed' && (
            <>
              <Card className="animate-fade-in-up">
                <CardHeader><CardTitle className="text-base">Executive Summary</CardTitle></CardHeader>
                <CardContent><p className="text-sm text-muted-foreground leading-relaxed">{selectedDoc.summary}</p></CardContent>
              </Card>

              <div className="grid gap-4 sm:grid-cols-2">
                <Card><CardHeader><CardTitle className="text-sm flex items-center gap-2"><Sparkles className="h-4 w-4 text-primary" /> Key Concepts</CardTitle></CardHeader>
                  <CardContent><ul className="space-y-1.5">{selectedDoc.keyConcepts?.map((c, i) => <li key={i} className="text-sm text-muted-foreground flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />{c}</li>)}</ul></CardContent>
                </Card>
                <Card><CardHeader><CardTitle className="text-sm flex items-center gap-2"><BookOpen className="h-4 w-4 text-primary" /> Definitions</CardTitle></CardHeader>
                  <CardContent><dl className="space-y-2">{selectedDoc.definitions?.map((d, i) => <div key={i}><dt className="text-sm font-semibold">{d.term}</dt><dd className="text-xs text-muted-foreground">{d.definition}</dd></div>)}</dl></CardContent>
                </Card>
              </div>

              {selectedDoc.formulas && selectedDoc.formulas.length > 0 && (
                <Card><CardHeader><CardTitle className="text-sm flex items-center gap-2"><Layers className="h-4 w-4 text-primary" /> Important Formulas</CardTitle></CardHeader>
                  <CardContent><ul className="space-y-1.5">{selectedDoc.formulas.map((f, i) => <li key={i} className="text-sm font-mono bg-muted rounded-md px-3 py-1.5">{f}</li>)}</ul></CardContent>
                </Card>
              )}

              {selectedDoc.sections && selectedDoc.sections.length > 0 && (
                <Card><CardHeader><CardTitle className="text-sm flex items-center gap-2"><ListChecks className="h-4 w-4 text-primary" /> Chapter Breakdown</CardTitle></CardHeader>
                  <CardContent><div className="space-y-3">{selectedDoc.sections.map((s, i) => <div key={i} className="border-l-2 border-primary/20 pl-3"><p className="text-sm font-semibold">{s.title}</p><p className="text-xs text-muted-foreground">{s.summary}</p></div>)}</div></CardContent>
                </Card>
              )}

              {/* Action buttons */}
              <div className="flex flex-wrap gap-2">
                {['Explain this PDF', 'Generate notes', 'Generate flashcards', 'Generate quiz', 'Generate revision guide', 'Generate explainer video'].map((action) => (
                  <Button key={action} variant="outline" size="sm">{action}</Button>
                ))}
              </div>

              {/* RAG Chat */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base flex items-center gap-2"><MessageSquare className="h-4 w-4 text-primary" /> Ask Questions About Your PDF</CardTitle>
                    <div className="flex items-center gap-2">
                      <Label htmlFor="doc-only" className="text-xs text-muted-foreground">Document only</Label>
                      <Switch id="doc-only" checked={docOnly} onCheckedChange={setDocOnly} />
                    </div>
                  </div>
                  <CardDescription className="text-xs">AI will answer based on your uploaded document{docOnly && ' only'}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-48 mb-3 rounded-lg border p-3">
                    {chatMessages.length === 0 ? (
                      <div className="text-center py-8">
                        <FileSearch className="mx-auto h-8 w-8 text-muted-foreground/30 mb-2" />
                        <p className="text-xs text-muted-foreground">Try: "What are the three main types of cloud service models?"</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {chatMessages.map((msg, i) => (
                          <div key={i} className={cn('flex', msg.role === 'user' ? 'justify-end' : 'justify-start')}>
                            <div className={cn('max-w-[85%] rounded-lg px-3 py-2 text-xs', msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted')}>
                              <p className="leading-relaxed">{msg.content}</p>
                              {msg.source && <p className="text-xs text-muted-foreground mt-1 italic">Source: {msg.source}</p>}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </ScrollArea>
                  <div className="flex gap-2">
                    <Input value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleChatSend()} placeholder="Ask about your document..." className="h-9 text-sm" />
                    <Button size="icon" className="h-9 w-9 shrink-0" onClick={handleChatSend}><Send className="h-4 w-4" /></Button>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
