import React from 'react'
import CartImage from '../assets/cart.png'
import Image from 'next/image'
import { useCart } from '@/context/CartContext'
function Cart({ className }: { className?: string }) {
    const {cart} = useCart()
    return (
        <div>
            <div className='flex gap-1'>
                <div>
                    {/* <Image src={CartImage} alt='' width={25} height={25} /> */}
                    <h1 className='text-white'>Cart</h1>
                </div>
                <div>
                    <div className="badge badge-primary badge-lg">{cart.length}</div>
                </div>
            </div>
        </div>
    )
}

export default Cart
