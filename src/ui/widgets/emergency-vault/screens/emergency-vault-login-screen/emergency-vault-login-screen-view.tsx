
import { Text, View } from '@/src/ui/widgets/global/components/Themed';
import {  ButtonText, ButtonSpinner } from '@/src/ui/gluestack/button';
import { ControlledPasswordInput } from '@/src/ui/widgets/global/components/controlled-password-input/controlled-password-input-view';
import { Button } from '@/src/ui/widgets/global/components/button';

type Props = {
  control: any;
  handleSubmit: () => void;
  isSubmitting: boolean;
}

export const EmergencyVaultLoginScreenView = ({control,handleSubmit,isSubmitting}:Props) => {

  return (
    <View className="flex-1 justify-center p-4 bg-background-500">
      <Text className="text-3xl font-bold text-accent-500 mb-4 text-center">
        Cofre de Emergência
      </Text>
      <Text className="text-neutral-500 mb-8 text-center">
        Esta é uma área restrita. Insira sua senha de emergência para desbloquear o acesso.
      </Text>
      
      <ControlledPasswordInput
        name="password"
        control={control}
        label="Senha de Emergência"
      />
      
      <Button
        onPress={handleSubmit}
        isDisabled={isSubmitting}
        className="mt-6 bg-primary-500"
      >
        {isSubmitting && <ButtonSpinner mr="$2" />}
        <ButtonText className='text-accent-500'>Desbloquear</ButtonText>
      </Button>
    </View>
  );
};
