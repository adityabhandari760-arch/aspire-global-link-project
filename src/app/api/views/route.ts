import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ error: 'Missing blog id' }, { status: 400 });
    }

    const isProd = process.env.NODE_ENV === 'production';
    if (isProd) {
      const { blogs } = await import('@/lib/data');
      const blog = blogs.find((b: any) => b.id === id);
      if (blog) {
          blog.views = (blog.views || 0) + 1;
          
          // Try to update os.tmpdir() + /blogs.json if it's a newly created blog
          try {
            const os = require('os');
            const tmpPath = require('path').join(os.tmpdir(), 'blogs.json');
            const tmpData = await fs.readFile(tmpPath, 'utf-8');
            const current = JSON.parse(tmpData);
            const tmpBlog = current.find((b: any) => b.id === id);
            if (tmpBlog) {
              tmpBlog.views = (tmpBlog.views || 0) + 1;
              await fs.writeFile(tmpPath, JSON.stringify(current));
            }
          } catch(e) {}
          
          return NextResponse.json({ success: true, message: 'View recorded' });
      }
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    const dataFilePath = path.join(process.cwd(), 'src', 'lib', 'data.ts');
    const dataContents = await fs.readFile(dataFilePath, 'utf-8');

    // Find the array block safely (updated to match new data.ts structure)
    const prefix = 'const initialBlogs: Blog[] = ';
    const arrayStartIndex = dataContents.indexOf(prefix);
    if (arrayStartIndex === -1) {
      return NextResponse.json({ error: 'Could not find blogs array' }, { status: 500 });
    }

    const startOfArray = arrayStartIndex + prefix.length;
    const proxyIndex = dataContents.indexOf('export const blogs: Blog[] = new Proxy');
    
    // Find the closing bracket of the initialBlogs array
    const endOfArrayRaw = dataContents.lastIndexOf('];', proxyIndex);
    if (endOfArrayRaw === -1) {
      return NextResponse.json({ error: 'Could not find the end of the blogs array' }, { status: 500 });
    }
    const endOfArray = endOfArrayRaw + 1; // include the ']'

    const arrayString = dataContents.substring(startOfArray, endOfArray);
    
    let blogsList;
    try {
      blogsList = JSON.parse(arrayString);
    } catch (e) {
      console.error("Failed to parse blogs JSON from data.ts", e);
      return NextResponse.json({ error: 'Corruption in data file structure' }, { status: 500 });
    }

    let found = false;
    for (let i = 0; i < blogsList.length; i++) {
        if (blogsList[i].id === id) {
            blogsList[i].views = (blogsList[i].views || 0) + 1;
            found = true;
            break;
        }
    }

    if (!found) {
        return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    // Reconstruct the file with the updated array
    const newArrayString = JSON.stringify(blogsList, null, 2);
    const before = dataContents.substring(0, startOfArray);
    const after = dataContents.substring(endOfArray);
    
    await fs.writeFile(dataFilePath, before + newArrayString + after, 'utf-8');

    // Trigger revalidate so the UI updates globally across routes using layout caching
    revalidatePath('/', 'layout');

    return NextResponse.json({ success: true, message: 'View recorded' });

  } catch (error: any) {
    console.error('Error tracking view:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
