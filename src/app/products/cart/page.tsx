'use client'

import { useCart } from '@/context/CartContext'
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { BackgroundGradient } from '@/app/components/ui/background-gradient';
import { Input } from '@/app/components/ui/input';
import toast from 'react-hot-toast';

interface Product {
    _id: string,
    name: string,
    brand: string,
    price: number,
    currency: string,
    stock: number,
    sizes: string[],
    colors: string[],
    image: string,
    isFeatured: boolean,
    description: string
}

function CartPage() {
    const { data: session, status } = useSession()
    const { cart, clearCart, removeFromCart } = useCart()
    const [shippingAddress, setShippingAddress] = useState('');
    const [orderSuccess, setOrderSuccess] = useState(false);
    const [product, setProduct] = useState([])
    const router = useRouter()
    const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0)
    const withDelivery = totalAmount + 10

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/signin');
        }
    }, [status, router]);

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await axios.get(`/api/product/getproducts`)
            console.log(response.data.data);
            setProduct(response.data.data)






        }
        fetchProducts()
    }, [])

    const featuredProducts = product!.filter((product: Product) => product.isFeatured)

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        if (!session || !session.user) return;

        try {
            if (shippingAddress === '') {
                toast.error('Please enter Shipping Address')
            }
            const response = await axios.post('/api/product/order', {
                customer: session && session.user._id,  // Ensure session.user._id exists
                products: cart,
                totalAmount: withDelivery,
                currency: 'USD',
                shippingAddress
            });
            if (response.data.success) {
                setOrderSuccess(true);
                clearCart();  // Clear the cart after successful order
                router.push('/products/orderconfirm')

            } else {
                toast.error('Failed to place order. Please try again.');
            }




        } catch (error) {
            console.error('Error placing order:', error);
            toast.error('Failed to place order. Please try again.');
        }
    }

    return (
        <section className="bg-black py-8 antialiased min-h-screen dark:bg-dot-white/[0.2] bg-dot-black/[0.2] md:py-16">
            <div className="mx-auto max-w-screen-xl mt-28 px-4 2xl:px-0 w-full">

                {cart.length === 0 ? (
                    <div>
                        <div className='text-center mt-6'>
                            <h1 className='text-3xl text-white/70'>Cart Is Currently Empty</h1>

                        </div>
                        <div className='flex items-center justify-center mt-4'>
                            <Link href='/products'>
                                <button className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6  text-white inline-block">
                                    <span className="absolute inset-0 overflow-hidden rounded-full">
                                        <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
                                    </span>
                                    <div className="relative flex space-x-2 items-center  z-10 rounded-full bg-zinc-950 py-4 px-7 ring-1 ring-white/10 ">
                                        <span className='text-lg text-white/90'>{`Explore Kicks`}</span>
                                        <svg
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="1.5"
                                                d="M10.75 8.75L14.25 12L10.75 15.25"
                                            ></path>
                                        </svg>
                                    </div>
                                    <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40"></span>
                                </button>
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white sm:text-4xl sm:px-6">Your Cart</h2>
                        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
                            <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
                                <div className="space-y-6">
                                    {cart.map((item) => (

                                        <div key={item.id} className="rounded-lg  border border-gray-200 bg-white p-4 shadow-sm dark:border-zinc-700 dark:bg-zinc-800 md:p-6">
                                            <div className=" sm:space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                                                <a href="#" className="shrink-0 md:order-1 flex justify-center items-center">

                                                    <Image className="  dark:block object-contain" width={200} height={200} src={item.image} alt="imac image" />
                                                </a>


                                                <div className=" mt-6 sm:mt-0  md:order-3 md:justify-end">

                                                    <div className="md:order-4 md:w-32">
                                                        <p className="text-base font-bold text-gray-900 dark:text-white">{item.quantity} x ${item.price}</p>
                                                    </div>
                                                </div>

                                                <div className="w-full min-w-0 flex-1 md:order-2 md:max-w-md">
                                                    <a href="#" className="text-base font-medium text-gray-900 hover:underline dark:text-white">{item.name}</a>
                                                    <h1 className='text-white/60 text-sm font-light'>Size: {item.size}</h1>
                                                    <h1 className='text-white/60 text-sm font-light'>{item.color}</h1>

                                                    <div className="flex items-center gap-4 mt-2">
                                                        <button type="button" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-white">
                                                            <svg className="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z" />
                                                            </svg>
                                                            Add to Favorites
                                                        </button>

                                                        <button
                                                            onClick={() => removeFromCart(item.name)}
                                                            type="button" className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500">
                                                            <svg className="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6" />
                                                            </svg>
                                                            Remove
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <div className="mt-4">
                                        <label htmlFor="address" className="block text-lg text-white/85 font-light">Shipping Address</label>
                                        <Input
                                            type="text"
                                            id="address"
                                            name="address"
                                            value={shippingAddress}
                                            onChange={(e) => setShippingAddress(e.target.value)}
                                            required
                                            className="p-2 rounded bg-zinc-800 text-white w-full outline-none"

                                        />
                                    </div>




                                </div>
                                <div className="hidden xl:mt-10 xl:block">
                                    <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">People also bought</h3>
                                    <div className="grid grid-cols-3 gap-6 ">
                                        {featuredProducts.map((product: Product) => (
                                            <Link key={product.name} href={`/products/${product._id}`}>
                                                <div key={product.name} className="flex justify-center mt-6 h-3/4">
                                                    <BackgroundGradient className="rounded-[22px] max-w-sm w-full h-full p-4 sm:p-10 bg-white dark:bg-zinc-900 flex flex-col justify-between">
                                                        <div className='flex items-center justify-center mb-6'>
                                                            <Image
                                                                src={product.image}
                                                                alt={product.name}
                                                                height="300"
                                                                width="300"
                                                                className="object-contain rounded-md"
                                                            />
                                                        </div>

                                                        <div className='flex flex-col mb-4 text-center '>
                                                            <p className="text-base sm:text-xl text-black dark:text-neutral-200 mb-2 w-full">
                                                                {product.name}
                                                            </p>

                                                        </div>


                                                    </BackgroundGradient>
                                                </div>
                                            </Link>
                                        ))}



                                    </div>
                                </div>
                            </div>
                            <form onSubmit={handleSubmit} action="">
                                <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
                                    <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-zinc-700 dark:bg-zinc-800 sm:p-6">
                                        <p className="text-xl font-semibold text-gray-900 dark:text-white">Order summary</p>

                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <dl className="flex items-center justify-between gap-4">
                                                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Item price</dt>
                                                    <dd className="text-base font-medium text-gray-900 dark:text-white">${totalAmount}</dd>
                                                </dl>

                                                <dl className="flex items-center justify-between gap-4">
                                                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Voucher</dt>
                                                    <dd className="text-base font-medium text-green-600">-$0</dd>
                                                </dl>

                                                <dl className="flex items-center justify-between gap-4">
                                                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Delivery Fee</dt>
                                                    <dd className="text-base font-medium text-gray-900 dark:text-white">$10</dd>
                                                </dl>
                                            </div>

                                            <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                                                <dt className="text-base font-bold text-gray-900 dark:text-white">Total</dt>
                                                <dd className="text-base font-bold text-gray-900 dark:text-white">${totalAmount + 10}</dd>
                                            </dl>
                                        </div>

                                        <button
                                            disabled={cart.length === 0}
                                            type='submit'
                                            className={`inline-flex h-12 w-full animate-shimmer items-center justify-center rounded-md border border-slate-800 ${orderSuccess ? 'bg-green-600 text-white/90 border-none focus:ring-transparent focus:ring-offset-transparent' : 'bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%]'} px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50`}>
                                            {orderSuccess ? 'Order Placed' : 'Place Order'}
                                        </button>
                                        <div className="flex items-center justify-center gap-2">
                                            <span className="text-sm font-normal text-gray-500 dark:text-gray-400"> or </span>
                                            <Link href="/products" className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline dark:text-white/70">
                                                Continue Shopping
                                                <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 12H5m14 0-4 4m4-4-4-4" />
                                                </svg>
                                            </Link>
                                        </div>
                                    </div>

                                    <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-zinc-700 dark:bg-zinc-800 sm:p-6">
                                        <div className="space-y-4">
                                            <div>
                                                <label htmlFor="voucher" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Do you have a voucher or gift card? </label>
                                                <Input type="text" id="voucher" className="block w-full rounded-lg border border-zinc-300-300 bg-zinc-900 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-zinc-600 dark:bg-zinc-900 dark:text-white dark:placeholder:text-gray-400 outline-none" placeholder="" />
                                            </div>
                                            <div className='flex items-center justify-center'>
                                                <button className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                                                    Apply Code
                                                </button>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                )}


            </div>
        </section>

    )
}

export default CartPage
