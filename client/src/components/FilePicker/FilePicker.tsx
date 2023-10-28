import React, { useRef } from 'react'
import CustomButton from '../CustomButton/CustomButton'
import state from 'src/store'
import { EditorTabs } from 'src/config/constants'

type Props = {
  file: any
  setFile: React.Dispatch<React.SetStateAction<any>>
  readFile: (type: any) => void
}

const FilePicker = ({ file, setFile, readFile }: Props) => {
  const inputRef = useRef<HTMLInputElement | null>(null)

  return (
    <div className='filepicker-container'>
      <h2 className='text-base font-semibold text-gray-600'>Logo & Background</h2>
      <div className='flex flex-1 flex-col gap-2'>
        <input
          id='file-upload'
          ref={inputRef}
          type='file'
          accept='image/*'
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => e.target.files?.[0] && setFile(e.target.files[0])}
        />
        <label htmlFor='file-upload' className='filepicker-label'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='h-6 w-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z'
            />
          </svg>
          <h3 className='text-sm'>{file ? 'Replace Image' : 'Upload Image'}</h3>
          <span className='text-xs text-gray-400'>Supports PNG, JPEG, WEBP</span>
          <span className='text-xs text-gray-400'>Max 2MB</span>
        </label>

        {file && (
          <div className='h-[200px] w-full overflow-hidden rounded-md border transition-all duration-1000 ease-in'>
            <img src={URL.createObjectURL(file)} alt='' className='h-full w-full object-cover' />
          </div>
        )}

        <p className='mt-2 truncate text-xs text-gray-500'>{!file ? 'No file selected' : file.name}</p>
      </div>

      <div className='mt-4 flex flex-wrap gap-3'>
        <CustomButton
          type='outline'
          title='Set logo'
          disabled={!file}
          handleClick={() => {
            state.logoOrigin = EditorTabs[1].name
            readFile('logo')
          }}
          customStyles='text-xs'
        />
        <CustomButton
          type='filled'
          title='Cover'
          disabled={!file}
          handleClick={() => {
            state.fullTextureOrigin = EditorTabs[1].name
            readFile('full')
          }}
          customStyles='text-xs'
        />
      </div>
    </div>
  )
}

export default FilePicker
