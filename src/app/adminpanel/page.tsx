'use client'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Image from 'next/image'




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

const ManagePage = () => {
    const [products, setProducts] = useState<Product[]>([])
   

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await axios.get(`/api/product/getproducts`)
            console.log(response.data.data);
            setProducts(response.data.data)

        }
        fetchProducts()
    }, [])
    return (
        <div className="min-h-screen bg-black py-12 pt-36 flex flex-col items-center">
            <div className="w-full flex justify-center mb-8 sm:mb-10">
                <h1 className="text-4xl md:text-5xl  bg-transparent text-clip shadow-zinc-100 font-sans font-bold text-white">
                    Manage Products
                </h1>
            </div>
            <div className='flex flex-wrap justify-center sm:gap-12 w-3/4 px- sm:p-0'>
                {products.map((product: Product) => (
                    <div key={product._id} className="card mb-8  text-white shadow-lg shadow-amber-300 w-96">
                        <div className='flex justify-center items-center'>
                            <Image
                                height={300}
                                width={300}
                                src={product.image}
                                alt={''} 
                                className='object-contain'
                                />
                                
                        </div>
                        <div className="card-body">
                            <h2 className="card-title">{product.name}</h2>
                            <h2 className="text-sm">Brand: {product.brand}</h2>
                            <p>{product.description}</p>
                            <div className="card-actions bottom-0 justify-end">
                                <button className="border-2 hover:bg-blue-600 hover:border-0 transform hover:scale-105 transition duration-200 rounded-lg btn-md btn-primary">Edit</button>
                                <button className="border-2 hover:bg-red-600 hover:border-0 transform hover:scale-105 transition duration-200 rounded-lg btn-md btn-primary">Delete</button>
                            </div>
                        </div>
                    </div>
                ))}

            </div>
           
        </div>
    );
  };

export default ManagePage
