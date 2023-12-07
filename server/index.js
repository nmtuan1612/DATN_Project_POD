import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import bodyParser from 'body-parser'
import { Server } from 'socket.io'
import http from 'http'

import connectDB from './MongoDB/connect.js'
import MessageModel from './MongoDB/models/messageModel.js'
import dalleRoutes from './routes/dalle.routes.js'
import UserRouter from './routes/UserRoutes.js'
import StoreRouter from './routes/StoreRoutes.js'
import AuthRouter from './routes/AuthRoutes.js'
import CategoryRouter from './routes/CategoryRoutes.js'
import ConversationRouter from './routes/ConversationRoutes.js'
import UploadRouter from './routes/UploadRoute.js'
import ProductRouter from './routes/ProductRoutes.js'
import StripeRouter from './routes/Stripe.routes.js'
import EmailRouter from './routes/EmailRoutes.js'

dotenv.config()

const app = express()

// Middleware
app.use(bodyParser.json({ limit: '50mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))

app.use(
  cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173', 'https://creoprint.netlify.app'],
    methods: 'GET,POST,PUT,DELETE,OPTIONS'
  })
)
app.use(express.json({ limit: '50mb' }))

app.use('/api/v1', AuthRouter)
app.use('/api/v1/email', EmailRouter)
app.use('/api/v1/dalle', dalleRoutes)
app.use('/api/v1/stripe', StripeRouter)
app.use('/api/v1/user', UserRouter)
app.use('/api/v1/shop', StoreRouter)
app.use('/api/v1/category', CategoryRouter)
app.use('/api/v1/upload', UploadRouter)
app.use('/api/v1/product', ProductRouter)
app.use('/api/v1/conversation', ConversationRouter)

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello from CreoPrint' })
})

const connectServerToDB = async () => {
  try {
    connectDB(process.env.MONGO_URL)
  } catch (error) {
    console.log('error:', error)
  }
}

connectServerToDB()

// Socket
const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    // origin: "http://localhost:3000",
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173', 'https://creoprint.netlify.app'],
    methods: ['GET', 'POST']
  }
})

io.on('connection', (socket) => {
  console.log('User connected:', socket.id)

  socket.on('join_chat', (data) => {
    socket.join(data)
    console.log(`User with ID: ${socket.id} joined room: ${data}`)
  })

  socket.on('send_message', (data) => {
    const newMessage = new MessageModel(data)
    newMessage
      .save()
      .then((value) => {
        console.log('Message saved:')
      })
      .catch((err) => {
        console.log('Error saving message:', err)
      })
    console.log(data)
    socket.to(data.conversationId).emit('receive_message', data)
  })

  // Handle the 'disconnect' event
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id)
  })
})

server.listen(8080, () => console.log(`Server has started on port 8080`))
