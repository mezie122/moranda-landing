import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

// Add this declaration to let TypeScript recognize Three.js JSX elements
declare global {
  namespace JSX {
    interface IntrinsicElements {
      mesh: any;
      icosahedronGeometry: any;
      meshStandardMaterial: any;
      ambientLight: any;
      directionalLight: any;
      pointLight: any;
    }
  }
}