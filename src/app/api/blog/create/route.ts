import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import fs from 'fs/promises';
import path from 'path';
import { blogs } from '@/lib/data';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    
    // Parse form fields
    const title = formData.get('title') as string;
    const excerpt = formData.get('excerpt') as string;
    const category = formData.get('category') as string;
    const tagsRaw = formData.get('tags') as string;
    const content = formData.get('content') as string;
    let type = formData.get('type') as string;
    
    const coverImageFile = formData.get('coverImageFile') as File | null;
    const postImageFile = formData.get('postImageFile') as File | null;
    const pdfFile = formData.get('pdfFile') as File | null;

    if (!title || !category) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    // For blog/news, excerpt and content are strictly required
    const isMagazine = pdfFile !== null || (formData.get('type') as string) === 'magazine';
    if (!isMagazine && (!excerpt || !content || !postImageFile)) {
      return NextResponse.json({ error: 'Missing required fields (excerpt, content, postImage)' }, { status: 400 });
    }

    const tags = tagsRaw ? tagsRaw.split(',').map(t => t.trim()).filter(Boolean) : [];
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const id = Date.now().toString();

    const saveFile = async (file: File, folder: string) => {
      const buffer = Buffer.from(await file.arrayBuffer());
      const fileName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.\-_]/g, '')}`;
      
      const isProd = process.env.NODE_ENV === 'production';
      const baseDir = isProd ? '/tmp' : path.join(process.cwd(), 'public');
      const dirPath = path.join(baseDir, folder);
      
      await fs.mkdir(dirPath, { recursive: true });
      await fs.writeFile(path.join(dirPath, fileName), buffer);
      
      return isProd ? `/api/file/${folder}/${fileName}` : `/${folder}/${fileName}`;
    };

    let pdfUrl = undefined;
    let coverImage = '';
    let postImage = undefined;

    // Handle Uploads
    if (coverImageFile) {
      coverImage = await saveFile(coverImageFile, 'images');
    }
    if (postImageFile) {
      postImage = await saveFile(postImageFile, 'images');
    }
    if (pdfFile) {
      pdfUrl = await saveFile(pdfFile, 'pdf');
      type = 'magazine'; // Automatically set as magazine if a PDF is uploaded
    }
    
    if (!type) {
      type = 'blog';
    }

    // Build the blog object to insert
    const newBlog = {
      id,
      slug,
      type,
      title,
      excerpt,
      content,
      coverImage,
      date: new Date().toISOString(),
      category,
      tags,
      author: {
        name: "Admin User",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop"
      },
      ...(pdfUrl ? { pdfUrl } : {}),
      ...(postImage ? { postImage } : {})
    };

    // Serialize object to string to inject into the TS file
    const newBlogString = JSON.stringify(newBlog, null, 4);

    // Always try to write to data.ts first (works for local development and non-read-only production environments like VPS)
    let dataWritten = false;
    try {
      const dataFilePath = path.join(process.cwd(), 'src', 'lib', 'data.ts');
      let dataContents = await fs.readFile(dataFilePath, 'utf-8');

      const proxyIndex = dataContents.indexOf('export const blogs: Blog[] = new Proxy');
      if (proxyIndex !== -1) {
        const arrayEndIndex = dataContents.lastIndexOf('];', proxyIndex);
        
        if (arrayEndIndex !== -1) {
          let beforeEnd = dataContents.substring(0, arrayEndIndex).trimEnd();
          const afterEnd = dataContents.substring(arrayEndIndex);
          
          if (!beforeEnd.endsWith(',')) {
              beforeEnd += ',';
          }

          const modifiedContents = `${beforeEnd}\n${newBlogString}\n${afterEnd}`;
          await fs.writeFile(dataFilePath, modifiedContents, 'utf-8');
          dataWritten = true;
        }
      }
    } catch (err) {
      console.warn('Could not write to data.ts, falling back to tmpdir:', err);
    }

    // Always write to os.tmpdir() so the running production app (Proxy) can dynamically see the new post instantly!
    try {
      const os = require('os');
      const tmpPath = path.join(os.tmpdir(), 'blogs.json');
      let current = [];
      try {
        const tmpData = await fs.readFile(tmpPath, 'utf-8');
        current = JSON.parse(tmpData);
      } catch(e) {}
      current.unshift(newBlog);
      await fs.writeFile(tmpPath, JSON.stringify(current));
    } catch(e) {
      console.error('Failed to save to tmp', e);
    }

    // Trigger revalidate so the UI updates
    revalidatePath('/', 'layout');

    return NextResponse.json({ success: true, blog: newBlog });

  } catch (error: any) {
    console.error('Error creating blog:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
