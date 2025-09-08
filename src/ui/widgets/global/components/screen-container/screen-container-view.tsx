import type { PropsWithChildren } from 'react'

import { Box } from '@/src/ui/gluestack/box' 

export const ScreenContainerView = ({ children }: PropsWithChildren) => {
  return <Box className='flex-1 h-full px-6 pt-16 bg-background'>{children}</Box>
}
