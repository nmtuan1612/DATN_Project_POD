// import React, { useRef, useState } from 'react'
// import { easing } from 'maath'
// import { useSnapshot } from 'valtio'
// import { useFrame } from '@react-three/fiber'
// // import { Decal, useGLTF, useTexture } from '@react-three/drei'
// import {
//   useGLTF,
//   useCursor,
//   useTexture,
//   Text,
//   Decal,
//   Environment,
//   OrbitControls,
//   RenderTexture,
//   RandomizedLight,
//   PerspectiveCamera,
//   AccumulativeShadows
// } from '@react-three/drei'
// import state from '../store'

// const ModelCustom = () => {
//   const snap = useSnapshot(state)
//   const { nodes, materials }: any = useGLTF<string>('/steel_bottle.glb')
//   // console.log(nodes)
//   // console.log(materials)
//   const textRef = useRef()

//   const logoTexture = useTexture(snap.logoDecal)
//   // const logoTexture = useTexture('/react.png')

//   const fullTexture = useTexture(snap.fullDecal)
//   console.log(snap.isLogoTexture)

//   useFrame((state, delta) => easing.dampC(materials['Material.001'].color, snap.color, 0.25, delta))

//   const stateString = JSON.stringify(snap)

//   return (
//     <group key={stateString}>
//       <mesh
//         // castShadow
//         geometry={nodes.Cube001.geometry}
//         material={materials['Material.001']}
//         material-roughness={1}
//         dispose={null}
//       >
//         {snap.isFullTexture && <Decal position={[0, 0, 0]} rotation={[0, 0, 0]} scale={1} map={fullTexture} />}

//         {snap.isLogoTexture && (
//           <Decal
//             position={[0, 0.04, 1]}
//             rotation={[0, 0, 0]}
//             scale={0.15}
//             map={logoTexture}
//             map-anisotropy={16}
//             depthTest={false}
//             depthWrite={true}
//           />
//         )}
//         <Decal position={[0, 2, 1]} rotation={[0, 0, 0]} scale={4}>
//           <meshStandardMaterial map={logoTexture} />
//         </Decal>

//         {/* <Decal position={[0, 0, 0.75]} rotation={[-0.4, Math.PI, 0]} scale={[0.9, 0.25, 1]}>
//           <meshStandardMaterial roughness={0.6} transparent polygonOffset polygonOffsetFactor={-10}>
//             <RenderTexture attach='map' anisotropy={16} sourceFile={undefined}>
//               <Text rotation={[0, Math.PI, 0]} ref={textRef} fontSize={4} color='white'>
//                 hello from drei
//               </Text>
//               <Dodecahedron />
//             </RenderTexture>
//           </meshStandardMaterial>
//         </Decal> */}
//       </mesh>
//       <mesh
//         // castShadow
//         geometry={nodes.Cube001_1.geometry}
//         material={materials['Material.002']}
//         material-roughness={1}
//         dispose={null}
//       ></mesh>
//     </group>
//   )
// }

// export default ModelCustom

// function Dodecahedron(props: any) {
//   const snap = useSnapshot(state)
//   const meshRef: any = useRef()
//   const logoTexture = useTexture(snap.logoDecal)
//   const texture = useTexture('/react.png')
//   const [hovered, hover] = useState(false)
//   const [clicked, click] = useState(false)
//   useCursor(hovered)
//   useFrame((state, delta) => (meshRef.current.rotation.x = meshRef.current.rotation.y += delta))
//   return (
//     <mesh
//       {...props}
//       ref={meshRef}
//       scale={clicked ? 2.25 : 1.75}
//       onClick={() => click(!clicked)}
//       onPointerOver={() => hover(true)}
//       onPointerOut={() => hover(false)}
//     >
//       <dodecahedronGeometry args={[0.75]} />
//       <meshStandardMaterial color={hovered ? 'hotpink' : 'goldenrod'} />
//       <Decal position={[0, -0.2, 0.5]} scale={0.75} map={logoTexture} map-anisotropy={16} />
//     </mesh>
//   )
// }

import { useFrame } from '@react-three/fiber'
import { easing } from 'maath'
import { useRef } from 'react'
import { useSnapshot } from 'valtio'
// import { Decal, useGLTF, useTexture } from '@react-three/drei'
import { Decal, useGLTF, useTexture } from '@react-three/drei'
import state from 'src/store'
import { Product, SampleProductDetail } from 'src/types/product.type'
import { Euler } from 'three'

type Props = {
  product: SampleProductDetail | Product
}

const ModelCustom = ({ product: { modelMetaData } }: Props) => {
  const snap = useSnapshot(state)
  console.log('modelMetaData:', modelMetaData)
  const { nodes, materials, sence }: any = useGLTF<string>(modelMetaData?.modelUrl as string)
  console.log(nodes)
  console.log(materials)
  const textRef = useRef()

  const logoTexture = useTexture(snap.logoDecal)

  const fullTexture = useTexture(snap.fullDecal)
  // fullTex.isMainMesh
  // fullTexture.repeat.set(4, 4)
  let material: any = {}
  modelMetaData?.meshes?.forEach((mesh: { name: string; isMainMesh: boolean }) => {
    if (mesh.isMainMesh) {
      material = nodes[mesh.name].material
    }
  })

  useFrame((state, delta) => easing.dampC(material.color, snap.color, 0.25, delta))

  const stateString = JSON.stringify(snap)

  return (
    <group key={stateString} scale={modelMetaData?.groupScale} rotation={snap.rotate as Euler}>
      {modelMetaData?.meshes?.map((mesh: { name: string; isMainMesh: boolean }) => {
        const { name, isMainMesh } = mesh
        return nodes[name].isMesh && isMainMesh ? (
          <mesh
            key={name}
            castShadow
            geometry={nodes[name].geometry}
            material={nodes[name].material}
            material-roughness={1}
            dispose={null}
          >
            {snap.isFullTexture && (
              <Decal
                position={modelMetaData.fullTexturePosition}
                rotation={[0, 0, 0]}
                scale={snap.fullTexturePrintOptions.scale}
                map={fullTexture}
              >
                {/* <meshStandardMaterial map={fullTexture} side={1} /> */}
              </Decal>
            )}
            {/* {snap.isFullTexture && <Decal position={[0, 0, 0]} rotation={[0, 0, 0]} scale={3} map={fullTexture} />} */}

            {snap.isLogoTexture && (
              <Decal
                position={modelMetaData.logoPosition}
                rotation={[0, 0, 0]}
                scale={snap.logoPrintOptions.scale}
                map={logoTexture}
                map-anisotropy={16}
                depthTest={true}
                depthWrite={true}
              />
            )}
          </mesh>
        ) : (
          <mesh
            key={name}
            castShadow
            geometry={nodes[name].geometry}
            material={nodes[name].material}
            material-roughness={1}
            dispose={null}
          />
        )
      })}
      {/* <mesh
        castShadow
        geometry={nodes.T_Shirt_male.geometry}
        material={nodes.T_Shirt_male.material}
        material-roughness={1}
        dispose={null}
      >
        {snap.isFullTexture && (
          <Decal position={[0, 0, 0]} rotation={[0, 0, 0]} scale={1} map={fullTexture}>
          </Decal>
        )}

        {snap.isLogoTexture && (
          <Decal
            position={[0, 0.04, 0.15]}
            rotation={[0, 0, 0]}
            scale={0.15}
            map={logoTexture}
            map-anisotropy={16}
            depthTest={true}
            depthWrite={true}
          />
        )}
      </mesh> */}
      {/* <mesh
        // castShadow
        geometry={nodes.Cube001_1.geometry}
        material={nodes.Cube001_1.material}
        material-roughness={1}
        dispose={null}
      ></mesh> */}
    </group>
  )
}
// useGLTF.preload(state.modelUrl)

export default ModelCustom
