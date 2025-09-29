import { useState } from 'react'


export function usePasswordInput(onChange: (value: string) => void) {
  const [password, setPassword] = useState('')
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  function handlePasswordVisibilityButtonPress() {
    setIsPasswordVisible(!isPasswordVisible)
  }

  function handleChange(value: string) {
    const password = value
    setPassword(password)
    onChange(value)
  }

  return {
    password,
    isPasswordVisible,
    handleChange,
    handlePasswordVisibilityButtonPress,
  }
}
