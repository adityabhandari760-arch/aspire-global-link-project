import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import fs from 'fs/promises';
import path from 'path';
import { blogs } from '@/lib/data';

export async function POST(request: Request) {
  try {
    const { id, newDate } = await request.json();

    if (!id || !newDate) {
      return NextResponse.json({ error: 'Missing blog ID or date' }, { status: 400 });
    }

    // Find the post
    const post = blogs.find(b => b.id === id);
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    // Create updated post object
    const updatedPost = { ...post, date: newDate };

    // Read existing dynamic posts
    const blogsPath = path.join(process.cwd(), 'data', 'blogs.json');
    let dynamicPosts = [];
    try {
      const blogsData = await fs.readFile(blogsPath, 'utf-8');
      dynamicPosts = JSON.parse(blogsData);
    } catch (e) {}

    // Check if it's already in dynamic posts
    const existingIndex = dynamicPosts.findIndex((b: any) => b.id === id);
    if (existingIndex >= 0) {
      dynamicPosts[existingIndex] = updatedPost;
    } else {
      // It was a hardcoded post. Pushing it to dynamic posts will override the hardcoded one!
      dynamicPosts.unshift(updatedPost);
    }

    await fs.writeFile(blogsPath, JSON.stringify(dynamicPosts, null, 2), 'utf-8');

    // Trigger revalidate so the UI updates
    revalidatePath('/', 'layout');

    return NextResponse.json({ success: true, post: updatedPost });
  } catch (error: any) {
    console.error('Error updating blog date:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
