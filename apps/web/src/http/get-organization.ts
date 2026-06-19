import { api } from './api-client'

interface GetOrganizationRequest {
  org: string
}

interface GetOrganizationResponse {
  organization: {
    slug: string
    id: string
    name: string
    domain: string
    shouldAttachUsersByDomain: boolean
    avatarUrl: string | null
    createdAt: string
    updatedAt: string
    ownerId: string
  }
}

export async function getOrganization({
  org,
}: GetOrganizationRequest): Promise<GetOrganizationResponse> {
  const result = await api
    .get(`organizations/${org}`)
    .json<GetOrganizationResponse>()

  return result
}
