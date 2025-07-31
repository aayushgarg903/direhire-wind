import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text3D, Center } from '@react-three/drei';
import { Group } from 'three';

export const ConstructionScene = () => {
  const groupRef = useRef<Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        {/* Construction Tools */}
        <group position={[0, 0, 0]}>
          {/* Hammer */}
          <mesh position={[-2, 0, 0]} rotation={[0, 0, Math.PI / 4]}>
            <boxGeometry args={[0.3, 1.5, 0.3]} />
            <meshStandardMaterial color="#8B4513" />
          </mesh>
          <mesh position={[-2, 0.8, 0]}>
            <boxGeometry args={[0.8, 0.4, 0.3]} />
            <meshStandardMaterial color="#696969" />
          </mesh>

          {/* Screwdriver */}
          <mesh position={[2, 0, 0]} rotation={[0, 0, -Math.PI / 6]}>
            <cylinderGeometry args={[0.05, 0.05, 1.2]} />
            <meshStandardMaterial color="#FF4500" />
          </mesh>
          <mesh position={[2, 0.6, 0]}>
            <cylinderGeometry args={[0.1, 0.05, 0.3]} />
            <meshStandardMaterial color="#C0C0C0" />
          </mesh>

          {/* Hard Hat */}
          <mesh position={[0, 1, 0]}>
            <sphereGeometry args={[0.6, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial color="#FFD700" />
          </mesh>
        </group>
      </Float>

      {/* Floating particles */}
      {Array.from({ length: 8 }).map((_, i) => (
        <Float key={i} speed={1 + i * 0.2} rotationIntensity={1} floatIntensity={2}>
          <mesh position={[
            Math.sin(i * 0.8) * 4,
            Math.cos(i * 0.6) * 2,
            Math.sin(i * 0.4) * 2
          ]}>
            <boxGeometry args={[0.1, 0.1, 0.1]} />
            <meshStandardMaterial color={i % 2 === 0 ? "#3B82F6" : "#F59E0B"} />
          </mesh>
        </Float>
      ))}
    </group>
  );
};