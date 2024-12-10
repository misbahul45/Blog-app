'use client';

import { AUTHVALIDATION } from '@/validation/auth.validation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormField, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import SubmitButton from '../ui/SubmitButton';
import { signup } from '@/actions/auth.action';
import { sleep } from '@/lib/utils';
import { ApiResponse } from '@/types/web.types';

const FormSignup = () => {
  const [showPassword, setShowPassword] = React.useState({
    password: false,
    confirmPassword: false,
  });

  const form = useForm<z.infer<typeof AUTHVALIDATION.RegisterValidation>>({
    resolver: zodResolver(AUTHVALIDATION.RegisterValidation),
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onChangeTypePassword = (value: string, e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (value === 'pw') {
      setShowPassword(prev => ({
        ...prev,
        password: !prev.password,
      }));
    } else if (value === 'cpw') {
      setShowPassword(prev => ({
        ...prev,
        confirmPassword: !prev.confirmPassword,
      }));
    }
  };

  const onSubmit = async (data: z.infer<typeof AUTHVALIDATION.RegisterValidation>) => {
    try {
      await sleep();
      const result: ApiResponse |string = await signup({
        name: data.name,
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-lg space-y-2 text-slate-300">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <div className="space-y-2">
              <FormLabel htmlFor="name">Name</FormLabel>
              <FormControl>
                <Input {...field} id="name" placeholder="Enter your full name" className='bg-slate-700 outline-none border-none focus:ring-2 focus:ring-slate-700' />
              </FormControl>
              <FormMessage />
            </div>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <div className="space-y-2">
              <FormLabel htmlFor="email">Email</FormLabel>
              <FormControl>
                <Input {...field} id="email" placeholder="Enter your email"className='bg-slate-700 outline-none border-none focus:ring-2 focus:ring-slate-700' />
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
                <div className='relative w-full'>
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
              </FormControl>
              <FormMessage />
            </div>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <div className="space-y-2">
              <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
              <FormControl>
                <div className='relative w-full'>
                  <button
                    type="button"
                    onClick={(e) => onChangeTypePassword('cpw', e)}
                    className="text-sm text-blue-500 absolute top-1/2 right-2 -translate-y-1/2"
                  >
                    {showPassword.confirmPassword ? '🙈' : '👁'}
                  </button>
                  <Input
                    {...field}
                    id="confirmPassword"
                    type={showPassword.confirmPassword ? 'text' : 'password'}
                    placeholder="Re-enter your password"
                    className='bg-slate-700 outline-none border-none focus:ring-2 focus:ring-slate-700'
                  />
                </div>
              </FormControl>
              <FormMessage />
            </div>
          )}
        />
        <SubmitButton pending={form.formState.isSubmitting}>Sign Up</SubmitButton>
      </form>
    </Form>
  );
};

export default FormSignup;
