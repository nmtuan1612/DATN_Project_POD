import mongoose from 'mongoose'

const ThreeDSchema = {
  modelUrl: {
    type: String,
    required: true
  },
  groupScale: Number,
  rotation: [Number, Number, Number],
  logoPosition: [Number, Number, Number],
  logoScale: Number,
  fullTexturePosition: [Number, Number, Number],
  textureScale: Number
}

const ThreeDModel = mongoose.model('ThreeDModel', ThreeDSchema, 'ThreeDModel')

export default ThreeDModel
