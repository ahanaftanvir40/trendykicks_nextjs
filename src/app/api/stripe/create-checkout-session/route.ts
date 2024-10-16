import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const body = await req.json()
        const { items, shippingAddress } = body

        if (!items || items.length === 0) {
            return NextResponse.json({ error: 'No items in the cart' }, { status: 400 })
        }

        const lineItems = items.map((item: any) => ({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }))

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/products/orderconfirm`,
            cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/products/cart`,

        })
        return NextResponse.json({ sessionId: session.id, url: session.url })
    } catch (error) {
        console.error('Error creating checkout session:', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
