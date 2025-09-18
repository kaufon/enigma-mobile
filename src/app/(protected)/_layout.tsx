import { useAuthContext } from '@/src/ui/widgets/global/hooks'
import { Redirect, Slot } from 'expo-router'

const Layout = () => {
  const { authenticated } = useAuthContext()

  if (!authenticated) {
    return <Redirect href='/auth/sign-in' />
  }

  return <Slot />
}

export default Layout
