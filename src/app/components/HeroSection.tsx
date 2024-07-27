import React from 'react'
import Link from 'next/link'

function HeroSection() {
    return (
        <div
            className="h-auto md:h-[40rem] w-full rounded-md flex flex-col items-center justify-center relative overflow-hidden mx-auto py-10 md:py-0">

            <div className="p-4 relative z-10 w-full text-center" >
                <h1
                    className="mt-20 md:mt-0 text-4xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400"
                >Redefine Your Walk.</h1>
                <p
                    className="mt-4 font-normal text-base md:text-lg text-neutral-300 max-w-lg mx-auto"
                >Elevate your style with our premium footwear collection. Experience unmatched comfort and modern design with every step. Discover luxury in every pair.</p>

            </div>
            <div className='mt-4'>
                <Link href='/products'>
                    Explore Courses
                </Link>
            </div>

        </div>
    )
}

export default HeroSection