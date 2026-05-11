import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json({ error: 'Missing blog ID' }, { status: 400 });
    }

    // 1. Try to remove from data/blogs.json (for dynamically created posts)
    let dynamicPosts = [];
    const blogsPath = path.join(process.cwd(), 'data', 'blogs.json');
    try {
      const blogsData = await fs.readFile(blogsPath, 'utf-8');
      dynamicPosts = JSON.parse(blogsData);
    } catch (e) {}

    const initialLength = dynamicPosts.length;
    dynamicPosts = dynamicPosts.filter((b: any) => b.id !== id);

    if (dynamicPosts.length < initialLength) {
      // It was a dynamically created post and was removed
      await fs.writeFile(blogsPath, JSON.stringify(dynamicPosts, null, 2), 'utf-8');
    } else {
      // 2. It must be an initial/hardcoded post. Add to data/deleted_ids.json
      let deletedIds: string[] = [];
      const deletedPath = path.join(process.cwd(), 'data', 'deleted_ids.json');
      try {
        const deletedData = await fs.readFile(deletedPath, 'utf-8');
        deletedIds = JSON.parse(deletedData);
      } catch (e) {}

      if (!deletedIds.includes(id)) {
        deletedIds.push(id);
        await fs.writeFile(deletedPath, JSON.stringify(deletedIds, null, 2), 'utf-8');
      }
    }

    // Trigger revalidate so the UI updates
    revalidatePath('/', 'layout');

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting blog:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
