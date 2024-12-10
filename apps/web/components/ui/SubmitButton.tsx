'use client'
import React from 'react'
import { Button } from './button'
import {Loader2Icon} from 'lucide-react'

const SubmitButton = ({ children, pending }:{ children: React.ReactNode, pending: boolean}) => {

  return (
    <Button disabled={pending} className='w-full flex justify-center items-center my-2 text-white'>
        {pending? 
            <>
                <Loader2Icon className="h-4 w-4 animate-spin mr-1.5" />
                <span>Submitting...</span>
            </>
            :
            children
        }
    </Button>
  )
}

export default SubmitButton