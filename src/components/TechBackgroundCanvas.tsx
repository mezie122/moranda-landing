'use client';

import React, { useEffect, useRef } from 'react';

export default function TechBackgroundCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    // State timer: toggles every 60 seconds (60000 ms)
    let stateStartTime = Date.now();
    let isAiHeadState = false;

    // 1. CPU Component & Calculation Data Packets
    const cpuNodes = Array.from({ length: 18 }, () => ({
      x: Math.random() * (width * 0.6) + width * 0.2,
      y: Math.random() * (height * 0.7) + height * 0.15,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 20 + 15,
    }));

    const dataPackets = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      speedY: Math.random() * 2 + 1,
      text: [
        '2 + 2 = 4', 'CPU 3.8GHz', 'RAM 32GB', 'COMPILE SUCCESS', 
        'AI_MODEL.load()', '01011001', 'GPU_RENDER()', 'API_FETCH()',
        'MATRIX_MUL', 'EXEC_THREAD', 'CACHE_HIT', 'PARALLEL_PROC'
      ][Math.floor(Math.random() * 12)],
      opacity: Math.random() * 0.6 + 0.2,
    }));

    // 2. AI Human Neural Head Particle Matrix
    // Generate silhouette points forming a human head profile structure
    const headParticles = Array.from({ length: 90 }, () => {
      const angle = Math.random() * Math.PI * 2;
      const r = Math.random() * 110 + 20;
      return {
        baseX: width / 2 + Math.cos(angle) * r * 0.8,
        baseY: height / 2 + Math.sin(angle) * r - 10,
        angle,
        radius: r,
        speed: Math.random() * 0.02 + 0.01,
        size: Math.random() * 2.5 + 1,
      };
    });

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Check state toggle every 60 seconds
      const elapsed = Date.now() - stateStartTime;
      if (elapsed > 60000) {
        isAiHeadState = !isAiHeadState;
        stateStartTime = Date.now();
      }

      if (!isAiHeadState) {
        // --- STATE 1: CPU COMPONENT & CALCULATION DISCHARGE ---
        
        // Draw CPU Chip Core in center
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
        ctx.lineWidth = 2;
        ctx.strokeRect(width / 2 - 60, height / 2 - 60, 120, 120);
        ctx.fillStyle = 'rgba(56, 189, 248, 0.08)';
        ctx.fillRect(width / 2 - 60, height / 2 - 60, 120, 120);

        ctx.fillStyle = '#38bdf8';
        ctx.font = 'bold 12px monospace';
        ctx.fillText('CPU CORE v8', width / 2 - 42, height / 2 - 5);

        // Draw circuit connections between CPU nodes
        cpuNodes.forEach((node, i) => {
          node.x += node.vx;
          node.y += node.vy;
          if (node.x < 50 || node.x > width - 50) node.vx *= -1;
          if (node.y < 50 || node.y > height - 50) node.vy *= -1;

          // Connect to center core
          ctx.beginPath();
          ctx.moveTo(width / 2, height / 2);
          ctx.lineTo(node.x, node.y);
          ctx.strokeStyle = 'rgba(56, 189, 248, 0.15)';
          ctx.lineWidth = 1;
          ctx.stroke();

          // Draw component node box
          ctx.strokeStyle = 'rgba(129, 140, 248, 0.5)';
          ctx.strokeRect(node.x - node.size / 2, node.y - node.size / 2, node.size, node.size);
        });

        // Floating Calculation & Component Data Streams
        dataPackets.forEach((packet) => {
          packet.y -= packet.speedY;
          if (packet.y < 0) {
            packet.y = height + 10;
            packet.x = Math.random() * width;
          }

          ctx.fillStyle = `rgba(56, 189, 248, ${packet.opacity})`;
          ctx.font = '11px monospace';
          ctx.fillText(packet.text, packet.x, packet.y);
        });

      } else {
        // --- STATE 2: HUMAN AI NEURAL HEAD COGNITION ---
        
        const centerX = width / 2;
        const centerY = height / 2 - 10;
        const time = Date.now() * 0.002;

        // Draw Neural Head Hologram Nodes
        headParticles.forEach((p, idx) => {
          p.angle += p.speed;
          const x = centerX + Math.cos(p.angle + time) * (p.radius * 0.9);
          const y = centerY + Math.sin(p.angle * 0.8) * (p.radius * 1.1);

          ctx.beginPath();
          ctx.arc(x, y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(168, 85, 247, 0.7)'; // AI Purple Glow
          ctx.fill();

          // Connect neural pathways
          for (let j = idx + 1; j < idx + 4 && j < headParticles.length; j++) {
            const p2 = headParticles[j];
            const x2 = centerX + Math.cos(p2.angle + time) * (p2.radius * 0.9);
            const y2 = centerY + Math.sin(p2.angle * 0.8) * (p2.radius * 1.1);

            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x2, y2);
            ctx.strokeStyle = 'rgba(168, 85, 247, 0.2)';
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        });

        // AI Head Status Text
        ctx.fillStyle = 'rgba(216, 180, 254, 0.9)';
        ctx.font = 'bold 13px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('🧠 AI NEURAL COGNITION ACTIVE', centerX, centerY + 140);
        ctx.textAlign = 'left';
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0 opacity-85"
    />
  );
}