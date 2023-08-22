import { Canvas } from '@react-three/fiber'
import { Environment, Center, OrbitControls } from '@react-three/drei'

import ModelCustom from './ModelCustom'
import Backdrop from './Backdrop'
import CameraRig from './CameraRig'

const CanvasModel = () => {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 0, 2.5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
      className=' w-full max-w-full transition-all ease-in'
    >
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      {/* <Environment files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/potsdamer_platz_1k.hdr"  /> */}

      {/* <CameraRig> */}
      {/* <Backdrop /> */}
      <Center>
        <ModelCustom />
        <OrbitControls />
      </Center>
      {/* </CameraRig> */}
    </Canvas>
  )
}

export default CanvasModel
