"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { motion, useReducedMotion } from "framer-motion";

type Point = { x: number; y: number };

// Shared geometry — both the entrance animation and the interactive mode
// use the exact same coordinates, so the switch between them is invisible.
const BASE_NODES: Point[] = [
  { x: 40, y: 210 },
  { x: 120, y: 140 },
  { x: 210, y: 190 },
  { x: 290, y: 100 },
  { x: 360, y: 160 },
  { x: 430, y: 80 },
  { x: 300, y: 220 },
  { x: 180, y: 260 },
];

const EDGES: [number, number][] = [
  [0, 1],
  [1, 2],
  [1, 3],
  [2, 4],
  [3, 5],
  [3, 4],
  [2, 6],
  [6, 7],
  [0, 7],
];

const HUB_INDEX = 5; // the larger, accent-colored node
const VIEW_W = 480;
const VIEW_H = 320;
const SCATTER_RADIUS = 95; // how close the cursor must get to push a node
const SCATTER_FORCE = 9; // how hard nearby nodes get pushed
const SPRING_STIFFNESS = 0.085; // pull back toward resting position
const DAMPING = 0.82;

export function HorizonGraphic() {
  const prefersReducedMotion = useReducedMotion();
  const svgRef = useRef<SVGSVGElement>(null);

  // Phase 1: the original draw-in entrance. Phase 2: live physics.
  const [interactive, setInteractive] = useState(false);
  const [positions, setPositions] = useState<Point[]>(BASE_NODES);

  const positionsRef = useRef<Point[]>(BASE_NODES);
  const velocities = useRef<Point[]>(BASE_NODES.map(() => ({ x: 0, y: 0 })));
  const mouseRef = useRef<Point | null>(null);
  const dragIndexRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    positionsRef.current = positions;
  }, [positions]);

  // Hand off from the entrance animation to interactive mode once the
  // draw-in has visually finished.
  useEffect(() => {
    const delay = prefersReducedMotion ? 0 : 1500;
    const timer = setTimeout(() => setInteractive(true), delay);
    return () => clearTimeout(timer);
  }, [prefersReducedMotion]);

  const toSvgPoint = useCallback((clientX: number, clientY: number): Point | null => {
    const svg = svgRef.current;
    if (!svg) return null;
    const rect = svg.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return null;
    return {
      x: ((clientX - rect.left) / rect.width) * VIEW_W,
      y: ((clientY - rect.top) / rect.height) * VIEW_H,
    };
  }, []);

  // The physics loop: every node is either (a) being dragged, in which case
  // it follows the cursor exactly, or (b) free, in which case it springs
  // toward its resting position while getting pushed away if the cursor
  // passes near it.
  useEffect(() => {
    if (!interactive) return;

    const tick = () => {
      const current = positionsRef.current;
      const mouse = mouseRef.current;
      const dragIndex = dragIndexRef.current;

      const next = current.map((pos, i) => {
        if (dragIndex === i && mouse) {
          velocities.current[i] = { x: 0, y: 0 };
          return mouse;
        }

        const base = BASE_NODES[i];
        const vel = velocities.current[i];

        let ax = (base.x - pos.x) * SPRING_STIFFNESS;
        let ay = (base.y - pos.y) * SPRING_STIFFNESS;

        if (mouse && !prefersReducedMotion) {
          const dx = pos.x - mouse.x;
          const dy = pos.y - mouse.y;
          const dist = Math.hypot(dx, dy) || 1;
          if (dist < SCATTER_RADIUS) {
            const push = (1 - dist / SCATTER_RADIUS) * SCATTER_FORCE;
            ax += (dx / dist) * push;
            ay += (dy / dist) * push;
          }
        }

        vel.x = (vel.x + ax) * DAMPING;
        vel.y = (vel.y + ay) * DAMPING;

        return { x: pos.x + vel.x, y: pos.y + vel.y };
      });

      positionsRef.current = next;
      setPositions(next);
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [interactive, prefersReducedMotion]);

  const handlePointerMove = (e: ReactPointerEvent<SVGSVGElement>) => {
    mouseRef.current = toSvgPoint(e.clientX, e.clientY);
  };

  const handlePointerLeave = () => {
    mouseRef.current = null;
    dragIndexRef.current = null;
  };

  const handlePointerUp = () => {
    dragIndexRef.current = null;
  };

  const handleNodePointerDown =
    (i: number) => (e: ReactPointerEvent<SVGCircleElement>) => {
      e.stopPropagation();
      e.currentTarget.setPointerCapture(e.pointerId);
      dragIndexRef.current = i;
      mouseRef.current = toSvgPoint(e.clientX, e.clientY);
    };

  if (!interactive) {
    return <EntranceGraphic />;
  }

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      className="h-auto w-full max-w-md touch-none"
      role="img"
      aria-label="Interactive illustration of connected nodes representing an agent network. Move your cursor nearby to scatter them, or drag a node."
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerUp={handlePointerUp}
    >
      <line x1="0" y1="290" x2={VIEW_W} y2="290" stroke="#2A2924" strokeWidth="1" />

      {EDGES.map(([a, b]) => {
        const n1 = positions[a];
        const n2 = positions[b];
        return (
          <line
            key={`${a}-${b}`}
            x1={n1.x}
            y1={n1.y}
            x2={n2.x}
            y2={n2.y}
            stroke="#F5C518"
            strokeWidth="1.25"
            strokeOpacity="0.5"
          />
        );
      })}

      {positions.map((n, i) => (
        <circle
          key={i}
          cx={n.x}
          cy={n.y}
          r={i === HUB_INDEX ? 7 : 4.5}
          fill={i === HUB_INDEX ? "#F5C518" : "#F5F5F0"}
          onPointerDown={handleNodePointerDown(i)}
          className="cursor-grab active:cursor-grabbing"
        />
      ))}
    </svg>
  );
}

// The original one-time draw-in: lines trace in, then nodes pop. Shown for
// the first ~1.5s before control hands off to the interactive version above.
function EntranceGraphic() {
  return (
    <svg
      viewBox="0 0 480 320"
      className="h-auto w-full max-w-md"
      role="img"
      aria-label="Illustration of connected nodes representing an agent network"
    >
      <line x1="0" y1="290" x2="480" y2="290" stroke="#2A2924" strokeWidth="1" />

      {EDGES.map(([a, b], i) => {
        const n1 = BASE_NODES[a];
        const n2 = BASE_NODES[b];
        const length = Math.hypot(n2.x - n1.x, n2.y - n1.y) * 1.2 + 20;
        return (
          <motion.line
            key={`${a}-${b}`}
            x1={n1.x}
            y1={n1.y}
            x2={n2.x}
            y2={n2.y}
            stroke="#F5C518"
            strokeWidth="1.25"
            strokeOpacity="0.55"
            strokeDasharray={length}
            initial={{ strokeDashoffset: length }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 1.1, delay: 0.4 + i * 0.09, ease: "easeOut" }}
          />
        );
      })}

      {BASE_NODES.map((n, i) => (
        <motion.circle
          key={i}
          cx={n.x}
          cy={n.y}
          r={i === HUB_INDEX ? 7 : 4.5}
          fill={i === HUB_INDEX ? "#F5C518" : "#F5F5F0"}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.3 + i * 0.09, ease: "backOut" }}
        />
      ))}
    </svg>
  );
}
