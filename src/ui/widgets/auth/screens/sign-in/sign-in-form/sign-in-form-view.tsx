import { View, Text, TextInput, Button, ActivityIndicator } from 'react-native';
import { Controller } from 'react-hook-form';

type Props = {
  control: any;
  handleSubmit: () => void;
  isLoading: boolean;
  formErrors: any;
  apiError: string | null;
};

export const SignInFormView = ({ control, handleSubmit, isLoading, formErrors, apiError }: Props) => {
  return (
    <View>
      <Text>E-mail</Text>
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="seu@email.com"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        )}
      />
      {formErrors.email && <Text style={{ color: 'red' }}>{formErrors.email.message}</Text>}

      <Text style={{ marginTop: 20 }}>Senha</Text>
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Sua senha"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry
          />
        )}
      />
      {formErrors.password && <Text style={{ color: 'red' }}>{formErrors.password.message}</Text>}

      {apiError && <Text style={{ color: 'red', marginTop: 20 }}>{apiError}</Text>}
      
      {isLoading ? (
        <ActivityIndicator style={{ marginTop: 20 }} />
      ) : (
        <Button title="Entrar" onPress={handleSubmit} />
      )}
    </View>
  );
};
