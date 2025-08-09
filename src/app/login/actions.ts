'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/api/server'

export async function login(email: string, password: string) {
  try {
    const supabase = await createClient()
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return {
        success: false,
        error: error.message.includes('Invalid login credentials') 
          ? 'Incorrect email or password' 
          : 'An error occurred while logging in. Please try again.'
      }
    }

    revalidatePath('/', 'layout')
    redirect('/')
  } catch (err) {
    console.error('Login error:', err)
    return {
      success: false,
      error: 'An unexpected error occurred. Please try again.'
    }
  }
}