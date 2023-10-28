import { proxy } from 'valtio'
import threeImg from '../../public/threejs.png'
import { SampleLogos } from 'src/config/constants'
import { PrintOptions } from 'src/types/config.type'

type State = {
  rotate: [number, number, number] | any
  modelUrl: string
  color: string
  isLogoTexture: boolean
  isFullTexture: boolean
  logoOrigin: string
  logoDecal: string
  logoPrintOptions: PrintOptions
  fullTextureOrigin: string
  fullDecal: string
  fullTexturePrintOptions: PrintOptions
}

const state: State = proxy({
  rotate: [0, 0, 0],
  modelUrl: '',
  color: '#EFBD48',
  isLogoTexture: true,
  isFullTexture: false,
  logoOrigin: '',
  logoDecal: SampleLogos[0],
  logoPrintOptions: {
    scale: 0,
    position: 'center',
    side: 'front'
  },
  fullTextureOrigin: '',
  fullDecal: SampleLogos[0],
  fullTexturePrintOptions: {
    scale: 0,
    position: 'center',
    side: 'front'
  }
})

export default state
