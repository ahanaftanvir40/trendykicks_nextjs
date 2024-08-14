'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { AuroraBackground } from '@/app/components/ui/aurora-background'
import Link from 'next/link'

function OrderConfirmPage() {
    return (
        <div >
            <AuroraBackground>
                <motion.div
                    initial={{ opacity: 0.0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: 0.3,
                        duration: 0.8,
                        ease: "easeInOut",
                    }}
                    className="relative flex flex-col gap-4 items-center justify-center px-4"
                >
                    <div className="text-3xl md:text-7xl font-bold dark:text-white text-center">
                        Your order is confirmed.
                    </div>
                    <div className="font-extralight text-base md:text-4xl dark:text-neutral-200 py-4">
                        Thank you for shopping with us.
                    </div>
                    <Link href='/products'>
                    <button className="bg-black dark:bg-white rounded-full w-fit text-white dark:text-black px-4 py-2">
                        Shop More Kicks
                    </button>
                    </Link>
                </motion.div>
            </AuroraBackground>

        
        </div >
    )
}

export default OrderConfirmPage
