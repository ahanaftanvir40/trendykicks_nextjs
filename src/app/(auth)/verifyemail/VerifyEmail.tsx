'use client'

import axios from 'axios'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

function VerifyEmail() {

    const searchParam = useSearchParams()

    const [token, setToken] = useState<string>('')
    const [verified, setVerified] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)



    useEffect(() => {
        const urlToken = searchParam.get('token')
        setToken(urlToken || '')
    }, [])



    useEffect(() => {
        const verifyEmail = async () => {
            try {
                await axios.post(`/api/auth/verifyemail`, { token })
                setVerified(true)
            } catch (error) {
                setError(true)
            }
        }
        if (token.length > 0) {
            verifyEmail()
        }

    }, [token, searchParam])



    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 dark:bg-dot-white/[0.2] bg-dot-black/[0.2] bg-black">

            {verified && (
                <div className='flex flex-col justify-center items-center gap-4'>
                    <div >
                        <h2 className='text-3xl text-white/80'>Email Verified You Can Exit This Page and Sign In</h2>

                    </div>
                    <div>
                        <Link href='/signin'>
                            <button className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6  text-white inline-block">
                                <span className="absolute inset-0 overflow-hidden rounded-full">
                                    <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
                                </span>
                                <div className="relative flex space-x-2 items-center  z-10 rounded-full bg-zinc-950 py-4 px-7 ring-1 ring-white/10 ">
                                    <span className='text-lg text-white/90'>{`Sign In`}</span>
                                    <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="1.5"
                                            d="M10.75 8.75L14.25 12L10.75 15.25"
                                        ></path>
                                    </svg>
                                </div>
                                <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40"></span>
                            </button>
                        </Link>
                    </div>
                </div>
            )}
            {error && (
                <div>
                    <h2 className='text-2xl bg-red-500 text-black'>Please Verify Your Email.</h2>
                </div>
            )}
        </div>
    )
}

export default VerifyEmail
