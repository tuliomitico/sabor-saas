import { api } from './api-client'

interface CreateProjectRequest {
  name: string
  description: string
}

type CreateProjectResponse = void

export async function createProject({
  name,
  description,
}: CreateProjectRequest): Promise<CreateProjectResponse> {
  await api.post('organizations', {
    json: {
      name,
      description,
    },
  })
}
