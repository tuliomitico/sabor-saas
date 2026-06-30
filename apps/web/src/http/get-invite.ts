import { Role } from '@saas/auth'

import { api } from './api-client'

interface GetInviteResponse {
  invite: {
    organization: {
      name: string
    }
    id: string
    createdAt: Date
    role: Role
    email: string
    author: {
      name: string | null
      id: string
      avatarUrl: string | null
    } | null
  }
}

export async function getInvite(inviteId: string): Promise<GetInviteResponse> {
  const result = await api.get(`invites/${inviteId}`).json<GetInviteResponse>()

  return result
}
