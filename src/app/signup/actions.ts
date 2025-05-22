'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/api/server'

export async function signup(email: string, password: string) {
  const supabase = await createClient()
  
  const { error: signUpError } = await supabase.auth.signUp({
    email,
    password,
  })

  if (signUpError) {
    throw signUpError
  }

  const { error: signInError } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (signInError) {
    throw signInError
  }

  revalidatePath('/', 'layout')
  redirect('/')
}