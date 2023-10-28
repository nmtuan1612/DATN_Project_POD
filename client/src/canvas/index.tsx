import { Canvas } from '@react-three/fiber'
import { Environment, Center, OrbitControls } from '@react-three/drei'
import { OBJExporter } from 'three/examples/jsm/exporters/OBJExporter'
import ModelCustom from './ModelCustom'
import Backdrop from './Backdrop'
import CameraRig from './CameraRig'
import { useRef } from 'react'
import { Group } from 'three'
import { Product, SampleProductDetail } from 'src/types/product.type'

type Props = {
  product: SampleProductDetail | Product
}

const CanvasModel = ({ product }: Props) => {
  const canvasRef: any = useRef<Group>()
  const link = document.createElement('a')
  link.style.display = 'none'
  document.body.appendChild(link)

  function save(blob: any, filename: any) {
    link.href = URL.createObjectURL(blob)
    link.download = filename
    link.click()
  }

  function saveString(text: any, filename: any) {
    save(new Blob([text], { type: 'text/plain' }), filename)
  }

  const handleExport = () => {
    const exporter = new OBJExporter()
    const result = exporter.parse(canvasRef.current)
    saveString(result, 'object.obj')
  }

  return (
    <>
      <Canvas
        shadows
        camera={{ position: [0, 0, 2.5], fov: 25 }}
        gl={{ preserveDrawingBuffer: true }}
        className=' w-full max-w-full transition-all ease-in'
      >
        <ambientLight intensity={2} />
        {/* <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} /> */}
        <pointLight position={[-10, 10, -10]} />
        <pointLight position={[10, 10, 10]} />
        <pointLight position={[-10, 10, 10]} />
        <pointLight position={[10, 10, -10]} />
        {/* <Environment files='https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/potsdamer_platz_1k.hdr' /> */}

        {/* <CameraRig> */}
        {/* <Backdrop /> */}
        <Center>
          <group ref={canvasRef}>
            <ModelCustom />
          </group>
          <OrbitControls />
        </Center>
        {/* </CameraRig> */}
      </Canvas>
      {/* <button onClick={handleExport} className='fixed right-56 top-80'>
        export
      </button> */}
    </>
  )
}

export default CanvasModel
