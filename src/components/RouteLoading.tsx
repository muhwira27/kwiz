"use client";

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useRouteChangeEvents } from 'nextjs-router-events';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function RouteLoading() {
  const [navigating, setNavigating] = useState(false);

  useRouteChangeEvents({
    onRouteChangeStart: () => setNavigating(true),
    onRouteChangeComplete: () => setNavigating(false),
  });

  // Safety: hide spinner after max 10s in case of error
  useEffect(() => {
    if (!navigating) return;
    const t = setTimeout(() => setNavigating(false), 10000);
    return () => clearTimeout(t);
  }, [navigating]);

  if (!navigating) return null;
  if (typeof window === 'undefined') return null;
  // Render overlay at document.body level so it covers sidebar + content
  return createPortal(<LoadingSpinner />, document.body);
}
