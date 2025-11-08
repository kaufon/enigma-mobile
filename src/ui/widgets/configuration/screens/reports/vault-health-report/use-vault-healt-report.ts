import { useState } from 'react';
import { useRest } from '@/src/hooks';
import * as FileSystem from 'expo-file-system/legacy';
import { Platform, Alert } from 'react-native'; 
import { useToast } from '@/src/hooks/use-toast';

export const useVaultHealthReport = () => {
  const { show } = useToast();
  const { reportService } = useRest();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleGenerateReport = async () => {
    setIsSubmitting(true);
    try {
      const response = await reportService.generateVaultHealthReport();
      
      if (response.isSuccess && response.body) {
        const { fileData, fileName } = response.body; 
        const mimeType = 'application/pdf';

        if (Platform.OS === "android") {
          try {
            const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
            if (!permissions.granted) {
              show("Permissão negada para salvar o arquivo.", "error");
              setIsSubmitting(false);
              return;
            }

            const fileUri = await FileSystem.StorageAccessFramework.createFileAsync(
              permissions.directoryUri,
              fileName,
              mimeType
            );

            await FileSystem.writeAsStringAsync(fileUri, fileData, {
              encoding: FileSystem.EncodingType.Base64, 
            });

            show("Relatório salvo com sucesso na pasta selecionada!", "success");
          } catch (safError: any) {
            console.error("SAF Error:", safError);
            show("Falha ao salvar o relatório no Android.", "error");
          }
        } else {
          try {
            const fileUri = FileSystem.documentDirectory + fileName;

            await FileSystem.writeAsStringAsync(fileUri, fileData, {
              encoding: FileSystem.EncodingType.Base64, 
            });
            Alert.alert(
              "Relatório Salvo",
              `O relatório "${fileName}" foi salvo com sucesso.\n\nPara acessá-lo, abra a app 'Ficheiros' (Files) e navegue para 'No Meu iPhone' > 'Enigma'.`,
              [{ text: "OK" }]
            );
          } catch (iosError) {
            console.error("iOS Save Error:", iosError);
            show("Falha ao salvar o relatório no iOS.", "error");
          }
        }
      } else {
        show(response.errorMessage || 'Falha ao gerar relatório.', 'error');
      }
    } catch (e: any) {
      show('Ocorreu um erro inesperado.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    handleGenerateReport,
  };
};
