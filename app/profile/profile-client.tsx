'use client';

import * as React from 'react';
import {
  User, GraduationCap, Languages, Lightbulb, Target, Clock,
  Bell, Palette, BrainCircuit, Lock, LogOut, Mail,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

export default function ProfileClient() {
  const { profile, signOut, updateProfile } = useAuth();
  const router = useRouter();
  const [name, setName] = React.useState(profile?.name || '');
  const [notifications, setNotifications] = React.useState({ weakTopics: true, revision: true, streak: true, weekly: false });
  const [aiPrefs, setAiPrefs] = React.useState({ simplerExplanations: true, autoQuiz: false, bilingual: false });

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6">
      <div className="mb-6 animate-fade-in-up">
        <h1 className="font-display text-2xl font-bold tracking-tight">Profile & Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your account and learning preferences</p>
      </div>

      {/* Profile info */}
      <Card className="mb-6 animate-fade-in-up">
        <CardHeader><CardTitle className="text-base flex items-center gap-2"><User className="h-4 w-4 text-primary" /> Profile Information</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 border-2 border-primary/20">
              <AvatarFallback className="bg-primary/10 text-primary text-xl font-semibold">{name[0]?.toUpperCase() || 'U'}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{name}</p>
              <p className="text-sm text-muted-foreground">{profile?.email}</p>
              <Button size="sm" variant="outline" className="mt-2">Change Avatar</Button>
            </div>
          </div>
          <Separator />
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input value={profile?.email || ''} disabled className="bg-muted" />
            </div>
          </div>
          <Button onClick={() => updateProfile({ name })}>Save Changes</Button>
        </CardContent>
      </Card>

      {/* Learning preferences */}
      <Card className="mb-6 animate-fade-in-up">
        <CardHeader><CardTitle className="text-base flex items-center gap-2"><GraduationCap className="h-4 w-4 text-primary" /> Learning Preferences</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <PrefItem icon={GraduationCap} label="Knowledge Level" value={profile?.knowledgeLevel || 'intermediate'} />
            <PrefItem icon={Languages} label="Preferred Language" value={profile?.preferredLanguage || 'english'} />
            <PrefItem icon={Lightbulb} label="Learning Style" value={profile?.learningStyle || 'mixed'} />
            <PrefItem icon={Clock} label="Study Time" value={profile?.studyTime || '30min'} />
          </div>
          <Separator />
          <div className="space-y-2">
            <Label>Career Goal</Label>
            <Input defaultValue={profile?.careerGoal || ''} placeholder="e.g., Full Stack Developer" />
          </div>
        </CardContent>
      </Card>

      {/* Notification settings */}
      <Card className="mb-6 animate-fade-in-up">
        <CardHeader><CardTitle className="text-base flex items-center gap-2"><Bell className="h-4 w-4 text-primary" /> Notifications</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <ToggleRow label="Weak topic alerts" desc="Get notified when weak topics are detected" checked={notifications.weakTopics} onChange={(v) => setNotifications({ ...notifications, weakTopics: v })} />
          <ToggleRow label="Revision reminders" desc="Daily reminders for due revisions" checked={notifications.revision} onChange={(v) => setNotifications({ ...notifications, revision: v })} />
          <ToggleRow label="Streak reminders" desc="Don't break your learning streak" checked={notifications.streak} onChange={(v) => setNotifications({ ...notifications, streak: v })} />
          <ToggleRow label="Weekly summary" desc="Weekly progress report email" checked={notifications.weekly} onChange={(v) => setNotifications({ ...notifications, weekly: v })} />
        </CardContent>
      </Card>

      {/* AI Preferences */}
      <Card className="mb-6 animate-fade-in-up">
        <CardHeader><CardTitle className="text-base flex items-center gap-2"><BrainCircuit className="h-4 w-4 text-primary" /> AI Preferences</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <ToggleRow label="Prefer simpler explanations" desc="AI will default to simpler language" checked={aiPrefs.simplerExplanations} onChange={(v) => setAiPrefs({ ...aiPrefs, simplerExplanations: v })} />
          <ToggleRow label="Auto-generate quizzes" desc="Create quizzes after each lesson" checked={aiPrefs.autoQuiz} onChange={(v) => setAiPrefs({ ...aiPrefs, autoQuiz: v })} />
          <ToggleRow label="Bilingual responses" desc="AI responds in both English and Tamil" checked={aiPrefs.bilingual} onChange={(v) => setAiPrefs({ ...aiPrefs, bilingual: v })} />
        </CardContent>
      </Card>

      {/* Privacy & Account */}
      <Card className="mb-6 animate-fade-in-up">
        <CardHeader><CardTitle className="text-base flex items-center gap-2"><Lock className="h-4 w-4 text-primary" /> Privacy & Account</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full justify-start gap-2"><Lock className="h-4 w-4" /> Change Password</Button>
          <Button variant="outline" className="w-full justify-start gap-2"><Mail className="h-4 w-4" /> Manage Email Preferences</Button>
          <Button variant="outline" className="w-full justify-start gap-2 text-destructive hover:text-destructive" onClick={handleSignOut}><LogOut className="h-4 w-4" /> Sign Out</Button>
        </CardContent>
      </Card>
    </div>
  );
}

function PrefItem({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 rounded-lg border p-3">
      <Icon className="h-4 w-4 text-primary" />
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-medium capitalize">{value}</p>
      </div>
    </div>
  );
}

function ToggleRow({ label, desc, checked, onChange }: { label: string; desc: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-between">
      <div><p className="text-sm font-medium">{label}</p><p className="text-xs text-muted-foreground">{desc}</p></div>
      <Switch checked={checked} onCheckedChange={onChange} />
    </div>
  );
}
