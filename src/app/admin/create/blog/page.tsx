'use client';

import React, { useState } from 'react';
import { ThemeCustomizer } from '@/components/admin/theme-customizer';
import { LayoutTemplate, PlusCircle, ArrowLeft, Download } from 'lucide-react';

export default function AdminBlogCreatePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [action, setAction] = useState<'selection' | 'post' | 'theme'>('selection');
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
          
          <a 
            href="/api/export" 
            download
            className="p-8 border rounded-xl bg-card hover:bg-muted/50 hover:shadow-md transition-all flex flex-col items-center justify-center gap-4 group md:col-span-2"
          >
            <div className="bg-green-500/10 p-5 rounded-full group-hover:bg-green-500/20 transition-colors text-green-500">
              <Download className="w-10 h-10" />
            </div>
            <span className="text-xl font-bold">Export Data</span>
            <p className="text-sm text-muted-foreground text-center">Download a full JSON backup of all blogs, news, and magazines.</p>
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
          <div className="sticky top-6 bg-background rounded-xl border shadow-sm h-fit overflow-hidden">
            <div className="bg-muted p-3 border-b text-sm font-semibold flex justify-between items-center">
              <span>Preview</span>
              <span className="text-xs font-normal text-muted-foreground">Tailwind Supported</span>
            </div>
            <div className="p-6 prose prose-lg dark:prose-invert prose-p:leading-relaxed prose-headings:font-bold prose-a:text-primary max-w-none">
              <div dangerouslySetInnerHTML={{ __html: formData.content }} />
            </div>
          </div>
        </div>

      </div>
      )}
    </div>
  );
}
