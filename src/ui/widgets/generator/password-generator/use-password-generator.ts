import { useState, useCallback, useEffect } from 'react';
import * as Clipboard from 'expo-clipboard';
import { useToast } from '@/src/hooks/use-toast';

const UPPERCASE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWERCASE_CHARS = 'abcdefghijklmnopqrstuvwxyz';
const DIGITS_CHARS = '0123456789';
const SPECIAL_CHARS = '!@#$%^&*';

export const usePasswordGeneratorViewModel = () => {
  const { show } = useToast();

  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeDigits, setIncludeDigits] = useState(true);
  const [includeSpecial, setIncludeSpecial] = useState(true);

  const [generatedPassword, setGeneratedPassword] = useState('');

  const generatePassword = useCallback(() => {
    let charset = '';
    if (includeUppercase) charset += UPPERCASE_CHARS;
    if (includeLowercase) charset += LOWERCASE_CHARS;
    if (includeDigits) charset += DIGITS_CHARS;
    if (includeSpecial) charset += SPECIAL_CHARS;

    if (charset === '') {
      setGeneratedPassword('Selecione uma opção');
      return;
    }

    let newPassword = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      newPassword += charset[randomIndex];
    }
    setGeneratedPassword(newPassword);
  }, [length, includeUppercase, includeLowercase, includeDigits, includeSpecial]);

  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(generatedPassword);
    show('Senha copiada!', 'success');
  };

  return {
    length,
    setLength,
    includeUppercase,
    setIncludeUppercase,
    includeLowercase,
    setIncludeLowercase,
    includeDigits,
    setIncludeDigits,
    includeSpecial,
    setIncludeSpecial,
    generatedPassword,
    generatePassword, 
    copyToClipboard,
  };
};
