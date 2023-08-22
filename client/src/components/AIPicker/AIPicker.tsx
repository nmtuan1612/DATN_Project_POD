import React from 'react'

import CustomButton from '../CustomButton/CustomButton'

type Props = {
  prompt: string
  setPrompt: React.Dispatch<React.SetStateAction<string>>
  generatingImg: boolean
  handleSubmit: any
}

const AIPicker = ({ prompt, setPrompt, generatingImg, handleSubmit }: Props) => {
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
          <>
            <CustomButton
              type='outline'
              title='AI Logo'
              disabled={!prompt}
              handleClick={() => handleSubmit('logo')}
              customStyles='text-xs'
            />

            <CustomButton
              type='filled'
              title='AI Full'
              disabled={!prompt}
              handleClick={() => handleSubmit('full')}
              customStyles='text-xs'
            />
          </>
        )}
      </div>
    </div>
  )
}

export default AIPicker
