
import { Box } from '@/src/ui/gluestack/box'
import { Icon } from '../icon'
import { Input } from '../input'
import { PasswordStrength } from '@/src/ui/widgets/global/components/password-strength'
import { Pressable } from '@/src/ui/widgets/global/components/pressable'

type Props = {
  password: string
  label: string
  hasStrength?: boolean
  isPasswordVisible: boolean
  onChange: (value: string) => void
  onPasswordVisibilityButtonPress: () => void
}

export const PasswordInputView = ({
  label,
  password,
  hasStrength = true,
  isPasswordVisible,
  onChange,
  onPasswordVisibilityButtonPress,
}: Props) => {
  return (
    <Input
      type={isPasswordVisible ? 'text' : 'password'}
      label={label}
      icon='password'
      placeholder='*******'
      value={password}
      endContent={
        <Box className='flex-row gap-3'>
          {hasStrength && <PasswordStrength password={password} />}
          <Pressable onPress={onPasswordVisibilityButtonPress}>
            <Icon
              name={isPasswordVisible ? 'eye-close' : 'eye-open'}
              color='neutral'
              size={24}
            />
          </Pressable>
        </Box>
      }
      onChange={onChange}
    />
  )
}
