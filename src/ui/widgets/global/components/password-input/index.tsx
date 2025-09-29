import { PasswordInputView } from './password-input-view'
import { usePasswordInput } from './use-password-input'

type Props = {
  label: string
  hasStrength?: boolean
  onChange: (value: string) => void
}

export const PasswordInput = ({ label, hasStrength = false, onChange }: Props) => {
  const {
    password,
    isPasswordVisible,
    handlePasswordVisibilityButtonPress,
    handleChange,
  } = usePasswordInput(onChange)

  return (
    <PasswordInputView
      label={label}
      password={password}
      hasStrength={hasStrength}
      onChange={handleChange}
      isPasswordVisible={isPasswordVisible}
      onPasswordVisibilityButtonPress={handlePasswordVisibilityButtonPress}
    />
  )
}
