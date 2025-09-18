import { useCallback } from 'react'
import {
  Toast,
  ToastDescription,
  ToastTitle,
  useToast as useToastGluestack,
} from '../ui/gluestack/toast'

type ToastType = 'success' | 'error' | 'warning'

const TITLES = {
  success: {
    title: 'Sucesso',
    textColor: 'text-primary',
  },
  error: {
    title: 'Erro',
    textColor: 'text-danger',
  },
  warning: {
    title: 'Aviso',
    textColor: 'text-warning',
  },
}

export const useToast = () => {
  const toast = useToastGluestack()

  const show = useCallback(
    (description: string, type: ToastType = 'error') => {
      const newId = Math.random()
      toast.show({
        id: newId.toString(),
        placement: 'top',
        duration: 3000,
        render: ({ id }) => {
          const uniqueToastId = `toast-${id}`
          const title = TITLES[type].title
          const textColor = TITLES[type].textColor
          return (
            <Toast
              nativeID={uniqueToastId}
              action={type}
              variant='outline'
              className='bg-background translate-y-12'
            >
              <ToastTitle className={textColor}>{title}</ToastTitle>
              <ToastDescription>{description}</ToastDescription>
            </Toast>
          )
        },
      })
    },
    [toast],
  )

  return {
    show,
  }
}
