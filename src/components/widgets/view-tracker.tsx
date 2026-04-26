"use client";

import { useEffect, useRef } from "react";

interface ViewTrackerProps {
  id: string;
}

export function ViewTracker({ id }: ViewTrackerProps) {
  const tracked = useRef(false);

  useEffect(() => {
    // Only track once per component lifecycle
    if (tracked.current) return;

    const timer = setTimeout(async () => {
      tracked.current = true;
      try {
        await fetch("/api/views", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        });
      } catch (error) {
        console.error("Failed to track view:", error);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [id]);

  return null; // This component is invisible
}
