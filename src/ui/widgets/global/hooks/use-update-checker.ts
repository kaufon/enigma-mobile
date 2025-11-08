import { Alert } from 'react-native';
import * as Updates from 'expo-updates';
import { useState } from 'react';
import { useToast } from '@/src/hooks/use-toast';

export const useUpdateChecker = () => {
  const { show } = useToast();
  const [isChecking, setIsChecking] = useState(false);

  const checkAndReload = async () => {
    if (__DEV__) {
      show("Atualizações só podem ser verificadas em um build (APK).", "info");
      return;
    }

    setIsChecking(true);
    try {
      const update = await Updates.checkForUpdateAsync();

      if (update.isAvailable) {
        await Updates.fetchUpdateAsync();
        
        
        Alert.alert(
          "Atualização Pronta!",
          "Uma nova versão do app foi baixada. Deseja reiniciar agora?",
          [
            { text: "Mais tarde", style: "cancel" },
            { 
              text: "Reiniciar Agora", 
              style: "default", 
              onPress: () => Updates.reloadAsync() 
            },
          ]
        );
      } else {
        show("Seu aplicativo já está atualizado.", "success");
      }
    } catch (error) {
      show("Falha ao verificar atualizações.", "error");
    } finally {
      setIsChecking(false);
    }
  };

  return { isChecking, checkAndReload };
};
