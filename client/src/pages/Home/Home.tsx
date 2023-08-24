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

const Home = () => {
  const snap = useSnapshot(state)

  return (
    <AnimatePresence>
      <div className='home container'>
        {/* search input */}
        <InputSearch />
        {/* Banner */}
        <div className='grid grid-cols-3 rounded-lg bg-slate-200'>
          <div className='col-span-2'>
            <motion.section {...slideAnimation('left')}>
              {/* <motion.header {...slideAnimation('down')}>
                      <img src='./threejs.png' alt='logo' className='h-8 w-8 object-contain' />
                    </motion.header> */}
              <motion.div
                className='relative flex flex-col justify-start gap-6 rounded-lg bg-slate-200'
                {...headContainerAnimation}
              >
                <motion.div {...headContentAnimation} className='flex flex-col gap-2 pl-6 pt-4'>
                  <p className='max-w-lg text-base font-normal text-gray-900'>
                    <strong>Unleash your imagination</strong>
                    <span className='mt-2 block'>
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
                    <h1 className='head-text'>BRING</h1>
                  </div>
                  <div style={{ width: 'fit-content' }}>
                    <h1 className='head-text'>IMAGINATION</h1>
                  </div>
                  <div style={{ width: 'fit-content' }}>
                    <h1 className='head-text'>INTO REAL WORLD</h1>
                  </div>
                </motion.div>
              </motion.div>
            </motion.section>
          </div>
          <div className='col-span-1'>
            <HomeCanvas />
          </div>
        </div>

        <CategoryList />

        <motion.div {...slideAnimation('up')} className='mt-6 flex flex-col gap-6 md:gap-8'>
          <FeaturedProducts title='Bestsellers' hiddenTag='Bestseller' />
          <FeaturedProducts title='New Arrivals' hiddenTag='New' />
          <FeaturedProducts title='Eco-friendly' hiddenTag='Eco' />
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

export default Home
