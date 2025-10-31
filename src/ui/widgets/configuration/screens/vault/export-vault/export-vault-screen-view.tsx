import { View } from "react-native";
import { Stack } from "expo-router";
import { ButtonSpinner, ButtonText } from "@/src/ui/gluestack/button";
import { FormSection } from "@/src/ui/widgets/global/components/format-section";
import { ControlledPasswordInput } from "@/src/ui/widgets/global/components/controlled-password-input/controlled-password-input-view";
import { Button } from "@/src/ui/widgets/global/components/button";
import { Select } from "@/src/ui/widgets/global/components/select";


type Props = {
  control: any;
  handleSubmit: VoidFunction;
  isSubmitting: boolean;
  isValid: boolean;
};

const formatOptions = [
  { label: "JSON", value: "json" },
  { label: "CSV", value: "csv" },
];

export const ExportVaultScreenView = ({
  control,
  handleSubmit,
  isValid,
  isSubmitting,
}: Props) => {
  return (
    <View className="flex-1 bg-background-500 p-4">
      <Stack.Screen options={{ title: "Exportar Cofre" }} />

      <Select
        name="format"
        control={control}
        label="Formato do Arquivo"
        options={formatOptions}
        placeholder="Selecione um formato..."
      />

      <View className="mt-4">
        <FormSection title="Confirmação" />
        <ControlledPasswordInput
          name="password"
          control={control}
          label="Senha Mestra"
          hasStrength={false}
        />
      </View>

      <Button
        onPress={handleSubmit}
        isDisabled={!isValid || isSubmitting}
        className="mt-6 bg-primary-500"
      >
        {isSubmitting && <ButtonSpinner mr="$2" />}
        <ButtonText className="text-accent-500">Exportar Cofre</ButtonText>
      </Button>
    </View>
  );
};
