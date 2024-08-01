"use client";
import React from 'react'
import { InfiniteMovingCards } from './ui/infinite-moving-cards';
import { SparklesCore } from './ui/sparkles';

const testimonials = [
    {
        quote:
            "The quality and craftsmanship of these sneakers are unparalleled. I've never worn anything more comfortable and stylish. The customer service was exceptional, making my shopping experience truly premium.",
        name: "Alex Johnson",
    },
    {
        quote:
            "As a sneaker enthusiast, I've always been on the lookout for authentic and rare finds. This website offers an amazing selection of original sneakers that cater to all tastes. The packaging and delivery were top-notch, exceeding my expectations.",
        name: "Jessica Lee",
    },
    {
        quote:
            "I was impressed by the curated collection of sneakers from top brands like Nike and Yeezy. The attention to detail and commitment to authenticity make this my go-to place for all my sneaker needs. Highly recommended!",
        name: "Michael Thompson",
    },
    {
        quote:
            "The customer support team went above and beyond to help me find the perfect pair of sneakers. The product quality is excellent, and the design is just as shown on the website. I'm thrilled with my purchase and will definitely be coming back for more!",
        name: "Samantha Williams",
    },
    {
        quote:
            "I've bought sneakers from many stores, but the experience here was exceptional. The selection of premium sneakers is outstanding, and the website is easy to navigate. The shoes arrived in perfect condition, and I'm beyond satisfied with my purchase.",
        name: "Daniel Martin",
    },
];


function TestimonialCards() {
    return (
        <div className="h-[40rem] sm:h-screen  w-full dark:bg-black relative flex flex-col items-center justify-center overflow-hidden">
  <div className="absolute top-16 sm:top-32 w-full flex flex-col items-center gap-1 justify-center z-10 px-4 sm:px-0">
    <h1 className="text-2xl sm:text-6xl text-black dark:text-white/80 font-bold text-center">
      Voices of the Sneaker Savvy
    </h1>
    <div className="w-full max-w-xl sm:w-[40rem] h-32 sm:h-40 relative mt-1 sm:mt-1">
      {/* Gradients */}
      <div className="absolute inset-x-10 sm:inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-full sm:w-3/4 blur-sm" />
      <div className="absolute inset-x-10 sm:inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-full sm:w-3/4" />
      <div className="absolute inset-x-20 sm:inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/2 sm:w-1/4 blur-sm" />
      <div className="absolute inset-x-20 sm:inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/2 sm:w-1/4" />

      {/* Core component */}
      <SparklesCore
        background="transparent"
        minSize={0.4}
        maxSize={1}
        particleDensity={1200}
        className="w-full h-full"
        particleColor="#FFFFFF"
      />

      {/* Radial Gradient to prevent sharp edges */}
      <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
    </div>
  </div>

  <div className="flex justify-center items-center w-full px-4 sm:px-6 lg:px-8 mt-14 sm:mt-20 lg:mt-36">
    <div className="w-full max-w-6xl">
      <InfiniteMovingCards
        items={testimonials}
        direction="right"
        speed="slow"
      />
    </div>
  </div>
</div>



    )
}

export default TestimonialCards
