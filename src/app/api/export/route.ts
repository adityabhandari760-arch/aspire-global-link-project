import { NextResponse } from 'next/server';
import { blogs, categories } from '@/lib/data';

export async function GET() {
  try {
    const exportData = {
      blogs,
      categories,
      version: '1.0',
      exportDate: new Date().toISOString()
    };

    return new NextResponse(JSON.stringify(exportData, null, 2), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': 'attachment; filename="marketing_blog_backup.json"',
      },
    });
  } catch (error) {
    console.error('Export error:', error);
    return NextResponse.json({ error: 'Failed to export data' }, { status: 500 });
  }
}
