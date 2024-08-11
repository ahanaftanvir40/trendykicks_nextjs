'use client'

import { useCart } from '@/context/CartContext'
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState , useEffect } from 'react'
import Image from 'next/image';

function CartPage() {
    const {data:session , status} = useSession()
    const { cart, clearCart } = useCart()
    const [shippingAddress, setShippingAddress] = useState('');
    const [orderSuccess, setOrderSuccess] = useState(false);

    const router = useRouter()
    const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0)

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/signin');
        }
    }, [status, router]);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (!session || !session.user) return;

        try {
            
            const response = await axios.post('/api/product/order', {
                customer: session && session.user._id,  // Ensure session.user._id exists
                products: cart,
                totalAmount,
                currency: 'USD',
                shippingAddress
            });

            if (response.data.success) {
                setOrderSuccess(true);
                clearCart();  // Clear the cart after successful order
            } else {
                alert('Failed to place order. Please try again.');
            }
        } catch (error) {
            console.error('Error placing order:', error);
            alert('Failed to place order. Please try again.');
        }
    }

    return (
        <div className="w-full min-h-screen bg-black text-white p-6">
            <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

            <form onSubmit={handleSubmit} className="grid gap-4">
                {cart.map(item => (
                    <div key={item.image} className="flex items-center gap-4">
                        <Image src={item.image} alt={item.name} width={100} height={100} className="object-cover" />
                        <div className="flex-1">
                            <h2 className="text-lg font-bold">{item.name}</h2>
                            <p>{item.quantity} x ${item.price}</p>
                        </div>
                    </div>
                ))}

                <div className="mt-4">
                    <h2 className="text-xl font-bold">Total: ${totalAmount}</h2>
                </div>

                <div className="mt-4">
                    <label htmlFor="address" className="block text-lg">Shipping Address</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={shippingAddress}
                        onChange={(e) => setShippingAddress(e.target.value)}
                        required
                        className="p-2 rounded bg-gray-800 text-white w-full"
                    />
                </div>

                <button
                    type="submit"
                    className="mt-6 p-2 bg-green-500 rounded"
                    disabled={cart.length === 0 || orderSuccess}
                >
                    {orderSuccess ? "Order Placed" : "Place Order"}
                </button>
            </form>
        </div>
    )
}

export default CartPage
