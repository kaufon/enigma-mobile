import { useEffect, useState } from 'react';
import { useRest } from '@/src/hooks';
import type { CredentialDto } from '@/src/core/dtos/credentials';

export const useCredentialDetailsViewModel = (id: string) => {
  const [credential, setCredential] = useState<CredentialDto | null>(null);
  const [isLoading, setLoading] = useState(true);
  const { credentialService } = useRest();

  useEffect(() => {
    const fetchCredential = async () => {
      setLoading(true);
      try {
        const response = await credentialService.getById(id);
        if (response.isSuccess && response.body) {
          setCredential(response.body);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchCredential();
  }, [id, credentialService]);

  return { isLoading, credential };
};
