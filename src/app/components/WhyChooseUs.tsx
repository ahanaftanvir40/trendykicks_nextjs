"use client";
import React from "react";
import { StickyScroll } from "./ui/sticky-scroll-reveal";
import Image from "next/image";
import nike from '../assets/nike.jpg'
import yeezy from '../assets/yeezy.jpg'
import adidas from '../assets/adidas.jpg'
import balenciaga from '../assets/balenciaga.png'


const content = [
    {
      title: "Nike",
      description:
        "Experience the innovation and style of Nike, from iconic Air Jordans to the latest Air Max releases. Our collection features timeless classics and cutting-edge designs that have defined sneaker culture for decades.",
      content: (
        <div className="h-full w-full  flex items-center justify-center text-white">
        <Image
          src={nike}
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
      </div>
      ),
    },
    {
      title: "Yeezy",
      description:
        "Discover the groundbreaking designs of Yeezy, a brand that redefines luxury and comfort. With its unique aesthetics and limited releases, Yeezy sneakers are a must-have for any serious collector.",
      content: (
        <div className="h-full w-full  flex items-center justify-center text-white">
          <Image
            src={yeezy}
            width={300}
            height={300}
            className="h-full w-full object-cover"
            alt="linear board demo"
          />
        </div>
      ),
    },
    {
      title: "Adidas",
      description:
        "Embrace the fusion of performance and fashion with Adidas. From the iconic Stan Smith and Superstar to the latest Ultraboost and NMD models, our selection offers something for every taste.",
      content: (
        <div className="h-full w-full  flex items-center justify-center text-white">
          <Image
            src={adidas}
            width={300}
            height={300}
            className="h-full w-full object-cover"
            alt="linear board demo"
          />
        </div>
      ),
    },
    {
      title: "Balenciaga",
      description:
        "Step into the world of high fashion with Balenciaga's bold and distinctive sneakers. Known for their oversized silhouettes and avant-garde designs, Balenciaga sneakers are perfect for making a statement.",
      content: (
        <div className="h-full w-full  flex items-center justify-center text-white">
        <Image
          src={balenciaga}
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
      </div>
      ),
    },
  ];

function WhyChooseUs() {
  return (
    <div >
    
      {/* <StickyScroll content={content}  /> */}
    </div>
  )
}

export default WhyChooseUs
