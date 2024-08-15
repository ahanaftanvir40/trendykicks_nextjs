'use client'

import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion";
import productData from '@/app/data/shoe_collections.json'
import Image from 'next/image';
import Link from 'next/link';
import { ShootingStars } from '@/app/components/ui/shooting-stars';
import { StarsBackground } from '@/app/components/ui/stars-background';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';

interface Product {
    id: number,
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

function Page({ params }: any) {
    const paramID = params.id
    const {data: session , status} = useSession()
    const [product, setProduct] = useState<Product | null>(null)
    const [selectedSize, setSelectedSize] = useState<string | null>(null)
    const [selectedColor, setSelectedColor] = useState<string | null>(null)
    const [quantity, setQuantity] = useState<number>(1);
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const { addtoCart, cart } = useCart()


    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true)
                const response = await axios.post(`/api/product`, { paramID })
                console.log(response.data.data);
                setProduct(response.data.data)
            } catch (error) {
                console.error("Error fetching product:", error);
            } finally {
                setLoading(false)
            }
        }
        fetchProduct()
    }, [paramID])



    const handleCart = () => {
        if (!selectedSize && !selectedColor) {
            toast.error('Please select a Shoe Size and Variant');
            return;
        }

        if (!selectedSize) {
            toast.error('Please select a Shoe Size');
            return;
        }

        if (!selectedColor) {
            toast.error('Please select a Variant');
            return;
        }
        if(!session){
            router.push('/signin')
        }

        if (session && product && selectedSize && selectedColor && quantity > 0) {
            addtoCart({
                id: paramID,
                name: product.name,
                brand: product.brand,
                size: selectedSize,
                color: selectedColor,
                price: product.price,
                currency: 'USD',
                quantity: quantity,
                image: product.image
            });

            // Log the cart state after updating it
            // console.log("CART SHOE AFTER ADDING:", cart);

            // Redirect to cart page after adding the product
            router.push('/products/cart');
        }
    };




    // Log the cart state whenever it changes
    // useEffect(() => {
    //     console.log("CART UPDATED:", cart);
    // }, [cart]);

    const incrementQuantity = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    }

    const decrementQuantity = () => {
        setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
    }



    return (

        <div className="w-full min-h-screen bg-black flex items-center justify-center text-white overflow-x-hidden">

            <div className="grid md:grid-cols-1 gap-8 max-w-4xl mt-20 mx-auto py-12 px-4 sm:px-4 lg:px-12 w-full">
                {loading === true ? (
                    <div className='flex justify-center items-center'>
                        <span className="loading loading-spinner text-info"></span>

                    </div>
                ) : (
                    <div>
                        <div className="gap-4 flex justify-center items-center">
                            <Image
                                src={product?.image!}
                                alt="Sneaker Hero"
                                width={400}
                                height={380}
                                className="w-full max-w-xs sm:max-w-sm md:max-w-xl p-4 sm:p-8 object-contain rounded-lg"
                            />
                        </div>
                        <div className="flex flex-col justify-center gap-6 w-full">
                            <div className='flex  justify-between'>
                                <div>
                                    <h1 className="text-3xl font-bold">{product?.name}</h1>
                                    <p className="text-muted-foreground">By {product?.brand}</p>
                                </div>
                                <div className='mt-2 sm:mt-0'>
                                    <h2 className="text-3xl font-bold">${product?.price}</h2>
                                </div>
                            </div>
                            <div className="grid gap-4">
                                <p className="text-muted-foreground font-light">
                                    {product?.description}
                                </p>
                                <div className="flex justify-between mt-4 flex-wrap">
                                    {/* Size selection */}
                                    <div className='z-50 sm:mb-4'>
                                        <h3 className="font-semibold">Sizes</h3>
                                        <div className="flex gap-2 mt-2">
                                            {product?.sizes.map((size) => (
                                                <button className="p-[3px] relative"
                                                    key={size}
                                                    onClick={() => setSelectedSize(size)}
                                                >
                                                    <div className={`absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg`} />
                                                    <div className={`px-5 py-2 bg-black rounded-[6px] relative group transition duration-200 text-white ${selectedSize === size ? 'bg-gradient-to-r from-indigo-500 to-purple-500' : ''}`}>
                                                        {size}
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Color selection */}
                                    <div className='z-50 mt-3 sm:mt-0 sm:mb-4'>
                                        <h3 className="font-semibold">Variants</h3>
                                        <div className="flex gap-2 mt-2">
                                            {product?.colors.map((color) => (
                                                <button className="p-[3px] relative"
                                                    key={color}
                                                    onClick={() => setSelectedColor(color)}
                                                >
                                                    <div className={`absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg`} />
                                                    <div className={`px-4 py-2 bg-black rounded-[6px] relative group transition duration-200 text-white ${selectedColor === color ? 'bg-gradient-to-r from-indigo-500 to-purple-500' : ''}`}>
                                                        {color}
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                </div>

                                <div className='flex justify-between sm:flex-row  sm:justify-between'>
                                    <div className='z-50 flex flex-col items-start mt-3 sm:mt-0'>
                                        <h3 className="font-semibold">Quantity</h3>
                                        <div className="flex items-center gap-2 mt-2">
                                            <button className="p-[3px] relative"
                                                onClick={decrementQuantity}
                                            >
                                                <div className={`absolute inset-0 border-2 rounded-lg`} />
                                                <div className={`px-3 py-1 bg-black rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent text-lg`}>
                                                    -
                                                </div>
                                            </button>
                                            <span className="px-4 py-2 border-purple-500 border-2 bg-black shadow-md shadow-purple-500">{quantity}</span>
                                            <button className="p-[3px] relative"
                                                onClick={incrementQuantity}
                                            >
                                                <div className={`absolute inset-0 border-2 rounded-lg`} />
                                                <div className={`px-3 py-1 bg-black rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent text-lg`}>
                                                    +
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                    <div className=' flex items-end'>


                                        <button onClick={handleCart} className="inline-flex z-50 h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-10 font-medium text-white/80 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}


            </div>
            <ShootingStars />
            <StarsBackground />
        </div>


    )
}

export default Page
