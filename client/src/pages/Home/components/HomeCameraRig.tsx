import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { easing } from 'maath'

type Props = {
  children: any
}

const CameraRig = ({ children }: Props) => {
  const group = useRef<any>()

  useFrame((state, delta) => {
    const isBreakpoint = window.innerWidth <= 1260
    const isMobile = window.innerWidth <= 600

    // set the initial position of the model
    let targetPosition: [number, number, number] = [0, 0, 1.6]
    if (isBreakpoint) targetPosition = [0, 0, 2]
    if (isMobile) targetPosition = [0, 0.2, 2.5]

    // set model camera position
    easing.damp3(state.camera.position, targetPosition, 0.25, delta)

    // set the model rotation smoothly
    easing.dampE(group.current.rotation, [state.pointer.y / 10, -state.pointer.x / 5, 0], 0.25, delta)
  })

  return <group ref={group}>{children}</group>
}

export default CameraRig
