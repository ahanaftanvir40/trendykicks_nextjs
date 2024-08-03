"use client";
import React, { useState } from "react";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { cn } from "../../utils/cn";
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandOnlyfans,
} from "@tabler/icons-react";
import axios from "axios";

function AddPage() {
  const [product, setProduct] = useState({
    name: '',
    brand: '',
    price: '',
    currency: '',
    stock: '',
    sizes: '',
    colors: '',
    image: '',
    isFeatured: false,
    description: ''
  });
  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setProduct({
      ...product,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post(`/api/product/addproduct`, {
        ...product,
        sizes: product.sizes.split(','),
        colors: product.colors.split(',')
      })
      alert('Product created successfully!');
      setProduct({
        name: '',
        brand: '',
        price: '',
        currency: '',
        stock: '',
        sizes: '',
        colors: '',
        image: '',
        isFeatured: false,
        description: ''
      });
    } catch (error) {
      alert('Failed To Add Sneaker');

    }
  };
  return (
    <div className='min-h-screen bg-black py-12 pt-36 flex items-center justify-center'>
      <div className='flex items-center justify-center'>
        <div className="max-w-md w-full sm:max-w-full sm:w-[700px]  mx-auto rounded-none md:rounded-2xl p-4 md:p-8 sm:shadow-lg sm:shadow-amber-300 bg-black dark:bg-black">
          <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
            Add a Sneaker
          </h2>
          <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">


            Add new sneakers by filling out the form with details like name, brand, price, stock, sizes, colors, image URL, and description. Click submit to add the sneaker to our inventory.
          </p>

          <form className="my-8" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-10 md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
              <div>
                <Label htmlFor="SneakerName">Sneaker Name</Label>
                <Input
                  id="SneakerName"
                  name="name"
                  placeholder="Name"
                  type="text"
                  value={product.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="SneakerBrand">Brand</Label>
                <Input
                  id="SneakerBrand"
                  name="brand"
                  placeholder="Brand Name"
                  type="text"
                  value={product.brand}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="mb-3">
              <Label htmlFor="Description">Description</Label>
              <textarea
                id="Description"
                name="description"
                placeholder="Write about the sneaker"
                className="w-full p-2 text-white/80 bg-zinc-800 border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
                value={product.description}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex flex-col gap-10 md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
              <div>
                <Label htmlFor="Price">Price</Label>
                <Input
                  id="Price"
                  name="price"
                  placeholder="Enter Price"
                  type="number"
                  value={product.price}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="Currency">Currency</Label>
                <Input
                  id="Currency"
                  name="currency"
                  placeholder="For example USD"
                  type="text"
                  value={product.currency}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="mb-3">
              <Label htmlFor="Stock">Stock</Label>
              <Input
                id="Stock"
                name="stock"
                placeholder="Enter Stock"
                type="number"
                value={product.stock}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex flex-col gap-10 md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
              <div className="mb-3">
                <Label htmlFor="Sizes">Sizes (comma separated)</Label>
                <Input
                  id="Sizes"
                  name="sizes"
                  placeholder="e.g., S,M,L,XL"
                  type="text"
                  value={product.sizes}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <Label htmlFor="Colors">Colors (comma separated)</Label>
                <Input
                  id="Colors"
                  name="colors"
                  placeholder="e.g., Red,Blue,Green"
                  type="text"
                  value={product.colors}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="mb-3">
              <Label htmlFor="Image">Image URL</Label>
              <Input
                id="Image"
                name="image"
                placeholder="Enter Image URL"
                type="text"
                value={product.image}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3 flex gap-4">
              <Label htmlFor="IsFeatured" className="mt-2">Featured</Label>
              <input
                id="IsFeatured"
                name="isFeatured"
                type="checkbox"
                checked={product.isFeatured}
                onChange={handleChange}
                className="checkbox checkbox-lg  bg-zinc-300"
              />
            </div>

            <button
              className="bg-gradient-to-br mt-4 relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
              type="submit"
            >
              Add Sneaker &rarr;
            </button>

            <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
          </form>
        </div>
      </div >
    </div >
  )
}

export default AddPage
