import type { IconName } from '../icon/types'
import { InputView } from './input-view'
import { useInput } from './use-input'

type Props = {
  type?: 'text' | 'password' | 'number'
  value?: string
  defaultValue?: string
  label?: string
  icon: IconName
  placeholder?: string
  className?: string
  endContent?: React.ReactNode
  onChange?: (value: string) => void
}

export const Input = ({
  type = 'text',
  value,
  defaultValue,
  label,
  icon,
  placeholder,
  endContent,
  className,
  onChange,
}: Props) => {
  const { handleChange } = useInput({ type, onChange })

  return (
    <InputView
      type={type}
      value={value}
      defaultValue={defaultValue}
      label={label}
      icon={icon}
      placeholder={placeholder}
      endContent={endContent}
      className={className}
      onChange={handleChange}
    />
  )
}
