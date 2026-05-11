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
      
      const dirPath = path.join(process.cwd(), 'public', folder);
      
      await fs.mkdir(dirPath, { recursive: true });
      await fs.writeFile(path.join(dirPath, fileName), buffer);
      
      return `/api/file/${folder}/${fileName}`;
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

    // Save to persistent data/blogs.json
    try {
      const dataFilePath = path.join(process.cwd(), 'data', 'blogs.json');
      let current = [];
      try {
        const fileData = await fs.readFile(dataFilePath, 'utf-8');
        current = JSON.parse(fileData);
      } catch (err) {
        // file might not exist or is empty
      }
      current.unshift(newBlog);
      await fs.writeFile(dataFilePath, JSON.stringify(current, null, 2), 'utf-8');
    } catch (err) {
      console.error('Failed to save to data/blogs.json', err);
    }

    // Trigger revalidate so the UI updates
    revalidatePath('/', 'layout');

    return NextResponse.json({ success: true, blog: newBlog });

  } catch (error: any) {
    console.error('Error creating blog:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
