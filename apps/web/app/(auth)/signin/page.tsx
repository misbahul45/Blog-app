import FormSignin from '@/components/auth/FormSignin'
import OauthButton from '@/components/auth/OauthButton'
import { SigninOauth } from '@/constans'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className='h-screen'>
        <div className="w-full md:max-w-[80%] max-w-[96%] h-full max-h-[75%] flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 shadow-xl rounded-xl border-2 border-slate-700">
          <div className="flex-1 bg-[url('/images/bg-signin.jpg')] bg-cover rounded-l-xl lg:block hidden"></div>
          <div className='flex-1 py-4 flex px-3 flex-col justify-center items-center bg-slate-800 rounded-r-xl'>
            <div className='px-4 py-2 font-semibold sm:text-2xl lg:hidden block bg-gradient-to-r from-gray-700 via-zinc-600 to-slate-900 text-white rounded-full mb-8'>
              MCLearn
            </div>
            <div className="w-full space-y-3 lg:px-8 sm:px-12 px-2">
              <h1 className='text-center font-bold lg:text-2xl md:text-xl text-lg text-slate-500'>
                Welcome Back and Have a nice day
              </h1>
              <p className='text-center text-sm text-gray-300'>"learning is the best way to become a better person"</p>
              <div className='flex gap-2 w-full'>
                {SigninOauth.map((item,i)=>(
                  <OauthButton key={i} link={item.link} name={item.name} />
                ))}
              </div>
              <FormSignin />
              <p className='text-xs text-center text-gray-500'>Don&apos;t have an account? <Link href={'/signup'} className='text-gray-600 hover:text-white'>Register</Link></p>
            </div>
          </div>
        </div>
    </div>
  )
}

export default page