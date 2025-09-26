
import { useState, useCallback, useEffect } from 'react';
import * as Clipboard from 'expo-clipboard';
import { useRest } from '@/src/hooks';
import { useToast } from '@/src/hooks/use-toast';

export const useUsernameGeneratorViewModel = () => {
  const { show } = useToast();
  const { userService } = useRest();

  const [baseEmail, setBaseEmail] = useState('');
  const [generatedUsername, setGeneratedUsername] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      setIsLoading(true);
      try {
        const response = await userService.getProfile();
        if (response.isSuccess && response.body) {
          setBaseEmail(response.body.email);
        }
      } finally {
        setIsLoading(false);
      }
    };
    loadProfile();
  }, [userService]);

  const generateUsername = useCallback(() => {
    if (!baseEmail || !baseEmail.includes('@')) {
      setGeneratedUsername('');
      return;
    }

    const [localPart, domain] = baseEmail.split('@');
    const randomString = Math.random().toString(36).substring(2, 10);

    setGeneratedUsername(`${localPart}+${randomString}@${domain}`);
  }, [baseEmail]);

  useEffect(() => {
    generateUsername();
  }, [generateUsername]);

  const copyToClipboard = async () => {
    if (!generatedUsername) return;
    await Clipboard.setStringAsync(generatedUsername);
    show('Nome de usuário copiado!', 'success');
  };

  return {
    isLoading,
    baseEmail,
    setBaseEmail,
    generatedUsername,
    copyToClipboard,
    generateUsername,
  };
};
