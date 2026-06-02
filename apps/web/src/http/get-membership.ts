import { Role } from '@saas/auth'

import { api } from './api-client'

interface GetMembershipResponse {
  membership: {
    id: string
    role: Role
    userId: string
    organizationId: `${string}-${string}-${string}-${string}-${string}`
  }
}

export async function getMembership(
  org: string
): Promise<GetMembershipResponse> {
  const result = await api
    .get(`organizations/${org}/membership`)
    .json<GetMembershipResponse>()

  return result
}
