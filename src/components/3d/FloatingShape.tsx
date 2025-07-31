import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, useGLTF } from '@react-three/drei';
import { Mesh } from 'three';

interface FloatingShapeProps {
  position: [number, number, number];
  color: string;
  size?: number;
  shape?: 'box' | 'sphere' | 'torus';
}

export const FloatingShape = ({ position, color, size = 1, shape = 'box' }: FloatingShapeProps) => {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  const renderShape = () => {
    switch (shape) {
      case 'sphere':
        return <sphereGeometry args={[size, 32, 32]} />;
      case 'torus':
        return <torusGeometry args={[size, size * 0.3, 16, 100]} />;
      default:
        return <boxGeometry args={[size, size, size]} />;
    }
  };

  return (
    <Float speed={1} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={position}>
        {renderShape()}
        <meshStandardMaterial color={color} metalness={0.3} roughness={0.4} />
      </mesh>
    </Float>
  );
};