'use client'

import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function LogOut() {
  const router = useRouter()
  const supabase = createClientComponentClient()

  async function logOut() {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) {
        console.error('Error logging out:', error.message)
      } else {
        console.log('Logged out successfully')
        router.push('/login')	
      }
    } catch (err) {
      console.error('Unexpected error during logout:', err)
    }
  }

  return (
    <>
      <button 
        type="submit" 
        className="cursor-pointer group relative flex justify-end py-2 px-4 border border-transparent text-sm font-light rounded-md text-white bg-gray-700 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
        onClick={logOut}
      >
        Log Out
      </button>    
    </>
  );
}
