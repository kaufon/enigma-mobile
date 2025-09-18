import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { passwordSchema } from '@/src/validation/schemas/zod'

const formSchema = z.object({
  email: z.email(),
  password: passwordSchema,
})

type FormSchema = z.infer<typeof formSchema>

export function useSignInForm(
  onSignIn: (email: string, password: string) => Promise<void>,
) {
  const { formState, control, handleSubmit } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  })

  async function handleFormSubmit(data: FormSchema) {
    await onSignIn(data.email, data.password)
  }

  return {
    isSubmitting: formState.isSubmitting,
    isValid: formState.isValid,
    control,
    handleSubmit: handleSubmit(handleFormSubmit),
  }
}
