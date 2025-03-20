import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Stars, OrbitControls } from '@react-three/drei';
import Earth from './components/Earth';
import Satellites from './components/Satellites';

function App() {
  return (
    <div className="w-full h-screen bg-black">
      <Canvas
        camera={{
          position: [0, 0, 20],
          fov: 45,
        }}
      >
        {/* Ambient light for dark side illumination */}
        <ambientLight intensity={0.05} />
        
        {/* Main sunlight */}
        <directionalLight 
          position={[15, 0, 15]} 
          intensity={3}
          color="#fffaf0"
          castShadow
        />
        
        {/* Secondary sun glow */}
        <pointLight
          position={[15, 0, 15]}
          intensity={1}
          color="#ff8f00"
          distance={30}
          decay={2}
        />
        
        {/* Atmospheric light */}
        <hemisphereLight
          color="#0066ff"
          groundColor="#000033"
          intensity={0.3}
        />

        <Stars
          radius={100}
          depth={50}
          count={5000}
          factor={4}
          fade
          speed={1}
        />
        <Earth />
        <Satellites />
        <OrbitControls 
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={8}
          maxDistance={25}
        />
      </Canvas>
    </div>
  );
}

export default App;