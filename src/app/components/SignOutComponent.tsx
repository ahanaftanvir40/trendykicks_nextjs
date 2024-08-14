import React from 'react'
import { signOut } from 'next-auth/react'
function SignOutComponent() {

    const handleSignOut = ()=>{
        signOut({
            callbackUrl:'/'
        })
    }

    return (
        <div>
            <button
            onClick={handleSignOut}
             className='text-white'>SignOut</button>
        </div>
    )
}

export default SignOutComponent
