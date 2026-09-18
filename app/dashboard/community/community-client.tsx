'use client';

import * as React from 'react';
import {
  Users, Heart, MessageCircle, Share2, Pin, Search, Plus,
  Sparkles, TrendingUp, Clock, Send, ArrowLeft, Bookmark,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useAuth } from '@/lib/auth-context';
import { demoCommunityPosts } from '@/lib/demo-data';
import type { CommunityPost } from '@/lib/types';
import { cn } from '@/lib/utils';

export default function CommunityClient() {
  const { profile } = useAuth();
  const [posts, setPosts] = React.useState<CommunityPost[]>(demoCommunityPosts);
  const [search, setSearch] = React.useState('');
  const [selectedPost, setSelectedPost] = React.useState<CommunityPost | null>(null);
  const [showCreate, setShowCreate] = React.useState(false);
  const [newTitle, setNewTitle] = React.useState('');
  const [newContent, setNewContent] = React.useState('');
  const [newTopic, setNewTopic] = React.useState('');
  const [newTags, setNewTags] = React.useState('');
  const [commentInput, setCommentInput] = React.useState('');

  const filtered = posts.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.content.toLowerCase().includes(search.toLowerCase()) ||
    p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
  );

  const handleLike = (id: string) => {
    setPosts((prev) => prev.map((p) => p.id === id ? { ...p, likes: p.likedByMe ? p.likes - 1 : p.likes + 1, likedByMe: !p.likedByMe } : p));
    if (selectedPost?.id === id) {
      setSelectedPost((prev) => prev ? { ...prev, likes: prev.likedByMe ? prev.likes - 1 : prev.likes + 1, likedByMe: !prev.likedByMe } : prev);
    }
  };

  const handleCreate = () => {
    if (!newTitle.trim() || !newContent.trim()) return;
    const post: CommunityPost = {
      id: `post-${Date.now()}`,
      authorId: profile?.id || 'demo-user',
      authorName: profile?.name || 'You',
      authorRole: 'Learner',
      title: newTitle,
      content: newContent,
      topic: newTopic || 'General',
      tags: newTags.split(',').map((t) => t.trim()).filter(Boolean),
      likes: 0,
      likedByMe: false,
      comments: [],
      createdAt: new Date().toISOString(),
    };
    setPosts((prev) => [post, ...prev]);
    setNewTitle(''); setNewContent(''); setNewTopic(''); setNewTags('');
    setShowCreate(false);
  };

  const handleComment = () => {
    if (!commentInput.trim() || !selectedPost) return;
    const comment = {
      id: `c-${Date.now()}`,
      authorId: profile?.id || 'demo-user',
      authorName: profile?.name || 'You',
      authorRole: 'Learner',
      content: commentInput,
      likes: 0,
      createdAt: new Date().toISOString(),
    };
    setPosts((prev) => prev.map((p) => p.id === selectedPost.id ? { ...p, comments: [...p.comments, comment] } : p));
    setSelectedPost((prev) => prev ? { ...prev, comments: [...prev.comments, comment] } : prev);
    setCommentInput('');
  };

  if (selectedPost) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6">
        <Button variant="ghost" size="sm" className="mb-4 gap-1.5" onClick={() => setSelectedPost(null)}>
          <ArrowLeft className="h-4 w-4" /> Back to Community
        </Button>

        <Card className="mb-6 animate-fade-in-up">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Avatar className="h-10 w-10"><AvatarFallback className="bg-primary/10 text-primary text-sm font-semibold">{selectedPost.authorName[0]}</AvatarFallback></Avatar>
              <div className="flex-1">
                <p className="text-sm font-semibold">{selectedPost.authorName}</p>
                <p className="text-xs text-muted-foreground">{selectedPost.authorRole} • {new Date(selectedPost.createdAt).toLocaleDateString()}</p>
              </div>
              {selectedPost.pinned && <Badge variant="secondary" className="gap-1"><Pin className="h-3 w-3" /> Pinned</Badge>}
            </div>
            <h1 className="font-display text-xl font-bold mb-3">{selectedPost.title}</h1>
            <p className="text-sm leading-relaxed whitespace-pre-line mb-4">{selectedPost.content}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="outline">{selectedPost.topic}</Badge>
              {selectedPost.tags.map((t) => <Badge key={t} variant="secondary" className="text-xs">#{t}</Badge>)}
            </div>
            <div className="flex items-center gap-4 pt-3 border-t">
              <button onClick={() => handleLike(selectedPost.id)} className={cn('flex items-center gap-1.5 text-sm transition-colors', selectedPost.likedByMe ? 'text-destructive' : 'text-muted-foreground hover:text-foreground')}>
                <Heart className={cn('h-4 w-4', selectedPost.likedByMe && 'fill-current')} /> {selectedPost.likes}
              </button>
              <span className="flex items-center gap-1.5 text-sm text-muted-foreground"><MessageCircle className="h-4 w-4" /> {selectedPost.comments.length}</span>
              <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors ml-auto"><Share2 className="h-4 w-4" /> Share</button>
            </div>
          </CardContent>
        </Card>

        {/* Comments */}
        <Card>
          <CardHeader><CardTitle className="text-base">Comments ({selectedPost.comments.length})</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {selectedPost.comments.map((c) => (
              <div key={c.id} className="flex gap-3">
                <Avatar className="h-8 w-8 shrink-0"><AvatarFallback className="bg-muted text-xs font-semibold">{c.authorName[0]}</AvatarFallback></Avatar>
                <div className="flex-1">
                  <div className="rounded-lg bg-muted p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-semibold">{c.authorName}</p>
                      <Badge variant="outline" className="text-xs">{c.authorRole}</Badge>
                    </div>
                    <p className="text-sm">{c.content}</p>
                  </div>
                  <div className="flex items-center gap-3 mt-1 ml-1">
                    <button className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"><Heart className="h-3 w-3" /> {c.likes}</button>
                    <span className="text-xs text-muted-foreground">{new Date(c.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            ))}
            <div className="flex gap-2 pt-2 border-t">
              <Avatar className="h-8 w-8 shrink-0"><AvatarFallback className="bg-primary/10 text-primary text-xs">{profile?.name?.[0] || 'U'}</AvatarFallback></Avatar>
              <div className="flex-1 flex gap-2">
                <Input value={commentInput} onChange={(e) => setCommentInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleComment()} placeholder="Write a comment..." className="h-9" />
                <Button size="icon" className="h-9 w-9 shrink-0" onClick={handleComment}><Send className="h-4 w-4" /></Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
      <div className="mb-6 animate-fade-in-up">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold tracking-tight flex items-center gap-2">
              <Users className="h-6 w-6 text-primary" /> Community
            </h1>
            <p className="text-muted-foreground mt-1">Share knowledge, ask questions, and learn together</p>
          </div>
          <Button onClick={() => setShowCreate(!showCreate)} className="gap-2"><Plus className="h-4 w-4" /> New Post</Button>
        </div>
      </div>

      {/* Create post form */}
      {showCreate && (
        <Card className="mb-6 animate-fade-in-up">
          <CardHeader><CardTitle className="text-base">Share Knowledge</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="e.g., New React 19 features you should know" />
            </div>
            <div className="space-y-2">
              <Label>Content</Label>
              <Textarea value={newContent} onChange={(e) => setNewContent(e.target.value)} placeholder="Share your knowledge, insights, or ask a question..." className="min-h-24" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Topic</Label>
                <Input value={newTopic} onChange={(e) => setNewTopic(e.target.value)} placeholder="e.g., Web Development" />
              </div>
              <div className="space-y-2">
                <Label>Tags (comma-separated)</Label>
                <Input value={newTags} onChange={(e) => setNewTags(e.target.value)} placeholder="e.g., React, Hooks, Frontend" />
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleCreate} disabled={!newTitle.trim() || !newContent.trim()}>Post</Button>
              <Button variant="outline" onClick={() => setShowCreate(false)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search posts, topics, tags..." className="pl-9" />
      </div>

      <Tabs defaultValue="trending">
        <TabsList className="mb-4">
          <TabsTrigger value="trending" className="gap-1.5"><TrendingUp className="h-3.5 w-3.5" /> Trending</TabsTrigger>
          <TabsTrigger value="latest" className="gap-1.5"><Clock className="h-3.5 w-3.5" /> Latest</TabsTrigger>
        </TabsList>

        <TabsContent value="trending" className="space-y-4">
          {[...filtered].sort((a, b) => b.likes - a.likes).map((post) => <PostCard key={post.id} post={post} onLike={handleLike} onClick={() => setSelectedPost(post)} />)}
        </TabsContent>
        <TabsContent value="latest" className="space-y-4">
          {[...filtered].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).map((post) => <PostCard key={post.id} post={post} onLike={handleLike} onClick={() => setSelectedPost(post)} />)}
        </TabsContent>
      </Tabs>
    </div>
  );
}

function PostCard({ post, onLike, onClick }: { post: CommunityPost; onLike: (id: string) => void; onClick: () => void }) {
  return (
    <Card className="group cursor-pointer transition-all hover:shadow-md duration-300" onClick={onClick}>
      <CardContent className="p-5">
        <div className="flex items-center gap-3 mb-3">
          <Avatar className="h-9 w-9"><AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">{post.authorName[0]}</AvatarFallback></Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold">{post.authorName}</p>
            <p className="text-xs text-muted-foreground">{post.authorRole} • {new Date(post.createdAt).toLocaleDateString()}</p>
          </div>
          {post.pinned && <Badge variant="secondary" className="gap-1 shrink-0"><Pin className="h-3 w-3" /> Pinned</Badge>}
        </div>
        <h3 className="font-semibold text-sm mb-2 group-hover:text-primary transition-colors">{post.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-3 mb-3">{post.content}</p>
        <div className="flex flex-wrap gap-2 mb-3">
          <Badge variant="outline" className="text-xs">{post.topic}</Badge>
          {post.tags.slice(0, 3).map((t) => <Badge key={t} variant="secondary" className="text-xs">#{t}</Badge>)}
        </div>
        <div className="flex items-center gap-4 pt-2 border-t">
          <button onClick={(e) => { e.stopPropagation(); onLike(post.id); }} className={cn('flex items-center gap-1.5 text-xs transition-colors', post.likedByMe ? 'text-destructive' : 'text-muted-foreground hover:text-foreground')}>
            <Heart className={cn('h-3.5 w-3.5', post.likedByMe && 'fill-current')} /> {post.likes}
          </button>
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground"><MessageCircle className="h-3.5 w-3.5" /> {post.comments.length}</span>
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground ml-auto"><Bookmark className="h-3.5 w-3.5" /></span>
        </div>
      </CardContent>
    </Card>
  );
}
