type Params = {
  type: 'text' | 'password' | 'number'
  onChange?: (value: string) => void
}

export function useInput({ type, onChange }: Params) {
  function handleChange(value: string) {
    if (!onChange) return

    if (type === 'number') {
      onChange(value.replace(/[^0-9]/g, ''))
      return
    }
    onChange(value)
  }

  return {
    handleChange,
  }
}
