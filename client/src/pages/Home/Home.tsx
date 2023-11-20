import { AnimatePresence, motion } from 'framer-motion'
import { useSnapshot } from 'valtio'
import { headContainerAnimation, headContentAnimation, headTextAnimation, slideAnimation } from '../../config/motion'
import state from '../../store'
import './Home.style.scss'
import HomeCanvas from 'src/pages/Home/components/HomeCanvas'
import CategoryList from './components/CategoryList'
import CustomButton from '../../components/CustomButton/CustomButton'
import FeaturedProducts from './components/FeaturedProducts'
import InputSearch from 'src/components/InputSearch/InputSearch'
import { useLocation } from 'react-router-dom'
import useQueryConfig from 'src/hooks/useQueryConfig'

const Home = () => {
  const snap = useSnapshot(state)
  const queryConfig = useQueryConfig()
  const { pathname } = useLocation()

  return (
    <AnimatePresence>
      <div className='home container'>
        {/* search input */}
        {/* <InputSearch placeholder='Search sample product...' pathname={pathname} queryConfig={queryConfig} /> */}
        {/* Banner */}
        <div className='relative grid grid-cols-3 rounded-lg bg-[#efdffe]'>
          <div className='let-custom absolute right-1/4 top-1/2 z-10 block '>Let custom!</div>
          <div className='col-span-2'>
            <motion.section {...slideAnimation('left')}>
              {/* <motion.header {...slideAnimation('down')}>
                      <img src='./threejs.png' alt='logo' className='h-8 w-8 object-contain' />
                    </motion.header> */}
              <motion.div
                className='relative flex flex-col justify-start gap-6 rounded-lg rounded-br-none rounded-tr-none border-0 border-r-0 border-primary bg-[#efdffe]'
                {...headContainerAnimation}
              >
                <motion.div {...headContentAnimation} className='flex flex-col gap-2 pl-6 pt-4'>
                  <p className='max-w-lg text-base font-normal text-gray-900'>
                    <span className='text-[22px] font-semibold text-primary'>Unleash your imagination</span>
                    <span className='mt-2 block font-semibold text-gray-800'>
                      Create your unique and exclusive products with our brand-new 3D customization tool.
                    </span>
                  </p>
                  {/* <div className='flex justify-start'>
                      <CustomButton
                        type='filled'
                        title='Customize It'
                        handleClick={() => (state.intro = false)}
                        customStyles='w-fit px-4 py-2.5 font-bold text-sm text-white'
                      />
                    </div> */}
                </motion.div>
                <motion.div {...headTextAnimation} className='hidden sm:block'>
                  {/* <div className='w-fit rounded-tr-lg bg-white py-2 pr-2' style={{ width: 'fit-content' }}>
                    </div> */}

                  <div style={{ width: 'fit-content' }}>
                    <h1 className='head-text '>BRING</h1>
                  </div>
                  <div style={{ width: 'fit-content' }}>
                    <h1 className='head-text '>IMAGINATION</h1>
                  </div>
                  <div style={{ width: 'fit-content' }}>
                    <h1 className='head-text '>INTO REAL WORLD</h1>
                  </div>
                </motion.div>
              </motion.div>
            </motion.section>
          </div>
          <div className='relative col-span-1 overflow-hidden rounded-lg rounded-bl-none rounded-tl-none border-0 border-l-0 border-primary bg-[#efdffe]'>
            <div
              className='absolute bottom-0 left-8 right-0 top-0 bg-primary'
              style={{ clipPath: 'polygon(100% 0%, 100% 51%, 100% 82%, 53% 78%, 5% 28%, 0 0)' }}
            />
            <div
              className='absolute bottom-0 left-0 right-0 top-0 bg-[#f8f6fa]'
              style={{ clipPath: 'polygon(100% 0%, 100% 51%, 100% 71%, 58% 64%, 13% 27%, 0 0)' }}
            />
            <div
              className='absolute bottom-0 left-0 right-0 top-0 bg-primary'
              style={{ clipPath: 'polygon(100% 0%, 100% 51%, 100% 50%, 75% 48%, 14% 17%, 0 0)' }}
            />
            <HomeCanvas />
          </div>
        </div>

        <CategoryList />

        <motion.div {...slideAnimation('up')} className='mt-6 flex flex-col gap-6 md:gap-8'>
          <FeaturedProducts title='Bestsellers' hiddenTag='Bestsellers' />
          <FeaturedProducts title='New Arrivals' hiddenTag='New Arrivals' />
          <FeaturedProducts title='Eco-friendly' hiddenTag='Eco-friendly' />
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

export default Home
