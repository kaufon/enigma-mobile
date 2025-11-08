// Crie este novo hook
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useState } from 'react';
import { useToast } from '@/src/hooks/use-toast';
import { useRest } from '@/src/hooks';
import { useNavigation } from 'expo-router';

const createShareSchema = z.object({
  masterPassword: z.string().min(1, 'Senha mestra é obrigatória.'),
  expiresIn: z.enum(["1h", "24h", "7d"]),
  deleteOnRead: z.boolean(),
});
type CreateShareSchema = z.infer<typeof createShareSchema>;

export const useCreateShareForm = (credentialId: string,onSucess:VoidFunction) => {
  const { show } = useToast();
  const { shareService } = useRest();
  const router = useNavigation()
  
  const [generatedLink, setGeneratedLink] = useState<string | null>(null);

  const { control, handleSubmit, formState: { isSubmitting, isValid } } = useForm<CreateShareSchema>({
    resolver: zodResolver(createShareSchema),
    defaultValues: { expiresIn: '24h', deleteOnRead: false },
  });

  const handleFormSubmit = async (data: CreateShareSchema) => {
    try {
      const response = await shareService.create({ ...data, credentialId });
      console.log(response);
      if (response.isSuccess && response.body) {
        setGeneratedLink(response.body.shareUrl); 
        show('Link criado com sucesso!', 'success');
        onSucess()
        
      } else {
        show(response.errorMessage || 'Falha ao criar o link.', 'error');
      }
    } catch (e) {
      show('Ocorreu um erro.', 'error');
    }
  };

  return { control, handleSubmit: handleSubmit(handleFormSubmit), isSubmitting, isValid, generatedLink };
};
