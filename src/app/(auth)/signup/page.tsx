'use client'
import React, { useState } from 'react'
import { Label } from '../../components/ui/label'
import { Input } from '@/app/components/ui/input'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'





function SignUpPage() {
  const router = useRouter()
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: ''
  })


  const [loading, setLoading] = useState(false)

  const onLogin = async () => {
    try {
      setLoading(true)
      const response = await axios.post(`/api/auth/signup`, {
        username: user.username,
        email: user.email,
        password: user.password
      })
      if (response.data.success) {
        toast.success("Please Verify Your Email")
        router.push('/')  //change this to router.back()
      }



    } catch (error: any) {
      console.log('Login Failed', error.message);


    } finally {
      setLoading(false)
    }

  }

  return (
    <div className='min-h-screen bg-black py-12 pt-36 flex items-center justify-center'>
      <div className='flex items-center justify-center'>
        <div className="max-w-md w-full sm:max-w-full sm:w-[500px]  mx-auto rounded-none md:rounded-2xl p-4 md:p-8 sm:shadow-lg sm:shadow-amber-300 bg-black dark:bg-black">
          <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
            Sign Up
          </h2>
          <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
            Step into a world of premium footwear designed to elevate your style. Whether you&rsquo;re here to score the latest Yeezy release or add a classic pair of Air Jordans to your collection, your journey starts here.
          </p>

          <div className="my-8">

            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                placeholder=""
                type="text"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                placeholder="example@gmail.com"
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                required
              />
            </div>

            <button
              className="bg-gradient-to-br mt-4 relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
              onClick={onLogin}
            >
              {loading ? (
                <span className="loading loading-ring loading-md"></span>
              ) : 'Signup'} &rarr;
            </button>

            <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
          </div>
        </div>
      </div >
    </div >
  )
}

export default SignUpPage
