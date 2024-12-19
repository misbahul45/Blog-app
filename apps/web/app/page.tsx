import { getSession } from '@/actions/auth.action'
import { getProfile } from '@/actions/profile.action'
import React from 'react'

const page = async() => {
  const profile=await getProfile()
  const session=await getSession()
  console.log(session)
  console.log(profile)
  return (
    <div>
      <div className="h-screen"></div>
      <div className="h-screen"></div>
    </div>
  )
}

export default page