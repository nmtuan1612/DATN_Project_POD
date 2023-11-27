import express from 'express'
import Stripe from 'stripe'

const stripe = new Stripe(
  'sk_test_51OFRMbGBgRjSDWkdBPiKXAomku7O3vxoP1diCRelA572tZfXRoVMyEOFXEsNHhkL3WxCfW9NNMBNoGXqM2Wu5img00kZGfugvw'
)

// const CLIENT_URL = 'http://localhost:5173'
const CLIENT_URL = 'https://creoprint.netlify.app'

const StripeRouter = express.Router()
StripeRouter.post('/create-checkout-session', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: req.body.items.map((item) => {
        return {
          price_data: {
            currency: 'usd',
            product_data: {
              name: item.productId.name
            },
            unit_amount: item.retailPrice * 100
          },
          quantity: item.quantity
        }
      }),
      success_url: `${CLIENT_URL}/user/my-orders`,
      cancel_url: `${CLIENT_URL}/shop-online/checkout`
    })

    res.status(200).json({ url: session.url })
  } catch (error) {
    res.status(500).json(error)
  }
})

export default StripeRouter
