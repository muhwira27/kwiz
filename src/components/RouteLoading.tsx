"use client";

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function RouteLoading({ text }: { text?: string }) {
  const [navigating, setNavigating] = useState(false);

  useEffect(() => {
    const ac = new AbortController();
    const start = () => setNavigating(true);
    const end = () => setNavigating(false);
    // Listen only to start/end events; DO NOT handle before-route events to avoid auto-allowing confirms
    window.addEventListener('routeChangeStartEvent', start, {
      signal: ac.signal,
    } as any);
    window.addEventListener('routeChangeEndEvent', end, {
      signal: ac.signal,
    } as any);
    return () => ac.abort();
  }, []);

  // Safety: hide spinner after max 10s in case of error
  useEffect(() => {
    if (!navigating) return;
    const t = setTimeout(() => setNavigating(false), 10000);
    return () => clearTimeout(t);
  }, [navigating]);

  if (!navigating) return null;
  if (typeof window === 'undefined') return null;
  // Render overlay at document.body level so it covers sidebar + content
  return createPortal(<LoadingSpinner text={text} />, document.body);
}
