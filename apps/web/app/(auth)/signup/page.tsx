import FormSignup from '@/components/auth/FormSignup'
import Image from 'next/image'
import React from 'react'

const page = () => {
  return (
    <div className='flex flex-col lg:grid lg:grid-cols-2 min-h-screen lg:pt-0 lg:px-0 px-4 pt-20'>
      <div className="relative bg-[url('/images/bg-signup.jpg')] bg-cover bg-center lg:block hidden">
        <div className='absolute inset-0 bg-black/30 flex flex-col items-center justify-center px-8 py-12'>
          <p className='font-semibold text-lg text-white text-center max-w-md mb-8'>
            "The best time to spend your time is learning. Unlock your potential, expand your knowledge, and achieve your dreams with every lesson you take. Start today, because your future self will thank you!"
          </p>
          <button className='bg-blue-600 hover:bg-blue-500 text-white font-medium py-2 px-6 rounded-lg shadow-md'>
            Explore Courses
          </button>
        </div>

        <div className='absolute bottom-8 left-4 bg-slate-800 backdrop-blur-md p-4 flex items-center gap-4 w-full max-w-md rounded-lg'>
          <Image src={'/images/sg-image.jpg'} alt='logo' width={50} height={50} className='rounded-full' />
          <p className='text-white text-sm'>
          "Enhance your learning experience with our platform. Make learning more interactive, easy, and enjoyable! Join now and enjoy the best experience."
          </p>
        </div>
      </div>

      <div className='flex flex-col justify-center items-center bg-slate-800 px-8 py-6'>
        <h1 className='text-center font-bold lg:text-4xl md:text-3xl text-2xl md:mb-6 mb-3 text-blue-600'>Join Us Today</h1>
        <p className='text-gray-600 text-center md:text-lg text-sm mb-6'>
          "Transform the way you learn and grow with our platform. Take the first step to an engaging and interactive educational journey!"
        </p>
        <FormSignup />
        <p className='text-sm text-gray-500 mt-4'>
          By signing up, you agree to our{' '}
          <a href='#' className='text-blue-500 hover:underline'>
            Terms of Service
          </a>{' '}
          and{' '}
          <a href='#' className='text-blue-500 hover:underline'>
            Privacy Policy
          </a>.
        </p>
      </div>
    </div>
  )
}

export default page
