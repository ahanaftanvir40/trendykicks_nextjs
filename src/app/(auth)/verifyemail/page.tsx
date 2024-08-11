'use client'

import axios from 'axios'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

function page() {

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

    }, [token])



    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl">Verify Email</h1>
            <h2 className="p-2 bg-orange-500 text-black text-2xl">{token ? `Your Token ${token}` : 'No Token Found Something Went Wrong'}</h2>

            {verified && (
                <div>
                    <h2 className='text-3xl'>Email Verified You Can Exit This Page and Login</h2>
                    <Link href='/signin'>
                        <button className='p-4 rounded-lg bg-orange-500'>Login</button>
                    </Link>
                </div>
            )}
            {error && (
                <div>
                    <h2 className='text-2xl bg-red-500 text-black'>Error</h2>
                </div>
            )}
        </div>
    )
}

export default page
