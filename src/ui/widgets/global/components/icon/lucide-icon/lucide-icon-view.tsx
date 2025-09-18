import type { IconName } from '../types/icon-name'
import { ICONS } from './icons'
import { COLORS } from '@/src/constants' 

type IconProps = {
  name: IconName
  color?: keyof typeof COLORS.dark
  size?: number
}

export const LucideIconView = ({ name, color = 'neutral', size = 24 }: IconProps) => {
  const Icon = ICONS[name]

  return <Icon color={COLORS.dark[color]} size={size} />
}
