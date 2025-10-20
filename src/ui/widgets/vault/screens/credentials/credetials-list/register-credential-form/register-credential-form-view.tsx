import { ScrollView, View, KeyboardAvoidingView, Platform } from "react-native";
import { ButtonText, ButtonSpinner } from "@/src/ui/gluestack/button";
import { FormSection } from "@/src/ui/widgets/global/components/format-section";
import type { FolderDto } from "@/src/core/dtos/folder";
import { Button } from "@/src/ui/widgets/global/components/button";
import { ControlledInput } from "@/src/ui/widgets/global/components/controlled-input/controlled-input-view";
import { CategorySelect } from "@/src/ui/widgets/global/components/category-select/category-select-view";
import { ControlledPasswordInput } from "@/src/ui/widgets/global/components/controlled-password-input/controlled-password-input-view";

type Props = {
  handleSubmit: () => void;
  isSubmitting: boolean;
  isValid: boolean;
  control: any;
  folders: FolderDto[];
  isLoadingFolders: boolean;
};

export const RegisterCredentialFormView = ({
  handleSubmit,
  isSubmitting,
  isValid,
  control,
  folders,
  isLoadingFolders,
}: Props) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0} 
    >
      <View className="w-full px-4 pb-8 flex-1">
        <ScrollView showsVerticalScrollIndicator={false}>
          <FormSection title="Informações do Item" />
          <ControlledInput name="title" control={control} label="Nome" />

          <CategorySelect
            name="folderId" 
            control={control}
            label="Pasta da credencial (Opcional)"
            folders={folders}
          />
          <FormSection title="Credenciais de acesso" />
          <ControlledInput
            name="username"
            control={control}
            label="Nome de usuário"
          />
          <ControlledPasswordInput
            hasStrength
            name="password"
            control={control}
            label="Senha"
          />
          <ControlledInput
            name="url"
            control={control}
            label="URL do site (Opcional)"
          />
        </ScrollView>

        <Button
          onPress={handleSubmit}
          isDisabled={!isValid || isSubmitting}
          className="mt-6 bg-primary-500"
        >
          {isSubmitting && <ButtonSpinner mr="$2" />}
          <ButtonText className="text-accent-500">Salvar</ButtonText>
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
};
