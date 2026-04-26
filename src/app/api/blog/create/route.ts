import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import fs from 'fs/promises';
import path from 'path';

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
      return `/${folder}/${fileName}`;
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

    // Read and manipulate data.ts
    const dataFilePath = path.join(process.cwd(), 'src', 'lib', 'data.ts');
    let dataContents = await fs.readFile(dataFilePath, 'utf-8');

    // We'll locate the end of the `export const blogs: Blog[] = [` array.
    // Ensure we only look before the next export starts so we don't accidentally append to categories or tags.
    const categoriesIndex = dataContents.indexOf('export const categories');
    if (categoriesIndex === -1) {
      return NextResponse.json({ error: 'Could not find export const categories' }, { status: 500 });
    }
    
    const beforeCategories = dataContents.substring(0, categoriesIndex);
    const arrayEndIndex = beforeCategories.lastIndexOf('];');
    
    if (arrayEndIndex === -1) {
      return NextResponse.json({ error: 'Could not find the end of the blogs array in data.ts' }, { status: 500 });
    }

    let beforeEnd = dataContents.substring(0, arrayEndIndex).trimEnd();
    const afterEnd = dataContents.substring(arrayEndIndex);
    
    // Check if the previous item already has a trailing comma
    if (!beforeEnd.endsWith(',')) {
        beforeEnd += ',';
    }

    // Add new blog item
    const modifiedContents = `${beforeEnd}\n${newBlogString}\n${afterEnd}`;

    await fs.writeFile(dataFilePath, modifiedContents, 'utf-8');

    // Trigger revalidate so the UI updates
    revalidatePath('/', 'layout');

    return NextResponse.json({ success: true, blog: newBlog });

  } catch (error: any) {
    console.error('Error creating blog:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
