import express from 'express'
import multer from 'multer'
import { v2 as cloudinary } from 'cloudinary'
import streamifier from 'streamifier'

cloudinary.config({
  cloud_name: 'duyb3dqsr',
  api_key: '342793919844576',
  api_secret: 'A08ZGUh5JUT5nueg3cc0RA6gmUE'
})

const UploadRouter = express.Router()

const fileUpload = multer()

UploadRouter.post('/', fileUpload.single('file'), async (req, res) => {
  try {
    if (req.file) {
      let streamUpload = (req) => {
        return new Promise((resolve, reject) => {
          let stream = cloudinary.uploader.upload_stream({ folder: 'POD_Project' }, (error, result) => {
            if (result) {
              resolve(result)
            } else {
              reject(error)
            }
          })

          streamifier.createReadStream(req.file.buffer).pipe(stream)
        })
      }

      async function upload(req) {
        let result = await streamUpload(req)
        res.status(200).json({ message: 'File uploaded successfully.', url: result.url })
      }

      await upload(req)
    }
  } catch (error) {
    res.status(500).json(error)
  }
})

UploadRouter.post('/base64-img', async (req, res) => {
  try {
    if (req.body.image) {
      console.log(true)
      cloudinary.uploader.upload(req.body.image, { folder: 'POD_Project' }, (error, result) => {
        if (result) {
          console.log(result)
          res.status(200).json({ message: 'File uploaded successfully.', url: result.url })
        } else {
          res.status(400).json(error)
        }
      })
    }
  } catch (error) {
    res.status(500).json(error)
  }
})

export const deleteFile = async (filename) => {
  // await cloudinary.api.delete_resources([...filename], { type: 'upload', resource_type: 'image' }).then()
  await cloudinary.uploader.destroy(filename, function (result) {
    console.log('Deleted file')
  })
}

export default UploadRouter
