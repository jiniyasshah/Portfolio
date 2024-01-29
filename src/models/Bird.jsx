import React from 'react'
import birdScene from "../assets/3d/bird.glb"
import { useGLTF } from '@react-three/drei'
import { useRef, useEffect } from 'react'
import { useAnimations } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
const Bird = () => {
    const birdRef = useRef();

    const { scene, animations } = useGLTF(birdScene)
    const { actions } = useAnimations(animations, birdRef)

    let currentRotation = 0;

    // Set the duration of the animation in milliseconds
    const animationDuration = 1000; // 1 second

    // Set the update interval for the animation loop
    const updateInterval = 25; // 16 milliseconds for a smoother animation (approximately 60 frames per second)

    // Calculate the change in rotation per frame
    const rotationIncrement = (Math.PI / animationDuration) * updateInterval;

    // Define the animation loop
    function animate() {
        // Update the rotation
        currentRotation += rotationIncrement;

        // Apply the rotation to the bird element
        birdRef.current.rotation.y = currentRotation;

        // Check if the animation is complete
        if (currentRotation < Math.PI) {
            // Continue the animation
            requestAnimationFrame(animate);
        }
    }

    useEffect(() => {
        actions['Take 001'].play()
    }
        , [])
    useFrame(({ clock, camera }) => {
        // Update the Y position to simulate bird-like motion using a sine wave
        birdRef.current.position.y = Math.sin(clock.elapsedTime) * 0.2 + 2;

        // Check if the bird reached a certain endpoint relative to the camera
        if (birdRef.current.position.x > camera.position.x + 10) {
            // Change direction to backward and rotate the bird 180 degrees on the y-axis
            animate()
        } else if (birdRef.current.position.x < camera.position.x - 10) {
            // Change direction to forward and reset the bird's rotation
            birdRef.current.rotation.y = 0;
        }

        // Update the X and Z positions based on the direction
        if (birdRef.current.rotation.y === 0) {
            // Moving forward
            birdRef.current.position.x += 0.01;
            birdRef.current.position.z -= 0.01;
        } else {
            // Moving backward
            birdRef.current.position.x -= 0.01;
            birdRef.current.position.z += 0.01;
        }
    });
    return (

        < mesh position={[-5, 2, 1]} scale={[0.003, 0.003, 0.003]} ref={birdRef} >
            <primitive object={scene} />
        </ mesh>
    )
}

export default Bird
