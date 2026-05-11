'use client';

import React, { useState } from 'react';
import { ThemeCustomizer } from '@/components/admin/theme-customizer';
import { LayoutTemplate, PlusCircle, ArrowLeft, Download, Calendar, Trash2, Settings, Eye, Pencil, Check, X } from 'lucide-react';

export default function AdminBlogCreatePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [action, setAction] = useState<'selection' | 'post' | 'theme' | 'manage'>('selection');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    type: 'blog',
    excerpt: '',
    category: 'Gaming',
    tags: '',
    content: '<p>Write your amazing blog post here using HTML and Tailwind classes!</p>',
  });

  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
  const [postImageFile, setPostImageFile] = useState<File | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'bhandari_Mate' && password === 'Commerce@#$123') {
      setIsAuthenticated(true);
    } else {
      alert('Invalid credentials');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fileType: 'pdf' | 'cover' | 'post') => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (fileType === 'pdf') {
        setPdfFile(file);
        setFormData(prev => ({ ...prev, type: 'magazine' })); // auto switch to magazine
      }
      else if (fileType === 'cover') setCoverImageFile(file);
      else if (fileType === 'post') setPostImageFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });
      if (pdfFile) data.append('pdfFile', pdfFile);
      if (coverImageFile) data.append('coverImageFile', coverImageFile);
      if (postImageFile) data.append('postImageFile', postImageFile);

      const response = await fetch('/api/blog/create', {
        method: 'POST',
        body: data,
      });

      if (response.ok) {
        setMessage('Blog created successfully! Current data file has been updated.');
        // Reset form or redirect
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.error}`);
      }
    } catch (error) {
      setMessage('Failed to submit the form.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <form onSubmit={handleLogin} className="bg-card p-8 rounded-xl shadow-lg border max-w-sm w-full">
          <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Username</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-md bg-background"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded-md bg-background"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="w-full bg-primary text-primary-foreground py-2 rounded-md font-semibold hover:opacity-90">
            Login
          </button>
        </form>
      </div>
    );
  }

  if (action === 'selection') {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
          <button 
            onClick={() => setAction('post')} 
            className="p-8 border rounded-xl bg-card hover:bg-muted/50 hover:shadow-md transition-all flex flex-col items-center justify-center gap-4 group"
          >
            <div className="bg-primary/10 p-5 rounded-full group-hover:bg-primary/20 transition-colors text-primary">
              <PlusCircle className="w-10 h-10" />
            </div>
            <span className="text-xl font-bold">Add Post</span>
            <p className="text-sm text-muted-foreground text-center">Manage Blogs, News, and Magazine publications.</p>
          </button>
          
          <button 
            onClick={() => setAction('theme')} 
            className="p-8 border rounded-xl bg-card hover:bg-muted/50 hover:shadow-md transition-all flex flex-col items-center justify-center gap-4 group"
          >
            <div className="bg-purple-500/10 p-5 rounded-full group-hover:bg-purple-500/20 transition-colors text-purple-500">
              <LayoutTemplate className="w-10 h-10" />
            </div>
            <span className="text-xl font-bold">Edit Theme</span>
            <p className="text-sm text-muted-foreground text-center">Customize global colors and UI styling instantly.</p>
          </button>
          
          <button 
            onClick={() => setAction('manage')} 
            className="p-8 border rounded-xl bg-card hover:bg-muted/50 hover:shadow-md transition-all flex flex-col items-center justify-center gap-4 group md:col-span-1"
          >
            <div className="bg-blue-500/10 p-5 rounded-full group-hover:bg-blue-500/20 transition-colors text-blue-500">
              <Settings className="w-10 h-10" />
            </div>
            <span className="text-xl font-bold">Manage Posts</span>
            <p className="text-sm text-muted-foreground text-center">View, edit, or delete existing blogs and magazines.</p>
          </button>

          <a 
            href="/api/export" 
            download
            className="p-8 border rounded-xl bg-card hover:bg-muted/50 hover:shadow-md transition-all flex flex-col items-center justify-center gap-4 group md:col-span-1"
          >
            <div className="bg-green-500/10 p-5 rounded-full group-hover:bg-green-500/20 transition-colors text-green-500">
              <Download className="w-10 h-10" />
            </div>
            <span className="text-xl font-bold">Export Data</span>
            <p className="text-sm text-muted-foreground text-center">Download a full JSON backup of all posts.</p>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-10 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto flex flex-col mb-6">
        <button 
          onClick={() => setAction('selection')} 
          className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors w-fit"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </button>
      </div>

      {action === 'theme' ? (
        <div className="max-w-6xl mx-auto">
          <ThemeCustomizer />
        </div>
      ) : action === 'manage' ? (
        <div className="max-w-6xl mx-auto">
          <ManagePosts />
        </div>
      ) : (
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">

        {/* Editor Form */}
        <div className="lg:w-1/2 bg-card p-6 rounded-xl border shadow-sm">
          <h1 className="text-3xl font-bold mb-6">Create New Blog Post</h1>

          {message && (
            <div className={`p-4 mb-6 rounded-md ${message.includes('Error') ? 'bg-red-500/10 text-red-500' : 'bg-green-500/10 text-green-500'}`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 flex flex-col">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Content Type</label>
                <select name="type" value={formData.type} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md bg-background">
                  <option value="blog">Blog</option>
                  <option value="news">News</option>
                  <option value="magazine">Magazine</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input type="text" name="title" value={formData.title} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md bg-background" required />
              </div>
            </div>

            {formData.type !== 'magazine' && (
              <div>
                <label className="block text-sm font-medium mb-1">Excerpt</label>
                <textarea name="excerpt" value={formData.excerpt} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md bg-background" rows={2} required={formData.type !== 'magazine'} />
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <select name="category" value={formData.category} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md bg-background">
                  <option value="Spices">Spices</option>
                  <option value="Dairy">Dairy</option>
                  <option value="Exim">Exim</option>
                  <option value="Business Leaders">Business Leaders</option>
                  <option value="Logistic">Logistic</option>
                  <option value="Electronics">Electronics</option>
                </select>
              </div>
              {formData.type !== 'magazine' && (
                <div>
                  <label className="block text-sm font-medium mb-1">Tags (Comma separated)</label>
                  <input type="text" name="tags" value={formData.tags} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md bg-background" placeholder="Tech, AI, Future" required={formData.type !== 'magazine'} />
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Cover Image (Optional)</label>
                <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'cover')} className="w-full px-3 py-2 border rounded-md bg-background" />
              </div>
              
              {formData.type !== 'magazine' && (
                <div>
                  <label className="block text-sm font-medium mb-1">Main Post Image (Required)</label>
                  <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'post')} className="w-full px-3 py-2 border rounded-md bg-background" required />
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">PDF File (Optional for Blog/News, Recommended for Magazine)</label>
              <input type="file" accept="application/pdf" onChange={(e) => handleFileChange(e, 'pdf')} className="w-full px-3 py-2 border rounded-md bg-background" />
            </div>

            {formData.type !== 'magazine' && (
              <div className="flex-grow flex flex-col">
                <label className="block text-sm font-medium mb-1">HTML Content & Tailwind classes</label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md bg-background font-mono text-sm h-[300px]"
                  required={formData.type !== 'magazine'}
                />
              </div>
            )}

            <button type="submit" disabled={isSubmitting} className="w-full bg-primary text-primary-foreground py-3 rounded-md font-bold mt-4 hover:opacity-90 disabled:opacity-50">
              {isSubmitting ? 'Saving...' : 'Add Post'}
            </button>
          </form>
        </div>

        {/* Live Preview */}
        <div className="lg:w-1/2 flex flex-col">
          <div className="sticky top-6 bg-background rounded-xl border shadow-sm h-[80vh] overflow-y-auto">
            <div className="bg-muted p-3 border-b text-sm font-semibold flex justify-between items-center sticky top-0 z-30">
              <span>Preview</span>
              <span className="text-xs font-normal text-muted-foreground">Tailwind Supported</span>
            </div>
            <div className="pb-10 relative">
              {/* Hero Header */}
              <header className="relative w-full h-[30vh] min-h-[250px] bg-background">
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent z-10" />
                <div className="absolute inset-0 flex flex-col justify-end z-20">
                  <div className="px-6 pb-6 w-full">
                    <div className="flex flex-wrap items-center gap-4 mb-3">
                      <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm border border-primary/20">
                        {formData.category}
                      </span>
                      <div className="flex items-center gap-2 text-muted-foreground text-xs font-medium">
                        <Calendar className="h-3 w-3" />
                        <span>{new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground text-xs font-medium">
                        <Eye className="h-3 w-3" />
                        <span>0</span>
                      </div>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-foreground leading-tight">
                      {formData.title || 'Your Title Here'}
                    </h1>
                  </div>
                </div>
              </header>

              {/* Media Preview */}
              {formData.type === 'magazine' ? (
                <div className="mt-6 px-6 w-full flex flex-col items-center border-t pt-6">
                  <h2 className="text-xl font-bold mb-4 text-center text-foreground">Interactive Magazine View</h2>
                  <div className="w-full flex justify-center bg-muted/20 p-4 rounded-xl border border-border">
                    <div className="flex flex-col items-center justify-center h-48 text-muted-foreground">
                      <LayoutTemplate className="w-10 h-10 mb-2 opacity-50" />
                      <span>{pdfFile ? pdfFile.name : 'Upload PDF to preview Magazine'}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mt-6 px-6 w-full mx-auto">
                  <div className="w-full rounded-2xl overflow-hidden relative aspect-video border shadow-sm">
                    {postImageFile ? (
                      <img src={URL.createObjectURL(postImageFile)} alt="Post Image Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-muted flex flex-col items-center justify-center">
                        <span className="text-muted-foreground text-sm">Upload Post Image</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Content Preview */}
              {formData.type !== 'magazine' && (
                <div className="px-6 mt-8">
                  <div className="prose prose-base dark:prose-invert prose-p:leading-relaxed prose-headings:font-bold prose-a:text-primary max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: formData.content }} />
                  </div>
                  {formData.tags && (
                    <div className="mt-8 pt-6 border-t flex flex-wrap gap-2">
                      <span className="font-semibold text-sm mr-2 flex items-center">Tags:</span>
                      {formData.tags.split(',').map(tag => tag.trim()).filter(Boolean).map(tag => (
                        <span key={tag} className="px-3 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
      )}
    </div>
  );
}

function ManagePosts() {
  const [posts, setPosts] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [activeTab, setActiveTab] = React.useState<'blog' | 'news' | 'magazine'>('blog');
  const [editingPostId, setEditingPostId] = React.useState<string | null>(null);
  const [editDate, setEditDate] = React.useState<string>('');

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/blogs');
      if (res.ok) {
        const data = await res.json();
        setPosts(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;
    
    try {
      const res = await fetch('/api/blog/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        fetchPosts(); // refresh list
      } else {
        const err = await res.json();
        alert('Failed to delete: ' + err.error);
      }
    } catch (e) {
      alert('Failed to delete post.');
    }
  };

  const handleEditDate = async (id: string) => {
    if (!editDate) return;
    try {
      const res = await fetch('/api/blog/update-date', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, newDate: new Date(editDate).toISOString() }),
      });
      if (res.ok) {
        setEditingPostId(null);
        fetchPosts();
      } else {
        const err = await res.json();
        alert('Failed to update date: ' + err.error);
      }
    } catch (e) {
      alert('Failed to update date.');
    }
  };

  const filteredPosts = posts.filter(p => (p.type || 'blog') === activeTab);

  return (
    <div className="bg-card p-6 rounded-xl border shadow-sm w-full">
      <h2 className="text-2xl font-bold mb-6">Manage Posts</h2>
      
      <div className="flex border-b mb-6">
        {(['blog', 'news', 'magazine'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 font-medium text-sm transition-colors relative ${activeTab === tab ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}s
            {activeTab === tab && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary" />
            )}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="py-12 text-center text-muted-foreground">Loading posts...</div>
      ) : filteredPosts.length === 0 ? (
        <div className="py-12 text-center text-muted-foreground bg-muted/20 rounded-lg border border-dashed">
          No {activeTab}s found.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted text-muted-foreground font-medium border-b">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3 w-32">Category</th>
                <th className="px-4 py-3 w-32">Date</th>
                <th className="px-4 py-3 w-24">Views</th>
                <th className="px-4 py-3 w-20 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredPosts.map(post => (
                <tr key={post.id} className="hover:bg-muted/50 transition-colors">
                  <td className="px-4 py-3 font-medium text-foreground max-w-[250px] truncate" title={post.title}>
                    {post.title}
                  </td>
                  <td className="px-4 py-3">
                    <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs whitespace-nowrap">
                      {post.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">
                    {editingPostId === post.id ? (
                      <input 
                        type="datetime-local" 
                        value={editDate} 
                        onChange={e => setEditDate(e.target.value)} 
                        className="border rounded-md px-2 py-1 text-xs bg-background text-foreground"
                      />
                    ) : (
                      new Date(post.date).toLocaleDateString()
                    )}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5" /> {post.views || 0}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      {editingPostId === post.id ? (
                        <>
                          <button onClick={() => handleEditDate(post.id)} className="text-green-500 hover:bg-green-500/10 p-2 rounded-md transition-colors" title="Save Date">
                            <Check className="w-4 h-4" />
                          </button>
                          <button onClick={() => setEditingPostId(null)} className="text-muted-foreground hover:bg-muted p-2 rounded-md transition-colors" title="Cancel">
                            <X className="w-4 h-4" />
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => {
                            setEditingPostId(post.id);
                            const d = new Date(post.date);
                            const tzOffset = d.getTimezoneOffset() * 60000;
                            const localISOTime = new Date(d.getTime() - tzOffset).toISOString().slice(0, 16);
                            setEditDate(localISOTime);
                          }}
                          className="text-blue-500 hover:bg-blue-500/10 p-2 rounded-md transition-colors inline-flex items-center justify-center"
                          title="Edit Date"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(post.id, post.title)}
                        className="text-red-500 hover:bg-red-500/10 p-2 rounded-md transition-colors inline-flex items-center justify-center"
                        title="Delete Post"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
