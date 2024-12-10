import { getSession } from '@/actions/auth.action'
import React from 'react'

const page = async() => {
  const session=await getSession()

  return (
    <div>
      <div className="h-screen"></div>
      <div className="h-screen"></div>
    </div>
  )
}

export default page