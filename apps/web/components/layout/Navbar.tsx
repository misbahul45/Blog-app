'use client'
import React from 'react'
import { Navbar as NavbarItem } from '@/constans'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Navbar = () => {
    const pathName=usePathname()
    const [showNavbar,setShowNavbar]=React.useState(false)
  return (
    <div className='flex gap-2.5'>
        {NavbarItem.map((item,i)=>(
            <Link href={item.path} key={i} className={`px-4 py-2 text-sm font-semibold text-slate-300 hover:text-slate-50 hover:bg-slate-800 rounded-full transition-all duration-100 ${pathName===item.path&&'bg-slate-800 text-slate-50'}`}>{item.name}</Link>
        ))}
    </div>
  )
}

export default Navbar