import express from 'express'
import * as dotenv from 'dotenv'
import { Configuration, OpenAIApi } from 'openai'

dotenv.config()

const router = express.Router()

const config = new Configuration({
  // apiKey: process.env.OPENAI_API_KEY
  apiKey: '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'
})

const openai = new OpenAIApi(config)

router.route('/').get((req, res) => {
  res.status(200).json({ message: 'Hello from DALL.E ROUTES' })
})

router.route('/').post(async (req, res) => {
  try {
    const { prompt } = req.body
    // console.log('prompt: ', prompt)

    const response = await openai.createImage({
      prompt,
      n: 1,
      size: '1024x1024',
      response_format: 'b64_json'
    })

    const image = response.data.data[0].b64_json
    console.log('image:', response.data.data[0])

    res.status(200).json({ photo: image })
  } catch (error) {
    console.error('error:', error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

export default router
