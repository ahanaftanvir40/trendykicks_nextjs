'use client'
import React, { useEffect, useState } from 'react'
import productData from '@/app/data/shoe_collections.json'
import Image from "next/image";
import { CardBody, CardContainer, CardItem } from "../components/ui/3d-card";
import Link from 'next/link';
import axios from 'axios';

interface Product{
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

function page() {
    const [products , setProducts] = useState<Product[]>([])

    useEffect(()=>{
        const fetchProducts =async () => {
            const response = await axios.get(`/api/product/getproducts`)
            console.log(response.data.data);
            setProducts(response.data.data)
            
        }
        fetchProducts()
    } , [])

    return (
        <div className='min-h-screen bg-black py-12 pt-36'>
            <h1 className="text-lg md:text-7xl text-center font-sans font-bold mb-2 sm:mb-8 text-white">All Kicks ({productData.products.length}) </h1>

            <div className='flex flex-wrap justify-center sm:gap-10 px-4 sm:p-0'>

                {products.map((product) => (
                    <CardContainer key={product._id} className="inter-var">
                        <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full sm:w-[30rem] h-auto sm:h-[550px] rounded-xl p-4 sm:p-6 border flex flex-col justify-between">
                            <div>
                                <CardItem
                                    translateZ="50"
                                    className="text-lg sm:text-xl font-bold text-neutral-600 dark:text-white"
                                >
                                    {product.name}
                                </CardItem>
                                <CardItem
                                    as="p"
                                    translateZ="60"
                                    className="text-neutral-500 text-sm sm:text-base max-w-full sm:max-w-sm mt-2 dark:text-neutral-300"
                                >
                                    {product.description}
                                </CardItem>
                            </div>
                            <CardItem
                                translateZ="100"
                                rotateX={20}
                                rotateZ={-10}
                                className="w-full mt-4 sm:mt-6"
                            >
                                <Image
                                    src={product.image}
                                    height={1000}
                                    width={1000}
                                    className="h-48 sm:h-60 w-full object-contain rounded-xl group-hover/card:shadow-xl"
                                    alt="thumbnail"
                                />
                            </CardItem>
                            <div className="flex justify-end mt-4 sm:mt-6">
                                <Link href={`/products/${product._id}`}>
                                    <CardItem
                                        translateZ={20}
                                        translateX={40}
                                        as="button"
                                        className="px-3 py-2 sm:px-4 sm:py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs sm:text-sm font-bold"
                                    >
                                        Step In
                                    </CardItem>
                                </Link>
                            </div>
                        </CardBody>
                    </CardContainer>


                ))}
            </div>


        </div>

    )
}

export default page
