'use client'

import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Button } from '../common/Button'

export default function LogOut() {
  const router = useRouter()
  const supabase = createClientComponentClient()

  async function logOut() {
    try {
      const { error } = await supabase.auth.signOut()

      if (error) {
        console.error('Error logging out:', error.message)
      }

      console.log('Logged out successfully')
      router.push('/login')	
    } catch (err) {
      console.error('Unexpected error during logout:', err)
    }
  }

  return (
    <>
      <Button 
        onClick={logOut}
        text="Log Out"
      />  
    </>
  );
}
