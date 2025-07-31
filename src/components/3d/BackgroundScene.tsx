import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei';
import { FloatingShape } from './FloatingShape';
import { ConstructionScene } from './ConstructionScene';

interface BackgroundSceneProps {
  className?: string;
  showControls?: boolean;
  showConstruction?: boolean;
}

export const BackgroundScene = ({ 
  className = "", 
  showControls = false, 
  showConstruction = false 
}: BackgroundSceneProps) => {
  return (
    <div className={`${className}`}>
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} />
        
        {/* Lighting */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <pointLight position={[-5, -5, -5]} intensity={0.4} />

        {/* Environment */}
        <Environment preset="city" background={false} />

        {/* 3D Content */}
        {showConstruction ? (
          <ConstructionScene />
        ) : (
          <>
            {/* Floating geometric shapes */}
            <FloatingShape position={[-4, 2, -2]} color="#3B82F6" size={0.8} shape="box" />
            <FloatingShape position={[4, -1, -3]} color="#F59E0B" size={0.6} shape="sphere" />
            <FloatingShape position={[-2, -3, -1]} color="#10B981" size={0.7} shape="torus" />
            <FloatingShape position={[3, 3, -4]} color="#8B5CF6" size={0.5} shape="box" />
            <FloatingShape position={[0, -2, -2]} color="#EF4444" size={0.9} shape="sphere" />
            <FloatingShape position={[-3, 1, -5]} color="#F97316" size={0.4} shape="torus" />
          </>
        )}

        {/* Controls */}
        {showControls && (
          <OrbitControls 
            enableZoom={true} 
            enablePan={false} 
            enableRotate={true}
            autoRotate={true}
            autoRotateSpeed={0.5}
          />
        )}
      </Canvas>
    </div>
  );
};