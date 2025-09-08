import { Box } from '@/src/ui/gluestack/box'
import { Controller } from 'react-hook-form'

type Props = {
  onSignIn: (email: string, password: string) => Promise<void>
}

export const SignInFormView = ({ onSignIn }: Props) => {
  return (
    <Box>Forms</Box>
  )
}
