import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET(request: Request, { params }: { params: Promise<{ folder: string, filename: string }> }) {
  try {
    const isProd = process.env.NODE_ENV === 'production';
    if (!isProd) {
      return NextResponse.json({ error: 'Only used in production' }, { status: 404 });
    }
    
    // Unpack params from promise
    const { folder, filename } = await params;
    
    const filePath = path.join('/tmp', folder, filename);
    const fileBuffer = await fs.readFile(filePath);
    
    // Determine content type
    const ext = path.extname(filename).toLowerCase();
    let contentType = 'application/octet-stream';
    if (ext === '.jpg' || ext === '.jpeg') contentType = 'image/jpeg';
    else if (ext === '.png') contentType = 'image/png';
    else if (ext === '.gif') contentType = 'image/gif';
    else if (ext === '.webp') contentType = 'image/webp';
    else if (ext === '.pdf') contentType = 'application/pdf';

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000',
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'File not found' }, { status: 404 });
  }
}
