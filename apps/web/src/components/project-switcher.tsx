'use client'

import { useQuery } from '@tanstack/react-query'
import { ChevronsUpDown, PlusCircle } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

import { getProjects } from '@/http/get-projects'

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

export function ProjectSwitcher() {
  const { slug: orgSlug } = useParams<{ slug: string }>()

  const { data, isLoading } = useQuery({
    queryKey: [orgSlug, 'projects'],
    queryFn: () => getProjects(orgSlug),
    enabled: !!orgSlug,
  })

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus-visible:ring-primary flex w-[168px] items-center gap-2 rounded p-1 text-sm font-medium outline-none focus-visible:ring-2">
        {/* {currentOrganization ? ( */}
        {/*   <> */}
        {/*     <Avatar className="mr-2 size-4"> */}
        {/*       {currentOrganization.avatarUrl && ( */}
        {/*         <AvatarImage src={currentOrganization.avatarUrl} /> */}
        {/*       )} */}
        {/*       <AvatarFallback /> */}
        {/*     </Avatar> */}
        {/*     <span className="truncate text-left"> */}
        {/*       {currentOrganization.name} */}
        {/*     </span> */}
        {/*   </> */}
        {/* ) : ( */}
        {/*   <span className="text-muted-foreground">Select project</span> */}
        {/* )} */}
        <ChevronsUpDown className="text-muted-foreground ml-auto size-4" />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-[200px]"
        align="end"
        alignOffset={-16}
        sideOffset={12}
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel>Projects</DropdownMenuLabel>
          {/* {organizations.map((organization) => ( */}
          {/*   <DropdownMenuItem key={project.id} asChild> */}
          {/*     <Link href={`/org/${organization.slug}`}> */}
          {/*       <Avatar className="mr-2 size-4"> */}
          {/*         {organization.avatarUrl && ( */}
          {/*           <AvatarImage src={organization.avatarUrl} /> */}
          {/*         )} */}
          {/*         <AvatarFallback /> */}
          {/*       </Avatar> */}
          {/*       <span className="line-clamp-1">{organization.name}</span> */}
          {/*     </Link> */}
          {/*   </DropdownMenuItem> */}
          {/* ))} */}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/create-project">
            <PlusCircle className="mr-2 size-4" />
            Create new
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
