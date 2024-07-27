'use client'

import React from 'react'
import Link from 'next/link'
import { Spotlight } from './ui/Spotlight'
import { Button } from "./ui/moving-border";
import shoe1 from '../assets/shoe1.png'
import shoe2 from '../assets/shoe2.png'
import Image from 'next/image';
import { motion } from 'framer-motion'
import { BackgroundBeams } from './ui/background-beams';

function HeroSection() {
    return (
        <div
            className="h-auto sm:h-screen w-full rounded-md flex flex-col items-center justify-center relative overflow-hidden mx-auto py-10 md:py-0">
            <Spotlight
                className="-top-40 left-0 md:left-60 md:-top-20"
                fill="white"
            />
            <BackgroundBeams />
            <div className="p-4 sm:mt-10 relative z-10 w-full text-center flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-10">
                <motion.div
                    initial={{ y: 0 }}
                    animate={{ y: [0, -12, 0] }}
                    transition={{
                        duration: 1.9,
                        delay: 0.1,
                        repeat: Infinity,
                        repeatType: 'loop'
                    }}
                    className='hidden sm:block  ml-8'
                >
                    <Image height={400} className='-rotate-3' src={shoe1} alt='' />
                </motion.div>
                <div className='borde  md:w-1/2 sm:transform sm:translate-x-12'>
                    <h1 className="mt-20 md:mt-0 text-4xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
                        Redefine Your Walk.
                    </h1>
                    <p className="mt-4 font-normal text-base md:text-lg text-neutral-300 max-w-lg mx-auto">
                        Elevate your style with our premium footwear collection. Experience unmatched comfort and modern design with every step. Discover luxury in every pair.
                    </p>
                </div>
                <motion.div
                    initial={{ y: 0 }}
                    animate={{ y: [0, -12, 0] }}
                    transition={{
                        duration: 1.9,
                        delay: 0.1,
                        repeat: Infinity,
                        repeatType: 'loop'
                    }}
                    className='hidden sm:block'
                >
                    <Image height={480} className="-rotate-[30deg] mr-16" src={shoe2} alt='' />
                </motion.div>
            </div>

            <div className='mb-4'>
                <Link href='/products'>
                    <Button
                        borderRadius='1.75rem'
                        className=" hover:bg-zinc-900 bg-black text-black dark:text-white border-neutral-200 dark:border-slate-800"
                    >
                        Explore Kicks
                    </Button>
                </Link>
            </div>

        </div>
    )
}

export default HeroSection
