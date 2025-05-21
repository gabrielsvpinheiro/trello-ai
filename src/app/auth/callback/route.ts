import { createClient } from '@/api/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (code) {
    const supabase = await createClient()
    
    try {
      const { error } = await supabase.auth.exchangeCodeForSession(code)
      
      if (error) {
        return NextResponse.redirect(new URL('/login', requestUrl.origin))
      }

      return NextResponse.redirect(new URL('/login?confirmed=true', requestUrl.origin))
    } catch {
      return NextResponse.redirect(new URL('/login', requestUrl.origin))
    }
  }

  return NextResponse.redirect(new URL('/login', requestUrl.origin))
} 