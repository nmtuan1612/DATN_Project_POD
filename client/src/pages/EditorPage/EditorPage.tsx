import React, { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useSnapshot } from 'valtio'

import config from '../../config/config'
import state from '../../store'
import { download } from '../../assets'
import { downloadCanvasToImage, reader } from '../../config/helpers'
import { EditorTabs, FilterTabs, DecalTypes } from '../../config/constants'
import { fadeAnimation, slideAnimation } from '../../config/motion'
import { AIPicker, ColorPicker, CustomButton, FilePicker, Tab } from '../../components'
import CanvasModel from 'src/canvas'
import { useNavigate } from 'react-router-dom'

type Props = {}

type DecalType = keyof typeof DecalTypes

const EditorPage = (props: Props) => {
  const snap = useSnapshot(state)

  const [file, setFile] = useState('')

  const [prompt, setPrompt] = useState('')
  const [generatingImg, setGeneratingImg] = useState(false)

  const [activeEditorTab, setActiveEditorTab] = useState('')
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
      setActiveEditorTab('')
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
      setActiveEditorTab('')
    })
  }

  return (
    <AnimatePresence>
      {/* <div className='h-fulloverflow-scroll container relative grid max-xl:gap-7 xl:h-full xl:py-6'> */}
      <div className='container relative grid h-full overflow-scroll max-xl:gap-7 xl:h-full '>
        <>
          <motion.div key='custom' className='absolute left-4 top-0 z-10' {...slideAnimation('left')}>
            <div className='flex min-h-screen items-center'>
              <div className='editortabs-container tabs'>
                {EditorTabs.map((tab) => (
                  <Tab key={tab.name} tab={tab} handleClick={() => setActiveEditorTab(tab.name)} />
                ))}

                {generateTabContent()}
              </div>
            </div>
          </motion.div>

          <motion.div className='absolute right-5 top-5 z-10' {...fadeAnimation}>
            <CustomButton
              type='filled'
              title='Go Back'
              handleClick={() => {
                navigate(-1)
              }}
              customStyles='w-fit px-4 py-2.5 font-bold text-sm'
            />
          </motion.div>
          <motion.div className='' {...fadeAnimation}>
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
        </>
      </div>
    </AnimatePresence>
  )
}

export default EditorPage
