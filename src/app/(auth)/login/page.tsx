'use client'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { signIn } from 'next-auth/react'

function page() {

    const router = useRouter()

    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    const [buttonDisabled, setButtonDisabled] = useState(false)
    const [loading, setLoading] = useState(false)

    const onLogin = async () => {
        try {
            setLoading(true)
            await signIn('credentials', {
                email: user.email,
                password: user.password,
                callbackUrl: '/'
            })



        } catch (error: any) {
            console.log('Login Failed', error.message);


        } finally {
            setLoading(false)
        }

    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{loading ? "Processing" : "Login"}</h1>
            <hr />

            <label htmlFor="email">email</label>
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                id="email"
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="email"
            />
            <label htmlFor="password">password</label>
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                id="password"
                type="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder="password"
            />
            <button
                onClick={onLogin}
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">Login here</button>
            <Link href="/">Visit Signup page</Link>
        </div>
    )
}

export default page
