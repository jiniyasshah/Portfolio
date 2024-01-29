import { React, Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import Loader from '../components/Loader'
import Island from '../models/Island'
import Sky from '../models/Sky'
import Bird from '../models/Bird'
import Plane from '../models/Plane'
import HomeInfo from '../components/HomeInfo'
const Home = () => {
    const [currentStage, setCurrentStage] = useState(1)
    const [isRotating, setIsRotating] = useState(false)
    const adjustIslandForScreen = () => {
        let screenScale = null;
        let screenPosition = [0, -6.5, -43];
        let rotation = [0.1, 4.7, 0]
        if (window.innerWidth < 768) {
            screenScale = [0.9, 0.9, 0.9]
        } else {
            screenScale = [1, 1, 1]
        }
        return ([screenScale, screenPosition, rotation])

    }

    const adjustPlaneForScreen = () => {
        let planeScale, planePosition

        if (window.innerWidth < 768) {
            planeScale = [1.5, 1.5, 1.5]
            planePosition = [0, -1.5, 0]
        } else {
            planeScale = [3, 3, 3]
            planePosition = [0, -4, -4]
        }
        return ([planeScale, planePosition])

    }

    const [islandScale, islandPosition, islandRotation] = adjustIslandForScreen();
    const [planeScale, planePosition] = adjustPlaneForScreen();
    return (
        <section className='w-full h-screen relative'>
            <div className="absolute top-28 left-0 right-0 z-10 flex items-center justify-center">
                {currentStage && <HomeInfo currentStage={currentStage} />}
            </div>
            <Canvas className={`w-full h-screen bg-transparent ${isRotating ? 'cursor-grabbing' : 'cursor-grab'}`}
                camera={{ near: 1, far: 1000 }}
            >
                <Suspense fallback={<Loader />}>
                    <directionalLight position={[1, 1, 1]} intensity={1.5} />
                    <ambientLight intensity={0.5} />
                    {/* <pointLight /> */}
                    {/* <spotLight /> */}
                    <hemisphereLight skyColor="#b1e1ff" groundColor="#000000" intensity={1} />
                    <Bird />
                    <Sky isRotating={isRotating} />
                    <Island
                        position={islandPosition}
                        scale={islandScale}
                        rotation={islandRotation}
                        isRotating={isRotating}
                        setIsRotating={setIsRotating}
                        setCurrentStage={setCurrentStage}
                    />
                    <Plane
                        isRotating={isRotating}
                        position={planePosition}
                        scale={planeScale}
                        rotation={[0, 20, 0]}
                    />
                </Suspense>


            </Canvas>


        </section>
    )
}

export default Home
