
import { Controller, type Control, type FieldValues, type Path } from 'react-hook-form';
import { PasswordInput } from '../password-input'; 
import { Text } from '../Themed'; 
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
            onChange={onChange}
            {...props}
          />
          {error && <Text className="text-danger-500 mt-1">{error.message}</Text>}
        </View>
      )}
    />
  );
};
