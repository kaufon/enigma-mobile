import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'; 
import { z } from 'zod';
import { emailSchema, passwordSchema } from '@/src/validation/schemas/zod';

const signInSchema = z.object({
  email: emailSchema,
  password: passwordSchema
});

type FormData = z.infer<typeof signInSchema>;

type Params = {
  onSignIn: (email: string, password: string) => Promise<void>;
};

export function useSignInScreen({ onSignIn }: Params) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(signInSchema), // Integra o Zod para validação automática
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleSignIn = async (data: FormData) => {
    setIsLoading(true);
    setError(null);
    try {
      await onSignIn(data.email, data.password);
    } catch (e) {
      setError(e.message || 'Ocorreu um erro inesperado.');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    control, 
    handleSubmit: handleSubmit(handleSignIn), 
    formErrors: errors, 
    isLoading,
    apiError: error,
  };
}
