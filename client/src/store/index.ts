import { proxy } from 'valtio'
import threeImg from '../../public/threejs.png'

const state = proxy({
  intro: true,
  color: '#EFBD48',
  isLogoTexture: true,
  isFullTexture: false,
  logoDecal: threeImg,
  fullDecal: threeImg
})

export default state
