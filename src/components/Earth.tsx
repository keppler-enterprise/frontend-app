import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';

const Earth = () => {
  const earthRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime() * 0.1;
    if (earthRef.current) {
      earthRef.current.rotation.y = elapsedTime;
    }
    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y = elapsedTime;
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y = elapsedTime * 1.1;
    }
  });

  return (
    <group>
      {/* Earth sphere with day/night textures */}
      <Sphere ref={earthRef} args={[6, 64, 64]} castShadow receiveShadow>
        <meshPhongMaterial
          map={new THREE.TextureLoader().load(
            'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg'
          )}
          specularMap={new THREE.TextureLoader().load(
            'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_specular_2048.jpg'
          )}
          normalMap={new THREE.TextureLoader().load(
            'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_normal_2048.jpg'
          )}
          normalScale={new THREE.Vector2(0.85, 0.85)}
          shininess={25}
          emissiveMap={new THREE.TextureLoader().load(
            'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_lights_2048.jpg'
          )}
          emissive={new THREE.Color(0x112244)}
          emissiveIntensity={1}
        />
      </Sphere>

      {/* Cloud layer */}
      <Sphere ref={cloudsRef} args={[6.05, 64, 64]}>
        <meshPhongMaterial
          map={new THREE.TextureLoader().load(
            'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png'
          )}
          transparent={true}
          opacity={0.4}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </Sphere>

      {/* Inner atmosphere glow */}
      <Sphere ref={atmosphereRef} args={[6.1, 64, 64]}>
        <meshPhongMaterial
          color="#4a9eff"
          transparent={true}
          opacity={0.1}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </Sphere>

      {/* Outer atmosphere glow */}
      <Sphere args={[6.3, 64, 64]}>
        <meshPhongMaterial
          color="#1d4ed8"
          transparent={true}
          opacity={0.1}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </Sphere>

      {/* Terminator line effect (day/night boundary) */}
      <Sphere args={[6.15, 64, 64]}>
        <meshBasicMaterial
          color="#ffffff"
          transparent={true}
          opacity={0.05}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </Sphere>
    </group>
  );
};

export default Earth;