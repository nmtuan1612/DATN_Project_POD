import { Canvas } from '@react-three/fiber'
import { Environment, Center, OrbitControls } from '@react-three/drei'

import Shirt from './Shirt'
import Backdrop from '../../../canvas/Backdrop'
import HomeCameraRig from './HomeCameraRig'

const HomeCanvas = () => {
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

      <HomeCameraRig>
        {/* <Backdrop /> */}
        <Center>
          <Shirt />
          {/* <OrbitControls /> */}
        </Center>
      </HomeCameraRig>
    </Canvas>
  )
}

export default HomeCanvas
