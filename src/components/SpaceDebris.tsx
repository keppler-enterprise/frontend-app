import React, { useEffect, useState, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';

interface Debris {
  position: THREE.Vector3;
  id: number;
  size: number;
}

const SpaceDebris = () => {
  const [debris, setDebris] = useState<Debris[]>([]);
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    // Simulated space debris data - in a real app, this would come from space debris tracking APIs
    const generateDebris = () => {
      return Array(100).fill(null).map((_, i) => {
        const phi = Math.random() * Math.PI * 2;
        const theta = Math.random() * Math.PI;
        const radius = 7 + Math.random() * 2;
        
        return {
          position: new THREE.Vector3(
            radius * Math.sin(theta) * Math.cos(phi),
            radius * Math.sin(theta) * Math.sin(phi),
            radius * Math.cos(theta)
          ),
          id: i,
          size: 0.02 + Math.random() * 0.04
        };
      });
    };

    setDebris(generateDebris());
  }, []);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      const time = clock.getElapsedTime();
      groupRef.current.children.forEach((child, i) => {
        const speed = 0.1 + (i % 5) * 0.05;
        child.position.x += Math.sin(time * speed) * 0.01;
        child.position.z += Math.cos(time * speed) * 0.01;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {debris.map((item) => (
        <Sphere key={item.id} position={item.position.toArray()} args={[item.size, 8, 8]}>
          <meshPhongMaterial
            color="#ff4400"
            emissive="#ff4400"
            emissiveIntensity={0.3}
            transparent
            opacity={0.8}
          />
        </Sphere>
      ))}
    </group>
  );
};

export default SpaceDebris;