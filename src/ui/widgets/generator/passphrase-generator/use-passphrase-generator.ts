
import { useState, useCallback, useEffect } from 'react';
import * as Clipboard from 'expo-clipboard';
import { useToast } from '@/src/hooks/use-toast';
import { faker } from '@faker-js/faker'; 


export const usePassphraseGeneratorViewModel = () => {
  const { show } = useToast();

  const [wordCount, setWordCount] = useState(4);
  const [separator, setSeparator] = useState('-');
  const [generatedPassphrase, setGeneratedPassphrase] = useState('');

  const generatePassphrase = useCallback(() => {
    const selectedWords = [];
    for (let i = 0; i < wordCount; i++) {
      selectedWords.push(faker.lorem.word());
    }
    setGeneratedPassphrase(selectedWords.join(separator));
  }, [wordCount, separator]);

  useEffect(() => {
    generatePassphrase();
  }, [generatePassphrase]);

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(generatedPassphrase);
    show('Frase Secreta copiada!', 'success');
  };

  return {
    wordCount,
    setWordCount,
    separator,
    setSeparator,
    generatedPassphrase,
    generatePassphrase,
    copyToClipboard,
  };
};
