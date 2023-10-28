import React, { useState } from 'react'

import CustomButton from '../CustomButton/CustomButton'
import { DecalTypes, EditorTabs } from 'src/config/constants'
import commonApi from 'src/apis/common.api'
import { File } from 'buffer'
import state from 'src/store'

type DecalType = keyof typeof DecalTypes

type Props = {
  aiFile: any
  setAiFile: React.Dispatch<React.SetStateAction<any>>
  prompt: string
  setPrompt: React.Dispatch<React.SetStateAction<string>>
  handleDecals: (type: DecalType, result: string) => void
  // generatingImg: boolean
  // handleSubmit: any
}

const AIPicker = ({ prompt, setPrompt, aiFile, setAiFile, handleDecals }: Props) => {
  const [generatingImg, setGeneratingImg] = useState(false)

  const handleSubmitPrompt = async () => {
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
      setAiFile(`data:image/png;base64,${data.photo}`)

      // handleDecals(type, `data:image/png;base64,${data.photo}`)
    } catch (error) {
      alert(error)
    } finally {
      setGeneratingImg(false)
    }
  }
  return (
    <div className='aipicker-container'>
      <label className='text-base font-semibold text-gray-600' htmlFor='prompt-input'>
        Custom with AI
      </label>
      <textarea
        placeholder='Enter your idea...'
        rows={5}
        value={prompt}
        id='prompt-input'
        onChange={(e) => setPrompt(e.target.value)}
        className='aipicker-textarea'
      />
      <div className='flex flex-wrap gap-3'>
        {generatingImg ? (
          <CustomButton type='outline' title='Asking AI...' customStyles='text-xs' />
        ) : (
          <CustomButton
            type='outline'
            title='Ask AI'
            disabled={!prompt}
            handleClick={handleSubmitPrompt}
            customStyles='text-xs'
          />
        )}
      </div>
      {aiFile && (
        <>
          <h4 className='text-sm text-gray-500'>Generated image:</h4>
          <div className='h-[200px] w-full overflow-hidden rounded-md border transition-all duration-1000 ease-in'>
            <img src={aiFile} alt='' className='h-full w-full object-cover' />
          </div>
          <div className='flex flex-wrap gap-3'>
            <CustomButton
              type='outline'
              title='Set Logo'
              disabled={!prompt}
              handleClick={() => {
                state.logoOrigin = EditorTabs[2].name
                handleDecals('logo', aiFile)
              }}
              customStyles='text-xs'
            />

            <CustomButton
              type='filled'
              title='Set Full texture'
              disabled={!prompt}
              handleClick={() => {
                state.fullTextureOrigin = EditorTabs[2].name
                handleDecals('full', aiFile)
              }}
              customStyles='text-xs'
            />
          </div>
        </>
      )}
    </div>
  )
}

export default AIPicker
