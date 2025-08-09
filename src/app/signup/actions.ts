'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/api/server'

export async function signup(email: string, password: string) {
  try {
    const supabase = await createClient()
    
    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    })

    if (signUpError) {
      return {
        success: false,
        error: signUpError.message
      }
    }

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (signInError) {
      return {
        success: false,
        error: signInError.message
      }
    }

    revalidatePath('/', 'layout')
    redirect('/')
  } catch (err) {
    console.error('Signup error:', err)
    return {
      success: false,
      error: 'An unexpected error occurred. Please try again.'
    }
  }
}