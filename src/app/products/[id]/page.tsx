'use client'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion";
import productData from '@/app/data/shoe_collections.json'
import Image from 'next/image';
import Link from 'next/link';
import { ShootingStars } from '@/app/components/ui/shooting-stars';
import { StarsBackground } from '@/app/components/ui/stars-background';

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

function Page() {
    const { id } = useParams()
    const productID = Number(id)
    const [product, setProduct] = useState<Product | null>(null)

    useEffect(() => {
        const filteredProduct = productData.products.find((item: Product) => item.id === productID)
        setProduct(filteredProduct || null)
    }, [id])

    return (

        <div className="w-full h-screen bg-black  flex items-center justify-center text-white">
            
                <div className="grid md:grid-cols-1 gap-8 max-w-4xl sm:mt-20 mx-auto py-12 px-4 sm:px-4 lg:px-12">
                    <div className="gap-4 flex justify-center items-center">
                        <Image
                            src={product?.image!}
                            alt="Sneaker Hero"
                            width={400}
                            height={380}
                            className="w-fit p-8  object-contain rounded-lg"
                        />
                        {/* Uncomment and modify the following code if needed */}
                        {/* <div className="grid grid-cols-3 gap-4">
                <button className="border rounded-lg overflow-hidden transition-colors hover:border-primary">
                  <img
                    src="/placeholder.svg"
                    alt="Sneaker Detail 1"
                    width={150}
                    height={150}
                    className="w-full aspect-square object-cover"
                  />
                </button>
                <button className="border rounded-lg overflow-hidden transition-colors hover:border-primary">
                  <img
                    src="/placeholder.svg"
                    alt="Sneaker Detail 2"
                    width={150}
                    height={150}
                    className="w-full aspect-square object-cover"
                  />
                </button>
                <button className="border rounded-lg overflow-hidden transition-colors hover:border-primary">
                  <img
                    src="/placeholder.svg"
                    alt="Sneaker Detail 3"
                    width={150}
                    height={150}
                    className="w-full aspect-square object-cover"
                  />
                </button>
              </div> */}
                    </div>
                    <div className="flex flex-col justify-center gap-6">
                        <div>
                            <h1 className="text-3xl font-bold">{product?.name}</h1>
                            <p className="text-muted-foreground">By {product?.brand}</p>
                        </div>
                        <div className="grid gap-4">
                            <p className="text-muted-foreground">
                                {product?.description}
                            </p>
                            <div className="grid gap-2">
                                {/* Size selection buttons can go here */}
                            </div>
                            <div className="flex items-center justify-between">
                                <h2 className="text-3xl font-bold">${product?.price}</h2>
                                <Link href={`/cart`}>
                                    <button className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                                        Add to Cart
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <ShootingStars />
                <StarsBackground />
          
        </div>


    )
}

export default Page
