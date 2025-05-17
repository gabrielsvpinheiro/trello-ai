'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/api/server'

export async function login(email: string, password: string) {
  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    if (error.message.includes('Invalid login credentials')) {
      throw new Error('Incorrect email or password')
    }
    throw new Error('An error occurred while logging in. Please try again.')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}