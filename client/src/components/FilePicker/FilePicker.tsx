import React from 'react'
import CustomButton from '../CustomButton/CustomButton'

type Props = {
  file: any
  setFile: React.Dispatch<React.SetStateAction<any>>
  readFile: (type: any) => void
}

const FilePicker = ({ file, setFile, readFile }: Props) => {
  return (
    <div className='filepicker-container'>
      <div className='flex flex-1 flex-col'>
        <input
          id='file-upload'
          type='file'
          accept='image/*'
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => e.target.files?.[0] && setFile(e.target.files[0])}
        />
        <label htmlFor='file-upload' className='filepicker-label'>
          Upload File
        </label>

        <p className='mt-2 truncate text-xs text-gray-500'>{!file ? 'No file selected' : file.name}</p>
      </div>

      <div className='mt-4 flex flex-wrap gap-3'>
        <CustomButton type='outline' title='Logo' handleClick={() => readFile('logo')} customStyles='text-xs' />
        <CustomButton type='filled' title='Full' handleClick={() => readFile('full')} customStyles='text-xs' />
      </div>
    </div>
  )
}

export default FilePicker
