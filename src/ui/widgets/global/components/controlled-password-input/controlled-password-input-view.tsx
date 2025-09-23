// Crie um novo arquivo: src/ui/widgets/global/components/controlled-input/ControlledPasswordInput.tsx

import { Controller, type Control, type FieldValues, type Path } from 'react-hook-form';
import { PasswordInput } from '../password-input'; // Seu componente de senha original
import { Text } from '../Themed'; // Seu componente de texto
import { View } from 'react-native';

type Props<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  hasStrength?: boolean;
};

export const ControlledPasswordInput = <T extends FieldValues>({
  control,
  name,
  ...props
}: Props<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <View>
          <PasswordInput
            // O `onChange` do seu componente recebe a `onChange` do Controller
            onChange={onChange}
            // `onBlur` e `value` não são usados diretamente pelo seu PasswordInput,
            // pois ele tem seu próprio estado interno, mas a conexão principal é o onChange.
            {...props}
          />
          {error && <Text className="text-danger-500 mt-1">{error.message}</Text>}
        </View>
      )}
    />
  );
};
