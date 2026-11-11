"use client";

import { useEffect, useRef } from 'react';

export default function WebGLBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Three.js / WebGL code runs here safely in the browser
  }, []);

  return <div ref={containerRef} className="absolute inset-0 pointer-events-none" />;
}