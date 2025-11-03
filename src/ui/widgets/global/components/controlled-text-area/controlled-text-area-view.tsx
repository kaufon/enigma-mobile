import { Controller, type Control, type FieldValues, type Path } from 'react-hook-form';
import { Textarea, TextareaInput } from '@/src/ui/gluestack/textarea';
import { Text, View } from '@/src/ui/widgets/global/components/Themed';

type Props<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
};

export const ControlledTextAreaView = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
}: Props<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <View className="my-2">
          <Text className="text-neutral-500 mb-2">{label}</Text>
          <Textarea
            className="h-48 border border-neutral-500/20 bg-surface-500 p-4 rounded-md"
            isInvalid={!!error}
          >
            <TextareaInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              placeholderTextColor="#A9AFB7"
              className="text-accent-500 text-base"
              multiline
						  style={{ textAlignVertical: "top" }} 
            />
          </Textarea>
          {error && <Text className="text-danger-500 mt-1">{error.message}</Text>}
        </View>
      )}
    />
  );
};
