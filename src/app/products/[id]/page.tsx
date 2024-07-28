'use client'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { LampContainer } from '@/app/components/ui/lamp'
import { motion } from "framer-motion";
import productData from '@/app/data/shoe_collections.json'
import Image from 'next/image';

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
        <div className='min-h-screen bg-black flex items-center justify-center'>
            <LampContainer className='h-full w-full flex flex-col items-center justify-center p-8'>
                <motion.div
                    initial={{ opacity: 0.5, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: 0.3,
                        duration: 0.8,
                        ease: "easeInOut",
                    }}
                >
                    {product?.image ? (
                        <Image
                            src={product.image}
                            height={400}
                            width={400}
                            alt={product.name || "Product Image"}
                        />
                    ) : (
                        <div className="h-64 w-64 bg-gray-300 flex items-center justify-center">
                            <span className="text-white">No Image Available</span>
                        </div>
                    )}
                </motion.div>
                <motion.h1
                    initial={{ opacity: 0.5, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: 0.3,
                        duration: 0.8,
                        ease: "easeInOut",
                    }}
                    className="bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl mt-8"
                >
                    {product?.name}
                </motion.h1>
                <motion.div
                    initial={{ opacity: 0.5, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: 0.3,
                        duration: 0.8,
                        ease: "easeInOut",
                    }}
                >


                    <p className="text-base md:text-lg text-white text-center mb-4 max-w-3xl mx-auto">{product?.description}</p>
                    <div className="text-center text-white mt-4">
                        <p className="text-2xl font-semibold">{product?.currency} {product?.price}$</p>
                        <p className="text-lg">Stock: {product?.stock}</p>
                        <div className="flex justify-center gap-2 mt-2">
                            <p className="font-semibold">Colors:</p>
                            <div className="flex gap-2">
                                {product?.colors.map((color, index) => (
                                    <span key={index} className="px-2  rounded-full">{color}</span>
                                ))}
                            </div>
                        </div>
                        <div className="flex justify-center gap-2 mt-2">
                            <p className="font-semibold">Sizes:</p>
                            <div className="flex gap-2">
                                {product?.sizes.map((size, index) => (
                                    <span key={index} className="px-2  text-center rounded-full">{size}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </LampContainer>
        </div>
    )
}

export default Page
