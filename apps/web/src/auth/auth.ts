import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { getProfile } from '@/http/get-profile'

export async function isAuthenticated() {
  const cookieStore = await cookies()
  return !!cookieStore.get('token')?.value
}

export async function auth() {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value

  if (!token) {
    redirect('/auth/sign-in')
  }

  const profile = await getProfile()

  if (!profile.user) redirect('/auth/sign-out')

  return { user: profile.user }
}
