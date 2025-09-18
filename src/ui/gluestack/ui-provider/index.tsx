import { useColorScheme } from 'react-native'
import { GluestackUIProvider } from '../gluestack-ui-provider'

export const UiProvider = ({ children }: { children: React.ReactNode }) => {
  const colorScheme = useColorScheme()
  return (
    <GluestackUIProvider mode={colorScheme === 'dark' ? 'dark' : 'light'}>
      {children}
    </GluestackUIProvider>
  )
}
