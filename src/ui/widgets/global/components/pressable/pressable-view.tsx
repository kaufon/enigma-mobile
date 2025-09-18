import { TouchableOpacity, type TouchableOpacityProps } from 'react-native'

type Props = TouchableOpacityProps

export const PressableView = ({ onPress, ...touchableOpacityProps }: Props) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7} {...touchableOpacityProps} />
  )
}
