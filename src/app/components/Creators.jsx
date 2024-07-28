import React from 'react'
import { WavyBackground } from './ui/wavy-background'
import { AnimatedTooltip } from './ui/animated-tooltip'


const people = [
    {
        id: 1,
        name: "Ahanaf Tanvir",
        designation: "Full-Stack Web Dev",
        image:
            "/shoes/owner.jpg",
    },
]

function Creators() {
    return (
        <div className='relative h-[40rem] sm:h-screen overflow-hidden flex items-center justify-center'>
            <WavyBackground className='w-full max-w-7xl sm:-top-20 mx-auto flex flex-col items-center justify-center h-full'>
                <h1 className='text-2xl md:text-4xl lg:text-7xl text-white font-bold text-center mb-8'>Meet The Owner</h1>
                <p className="text-base md:text-lg text-white text-center mb-4">Owned by a sneakerhead, our store delivers the hottest and most exclusive kicks around.</p>
                <div className="flex flex-row items-center justify-center mb-10 w-full">
                    <AnimatedTooltip items={people} />
                </div>
            </WavyBackground>
        </div>
    )
}

export default Creators
