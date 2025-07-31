import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Text, Box } from '@react-three/drei';
import { Group } from 'three';

interface Card3DProps {
  children: React.ReactNode;
  className?: string;
}

const FloatingCard = () => {
  const groupRef = useRef<Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.1;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1;
      
      if (hovered) {
        groupRef.current.scale.setScalar(1.05);
      } else {
        groupRef.current.scale.setScalar(1);
      }
    }
  });

  return (
    <group 
      ref={groupRef}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      <Box args={[2, 2.5, 0.1]} position={[0, 0, 0]}>
        <meshStandardMaterial 
          color={hovered ? "#3B82F6" : "#ffffff"} 
          metalness={0.1} 
          roughness={0.1}
          transparent
          opacity={0.9}
        />
      </Box>
      
      {/* Card border */}
      <Box args={[2.1, 2.6, 0.05]} position={[0, 0, -0.075]}>
        <meshStandardMaterial 
          color="#e5e7eb" 
          metalness={0.2} 
          roughness={0.8}
        />
      </Box>
    </group>
  );
};

export const Card3D = ({ children, className = "" }: Card3DProps) => {
  return (
    <div className={`relative ${className}`}>
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 pointer-events-none">
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 4]} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[2, 2, 5]} intensity={0.8} />
          <FloatingCard />
        </Canvas>
      </div>
      
      {/* Content overlay */}
      <div className="relative z-10 bg-transparent">
        {children}
      </div>
    </div>
  );
};