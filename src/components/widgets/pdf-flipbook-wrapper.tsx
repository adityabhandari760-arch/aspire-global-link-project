'use client';

import dynamic from 'next/dynamic';

const PdfFlipbook = dynamic(
  () => import('./pdf-flipbook').then((mod) => mod.PdfFlipbook),
  { ssr: false }
);

interface Props {
  fileUrl: string;
}

export function PdfFlipbookWrapper({ fileUrl }: Props) {
  return <PdfFlipbook fileUrl={fileUrl} />;
}
