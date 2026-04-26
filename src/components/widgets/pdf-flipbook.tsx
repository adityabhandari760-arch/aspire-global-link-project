'use client';

import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import HTMLFlipBook from 'react-pageflip';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';

// Set worker URL using the recommended method
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PdfFlipbookProps {
  fileUrl: string;
}

const PageComponent = React.forwardRef<HTMLDivElement, { pageNumber: number; currentPage: number }>((props, ref) => {
  const [hasRendered, setHasRendered] = React.useState(false);
  const isVisible = Math.abs(props.pageNumber - props.currentPage - 1) <= 4;
  
  React.useEffect(() => {
    if (isVisible && !hasRendered) {
      setHasRendered(true);
    }
  }, [isVisible, hasRendered]);

  return (
    <div ref={ref} className="bg-white overflow-hidden flex items-center justify-center relative shadow-lg">
      {(hasRendered || isVisible) ? (
        <Page
          pageNumber={props.pageNumber}
          renderTextLayer={false}
          renderAnnotationLayer={false}
          width={450}
          className="pointer-events-none w-full h-full flex flex-col justify-center items-center [&>.react-pdf__Page__canvas]:!w-full [&>.react-pdf__Page__canvas]:!h-full [&>.react-pdf__Page__canvas]:!object-fill"
        />
      ) : (
        <div className="flex animate-pulse items-center justify-center w-full h-full bg-muted/10">
          <span className="text-muted-foreground text-xs font-semibold opacity-30 mt-auto mb-10">PAGE {props.pageNumber}</span>
        </div>
      )}
    </div>
  );
});

PageComponent.displayName = 'PageComponent';

export function PdfFlipbook({ fileUrl }: PdfFlipbookProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [orientation, setOrientation] = useState<'landscape' | 'portrait'>('landscape');

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  const handleFlip = (e: any) => {
    setCurrentPage(e.data);
  };

  const handleOrientationChange = (e: any) => {
    setOrientation(e.data);
  };

  const currentTransform = React.useMemo(() => {
    if (orientation === 'portrait') return 'translateX(0)'; // Portrait handles centering natively!
    if (currentPage === 0) return 'translateX(-25%)';
    if (currentPage >= numPages - 1) return 'translateX(25%)';
    return 'translateX(0)';
  }, [orientation, currentPage, numPages]);

  // Prevent drag and right-click
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  return (
    <div
      className="flex flex-col items-center justify-center w-full min-h-[700px] py-10 no-print user-select-none"
      onContextMenu={handleContextMenu}
      style={{ userSelect: 'none' }}
    >
      <Document
        file={fileUrl}
        onLoadSuccess={onDocumentLoadSuccess}
        className="flex justify-center w-full max-w-4xl"
        loading={
          <div className="flex items-center justify-center h-[565px] animate-pulse text-muted-foreground">
            Loading Document...
          </div>
        }
      >
        {numPages > 0 && (
          // @ts-ignore - Types for HTMLFlipBook are incomplete
          <HTMLFlipBook
            width={400}
            height={565}
            size="stretch"
            minWidth={300}
            maxWidth={600}
            minHeight={424}
            maxHeight={848}
            maxShadowOpacity={0.5}
            showCover={true}
            usePortrait={true}
            mobileScrollSupport={true}
            onFlip={handleFlip}
            onChangeOrientation={handleOrientationChange}
            flippingTime={1000}
            className="mx-auto transition-transform duration-[1000ms] ease-in-out"
            style={{ 
              margin: '0 auto',
              transform: currentTransform
            }}
          >
            {Array.from(new Array(numPages), (_, index) => (
              <PageComponent key={`page_${index + 1}`} pageNumber={index + 1} currentPage={currentPage} />
            ))}
          </HTMLFlipBook>
        )}
      </Document>
    </div>
  );
}
