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

    const dataFilePath = path.join(process.cwd(), 'src', 'lib', 'data.ts');
    const dataContents = await fs.readFile(dataFilePath, 'utf-8');

    // Find the array block safely
    const prefix = 'export const blogs: Blog[] = ';
    const arrayStartIndex = dataContents.indexOf(prefix);
    if (arrayStartIndex === -1) {
      return NextResponse.json({ error: 'Could not find blogs array' }, { status: 500 });
    }

    const startOfArray = arrayStartIndex + prefix.length;
    const categoriesIndex = dataContents.indexOf('export const categories');
    
    // Find the closing bracket of the blogs array
    const endOfArrayRaw = dataContents.lastIndexOf('];', categoriesIndex);
    if (endOfArrayRaw === -1) {
      return NextResponse.json({ error: 'Could not find the end of the blogs array' }, { status: 500 });
    }
    const endOfArray = endOfArrayRaw + 1; // include the ']'

    const arrayString = dataContents.substring(startOfArray, endOfArray);
    
    let blogs;
    try {
      blogs = JSON.parse(arrayString);
    } catch (e) {
      console.error("Failed to parse blogs JSON from data.ts", e);
      return NextResponse.json({ error: 'Corruption in data file structure' }, { status: 500 });
    }

    let found = false;
    for (let i = 0; i < blogs.length; i++) {
        if (blogs[i].id === id) {
            blogs[i].views = (blogs[i].views || 0) + 1;
            found = true;
            break;
        }
    }

    if (!found) {
        return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    // Reconstruct the file with the updated array
    const newArrayString = JSON.stringify(blogs, null, 2);
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
