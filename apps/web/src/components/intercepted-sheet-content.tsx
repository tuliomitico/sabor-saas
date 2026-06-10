'use client'

import { VariantProps } from 'class-variance-authority'
import { XIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Dialog as SheetPrimitive } from 'radix-ui'

import { cn } from '@/lib/utils'

import { Button } from './ui/button'
import { SheetOverlay, SheetPortal, sheetVariants } from './ui/sheet'

interface InterceptedSheetContentProps
  extends
    React.ComponentProps<typeof SheetPrimitive.Content>,
    VariantProps<typeof sheetVariants> {}

export function InterceptedSheetContent({
  className,
  children,
  side = 'right',
  showCloseButton = true,
  ...props
}: InterceptedSheetContentProps & { showCloseButton?: boolean }) {
  const router = useRouter()

  function onDismiss() {
    router.back()
  }

  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content
        onEscapeKeyDown={onDismiss}
        onPointerDownOutside={onDismiss}
        data-slot="sheet-content"
        data-side={side}
        className={cn(
          sheetVariants({ side }),
          'bg-popover text-popover-foreground data-open:animate-in data-open:fade-in-0 data-[side=bottom]:data-open:slide-in-from-bottom-10 data-[side=left]:data-open:slide-in-from-left-10 data-[side=right]:data-open:slide-in-from-right-10 data-[side=top]:data-open:slide-in-from-top-10 data-closed:animate-out data-closed:fade-out-0 data-[side=bottom]:data-closed:slide-out-to-bottom-10 data-[side=left]:data-closed:slide-out-to-left-10 data-[side=right]:data-closed:slide-out-to-right-10 data-[side=top]:data-closed:slide-out-to-top-10 fixed z-50 flex flex-col gap-4 bg-clip-padding text-sm shadow-lg transition duration-200 ease-in-out data-[side=bottom]:inset-x-0 data-[side=left]:inset-y-0 data-[side=right]:inset-y-0 data-[side=top]:inset-x-0 data-[side=bottom]:bottom-0 data-[side=left]:left-0 data-[side=right]:right-0 data-[side=top]:top-0 data-[side=bottom]:h-auto data-[side=left]:h-full data-[side=right]:h-full data-[side=top]:h-auto data-[side=left]:w-3/4 data-[side=right]:w-3/4 data-[side=bottom]:border-t data-[side=left]:border-r data-[side=right]:border-l data-[side=top]:border-b data-[side=left]:sm:max-w-sm data-[side=right]:sm:max-w-sm',
          className
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <Button
            onClick={onDismiss}
            variant="ghost"
            className="absolute right-4 top-4"
            size="icon-sm"
          >
            <XIcon />
            <span className="sr-only">Close</span>
          </Button>
        )}
      </SheetPrimitive.Content>
    </SheetPortal>
  )
}
