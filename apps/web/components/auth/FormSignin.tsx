'use client';

import { AUTHVALIDATION } from '@/validation/auth.validation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormField, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import SubmitButton from '../ui/SubmitButton';
import { signin } from '@/actions/auth.action';
import { sleep } from '@/lib/utils';
import { ApiResponse } from '@/types/web.types';
import Link from 'next/link';

const FormSignin = () => {
  const [showPassword, setShowPassword] = React.useState({
    password: false,
  });

  const form = useForm<z.infer<typeof AUTHVALIDATION.LoginValidation>>({
    resolver: zodResolver(AUTHVALIDATION.LoginValidation),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onChangeTypePassword = (value: string, e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (value === 'pw') {
      setShowPassword(prev => ({
        ...prev,
        password: !prev.password,
      }));
    }
  };

  const onSubmit = async (data: z.infer<typeof AUTHVALIDATION.LoginValidation>) => {
    try {
      await sleep();
      const result: ApiResponse|string = await signin({
        email: data.email,
        password: data.password,
      });
      if(typeof result === 'string') {
        console.log(result)
      }else{
        form.reset();
      }
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 text-slate-300">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <div className="space-y-2">
              <FormLabel htmlFor="email">Email</FormLabel>
              <FormControl>
                <Input {...field} id="email" placeholder="Enter your email" className='bg-slate-700 outline-none border-none focus:ring-2 focus:ring-slate-700' />
              </FormControl>
              <FormMessage />
            </div>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <div className="space-y-2">
              <FormLabel htmlFor="password">Password</FormLabel>
              <FormControl>
                <div className='w-full'>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={(e) => onChangeTypePassword('pw', e)}
                      className="text-sm text-blue-500 absolute top-1/2 right-2 -translate-y-1/2"
                    >
                      {showPassword.password ? '🙈' : '👁'}
                    </button>
                    <Input
                      {...field}
                      id="password"
                      type={showPassword.password ? 'text' : 'password'}
                      placeholder="Enter your password"
                      className='bg-slate-700 outline-none border-none focus:ring-2 focus:ring-slate-700'
                    />
                  </div>
                  <Link href={''} className="text-xs mt-2 text-slate-500 block hover:text-slate-200">Forgot your password?</Link>
                </div>
              </FormControl>
              <FormMessage />
            </div>
          )}
        />
        <SubmitButton pending={form.formState.isSubmitting}>Sign In</SubmitButton>
      </form>
    </Form>
  );
};

export default FormSignin;
