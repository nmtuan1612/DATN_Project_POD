import React, { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'

import config from '../../config/config'
import state from '../../store'
import { download } from '../../assets'
import { downloadCanvasToImage, reader } from '../../config/helpers'
import { EditorTabs, FilterTabs, DecalTypes } from '../../config/constants'
import { fadeAnimation, slideAnimation } from '../../config/motion'
import { AIPicker, ColorPicker, CustomButton, FilePicker, Tab } from '../../components'
import CanvasModel from 'src/canvas'
import './EditorPage.style.scss'

type Props = {}

type DecalType = keyof typeof DecalTypes

const EditorPage = (props: Props) => {
  const [file, setFile] = useState('')

  const [prompt, setPrompt] = useState('')
  const [generatingImg, setGeneratingImg] = useState(false)

  const [activeEditorTab, setActiveEditorTab] = useState<string>(EditorTabs[0].name)
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoTab: true,
    stylishTab: false
  })

  const navigate = useNavigate()

  // show tab content depending on the activeTab
  const generateTabContent = () => {
    switch (activeEditorTab) {
      case 'colorpicker':
        return <ColorPicker />
      case 'filepicker':
        return <FilePicker file={file} setFile={setFile} readFile={readFile} />
      case 'aipicker':
        return (
          <AIPicker prompt={prompt} setPrompt={setPrompt} generatingImg={generatingImg} handleSubmit={handleSubmit} />
        )
      default:
        return null
    }
  }

  const handleSubmit = async (type: DecalType) => {
    if (!prompt) return alert('Please enter a prompt')

    try {
      setGeneratingImg(true)

      const response = await fetch('http://localhost:8080/api/v1/dalle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt
        })
      })

      const data = await response.json()

      handleDecals(type, `data:image/png;base64,${data.photo}`)
    } catch (error) {
      alert(error)
    } finally {
      setGeneratingImg(false)
      setActiveEditorTab(EditorTabs[0].name)
    }
  }

  const handleDecals = (type: DecalType, result: string) => {
    const decalType = DecalTypes[type]

    state[decalType.stateProperty] = result

    if (!activeFilterTab[decalType.filterTab]) {
      handleActiveFilterTab(decalType.filterTab)
    }
  }

  const handleActiveFilterTab = (tabName: string) => {
    switch (tabName) {
      case 'logoTab':
        state.isLogoTexture = !activeFilterTab[tabName]
        break
      case 'stylishTab':
        state.isFullTexture = !activeFilterTab[tabName]
        break
      default:
        state.isLogoTexture = true
        state.isFullTexture = false
        break
    }

    // after setting the state, activeFilterTab is updated

    setActiveFilterTab((prevState) => {
      return {
        ...prevState,
        [tabName]: !prevState[tabName as keyof typeof activeFilterTab]
      }
    })
  }

  const readFile = (type: DecalType) => {
    reader(file).then((result: any) => {
      console.log('Read file result:', result)
      handleDecals(type, result)
      // setActiveEditorTab('')
    })
  }

  return (
    <AnimatePresence>
      {/* <div className='h-fulloverflow-scroll container relative grid max-xl:gap-7 xl:h-full xl:py-6'> */}
      <div className='app flex h-screen w-screen flex-col overflow-hidden transition-all ease-in'>
        {/* Header */}
        <div className='z-20 flex items-center justify-between gap-2 bg-white px-4 py-2 shadow-sm'>
          <Link to='/' className='logo' style={{ fontSize: 28 }}>
            <span className='text-primary'>Creo</span>
            <span className='text-gray-400'>Print</span>
          </Link>

          <motion.div className=' right-5 top-5 z-10' {...fadeAnimation}>
            <h3 className='text-xl font-semibold text-gray-900'>Men's sport tee</h3>
          </motion.div>

          <motion.div className=' right-5 top-5 z-10' {...fadeAnimation}>
            <CustomButton
              type='filled'
              title='Go Back'
              handleClick={() => {
                navigate(-1)
              }}
              customStyles='w-fit px-4 py-2.5 font-bold text-sm'
            />
          </motion.div>
        </div>
        {/* Content */}
        <div className='relative h-full w-full bg-blue-50'>
          <motion.div key='custom' className='absolute left-4 top-6 z-10' {...slideAnimation('left')}>
            <div className='min-h-full rounded-lg bg-white shadow-around'>
              {/* Tabs */}
              <div className='editorTabs-container'>
                <div className='flex w-[76px] flex-col gap-4'>
                  {EditorTabs.map((tab) => (
                    <Tab
                      key={tab.name}
                      isActiveTab={activeEditorTab === tab.name}
                      tab={tab}
                      handleClick={() => setActiveEditorTab(tab.name)}
                    />
                  ))}
                </div>
                {generateTabContent()}
              </div>
              {/* Footer */}
              {/* <div className='flex flex-wrap items-center gap-4'>
                <div>
                  <label className='relative mb-4 inline-flex cursor-pointer items-center'>
                    <input type='checkbox' defaultValue='' className='peer sr-only' />
                    <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800" />
                    <span className='ml-3 text-sm font-medium text-gray-900 dark:text-gray-300'>Toggle me</span>
                  </label>
                  <label className='relative mb-4 inline-flex cursor-pointer items-center'>
                    <input type='checkbox' defaultValue='' className='peer sr-only' defaultChecked />
                    <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800" />
                    <span className='ml-3 text-sm font-medium text-gray-900 dark:text-gray-300'>Checked toggle</span>
                  </label>
                  <label className='relative mb-3 inline-flex cursor-pointer items-center'>
                    <input type='checkbox' defaultValue='' className='peer sr-only' disabled />
                    <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white dark:border-gray-600 dark:bg-gray-700" />
                    <span className='ml-3 text-sm font-medium text-gray-400 dark:text-gray-500'>Disabled toggle</span>
                  </label>
                </div>
              </div> */}
            </div>
          </motion.div>

          <motion.div className='h-full w-full pl-[200px]' {...fadeAnimation}>
            <CanvasModel />
          </motion.div>

          <motion.div className='filtertabs-container' {...slideAnimation('up')}>
            {FilterTabs.map((tab) => (
              <Tab
                key={tab.name}
                tab={tab}
                isFilterTab
                isActiveTab={activeFilterTab[tab.name]}
                handleClick={() => handleActiveFilterTab(tab.name)}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  )
}

export default EditorPage

{
  /* <button
  className="share"
  style={{ background: snap.color }}
  onClick={() => {
    const link = document.createElement('a')
    link.setAttribute('download', 'canvas.png')
    link.setAttribute('href', document.querySelector('canvas').toDataURL('image/png').replace('image/png', 'image/octet-stream'))
    link.click()
  }}>
  DOWNLOAD
  <AiFillCamera size="1.3em" />
</button> */
}
