import { useStore } from '../hooks/useStore.js'
import { useBox } from '@react-three/cannon'
import { useState } from 'react'
import * as textures from '../images/textures.js'

export const Cube = ({ id, position, texture }) => {
  const [isHovered, setIsHovered] = useState(false)
  //const [removeCube] = useStore((state) => [state.removeCube])

  const [ref] = useBox(() => ({
    type: 'Static',
    position,
  }))
  const [addCube, removeCube] = useStore((state) => [
    state.addCube,
    state.removeCube,
  ])

  const activeTexture = textures[texture + 'Texture']

  return (
    <mesh
      onPointerMove={(e) => {
        e.stopPropagation()
        setIsHovered(true)
      }}
      onPointerOut={(e) => {
        e.stopPropagation()
        setIsHovered(false)
      }}
      onClick={(e) => {
        e.stopPropagation()

        const clickedFace = Math.floor(e.faceIndex) / 2
        const { x, y, z } = ref.current.position
        if (clickedFace === 0) {
          addCube(x + 1, y, z)
        } else if (clickedFace === 1) {
          addCube(x - 1, y, z)
        } else if (clickedFace === 2) {
          addCube(x, y + 1, z)
        } else if (clickedFace === 3) {
          addCube(x, y - 1, z)
        } else if (clickedFace === 4) {
          addCube(x, y, z + 1)
        } else if (clickedFace === 5) {
          addCube(x, y, z - 1)
        }
        
          if (e.altKey) {
          removeCube(id)
        }
         
      }}
      ref={ref}
    >
      <boxBufferGeometry attach="geometry" />
      <meshStandardMaterial
        color={isHovered ? 'grey' : 'white'}
        transparent={true}
        opacity={texture === 'glass' ? 0.5 : 1}
        map={activeTexture}
        attach="material"
      />
    </mesh>
  )
}
