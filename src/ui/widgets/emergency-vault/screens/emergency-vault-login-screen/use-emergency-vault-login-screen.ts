import { z } from 'zod';

export const emergencyLoginSchema = z.object({
  password: z.string().min(1, 'A senha de emergência é obrigatória.'),
});

export type EmergencyLoginSchema = z.infer<typeof emergencyLoginSchema>;
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useToast } from '@/src/hooks/use-toast';
import { useEmergencyVault } from '@/src/ui/widgets/emergency-vault/contexts/emergency-vault-context';

export const useEmergencyLoginForm = () => {
  const { login } = useEmergencyVault();
  const { show } = useToast();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<EmergencyLoginSchema>({
    resolver: zodResolver(emergencyLoginSchema),
    defaultValues: { password: '' },
    mode: 'onChange',
  });

  const handleFormSubmit = async (data: EmergencyLoginSchema) => {
    const success = await login(data.password);
    
    if (!success) {
      show('Senha de emergência incorreta.', 'error');
    }
  };

  return {
    control,
    handleSubmit: handleSubmit(handleFormSubmit),
    isSubmitting,
  };
};
