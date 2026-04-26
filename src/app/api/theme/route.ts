import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { ThemeConfig } from '@/lib/theme-data';

import { revalidatePath } from 'next/cache';

export async function POST(request: Request) {
  try {
    const config: ThemeConfig = await request.json();
    
    // Validate we have a basic structure
    if (!config || !config.header || !config.card) {
      return NextResponse.json({ error: 'Invalid config structure' }, { status: 400 });
    }

    const filePath = path.join(process.cwd(), 'theme-config.json');
    fs.writeFileSync(filePath, JSON.stringify(config, null, 2), 'utf-8');

    // Trigger re-render of layout to apply the new theme
    revalidatePath('/', 'layout');

    return NextResponse.json({ success: true, message: 'Theme updated successfully' });
  } catch (error) {
    console.error('Error saving theme:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'theme-config.json');
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf-8');
      return NextResponse.json(JSON.parse(data));
    }
    return NextResponse.json({ error: 'No theme config found' }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
