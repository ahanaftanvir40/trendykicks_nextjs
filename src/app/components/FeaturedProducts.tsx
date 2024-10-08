'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import productData from '../data/shoe_collections.json'
import { BackgroundGradient } from './ui/background-gradient'
import Image from 'next/image'
// import { BackgroundBeams } from './ui/background-beams'


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

function FeaturedProducts() {

    const [product, setProduct] = useState<Product[]>([])
    useEffect(() => {
        const fetchProducts = async () => {
            const response = await axios.get(`/api/product/getproducts`)
            console.log(response.data.data);
            setProduct(response.data.data)






        }
        fetchProducts()
    }, [])

    const featuredProducts = product!.filter((product: Product) => product.isFeatured)
    console.log('Products:', product);


    return (
        <div className="py-12 w-full min-h-screen bg-zinc-900">
            <div className="text-center">
                <h2 className="text-base text-teal-600 font-semibold tracking-wide uppercase">FEATURED Kicks</h2>
                <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
                    Unleash Your Style.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:mt-20 justify-center px-4 sm:px-8 lg:px-16">
                {featuredProducts.map((product: Product) => (
                    <div key={product.name} className="flex justify-center mt-9">
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

                            <div className='flex flex-col items-start mb-4'>
                                <p className="text-base sm:text-xl text-black dark:text-neutral-200 mb-2">
                                    {product.name}
                                </p>
                                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                    {product.description}
                                    
                                    
                                </p>
                            </div>

                            <div className='flex items-center justify-center'>
                                <Link href={`/products/${product._id}`}>
                                    <button className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                                        Step In
                                    </button>
                                </Link>
                            </div>
                        </BackgroundGradient>
                    </div>
                ))}
            </div>
        </div>

    )
}








export default FeaturedProducts
