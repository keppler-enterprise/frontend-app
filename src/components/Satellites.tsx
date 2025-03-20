import React, { useEffect, useState, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';
import * as satellite from 'satellite.js';

interface SatelliteData {
  position: THREE.Vector3;
  noradId: string;
}

const Satellites = () => {
  const [satellites, setSatellites] = useState<SatelliteData[]>([]);
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    const fetchSatellites = async () => {
      try {
        const response = await fetch('https://tle.ivanstanojevic.me/api/tle/');
        const data = await response.json();
        
        const processedSatellites = data.member.slice(0, 10).map((tle: any) => {
          const satrec = satellite.twoline2satrec(tle.line1, tle.line2);
          const date = new Date();
          const positionAndVelocity = satellite.propagate(satrec, date);
          
          const gmst = satellite.gstime(date);
          const position = satellite.eciToEcf(positionAndVelocity.position, gmst);
          
          return {
            position: new THREE.Vector3(
              position.x * 0.001,
              position.z * 0.001,
              position.y * 0.001
            ),
            noradId: tle.noradId
          };
        });
        
        setSatellites(processedSatellites);
      } catch (error) {
        console.error('Error fetching satellite data:', error);
      }
    };

    fetchSatellites();
    const interval = setInterval(fetchSatellites, 30000);
    return () => clearInterval(interval);
  }, []);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      satellites.forEach((sat, index) => {
        const child = groupRef.current?.children[index];
        if (child) {
          const time = clock.getElapsedTime();
          const angle = time * 0.2 + index;
          child.position.x = sat.position.x * Math.cos(angle) * 7;
          child.position.z = sat.position.z * Math.sin(angle) * 7;
          child.position.y = sat.position.y * 7;
        }
      });
    }
  });

  return (
    <group ref={groupRef}>
      {satellites.map((sat) => (
        <group key={sat.noradId}>
          <Sphere args={[0.1, 8, 8]} position={[sat.position.x * 7, sat.position.y * 7, sat.position.z * 7]}>
            <meshPhongMaterial
              key={`material-${sat.noradId}`}
              color="#00ff00"
              emissive="#00ff00"
              emissiveIntensity={0.5}
            />
          </Sphere>
        </group>
      ))}
    </group>
  );
};

export default Satellites;