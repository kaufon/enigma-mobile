import { View, ScrollView } from "react-native";
import {  ButtonText, ButtonSpinner } from "@/src/ui/gluestack/button";
import { ControlledInput } from "@/src/ui/widgets/global/components/controlled-input/controlled-input-view";
import { FormSection } from "@/src/ui/widgets/global/components/format-section";
import { ControlledPasswordInput } from "@/src/ui/widgets/global/components/controlled-password-input/controlled-password-input-view";
import type { FolderDto } from "@/src/core/dtos/folder";
import { CategorySelect } from "@/src/ui/widgets/global/components/category-select/category-select-view";
import { Button } from "@/src/ui/widgets/global/components/button";

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
		<View className="w-full px-4 pb-8 flex-1">

			<ScrollView showsVerticalScrollIndicator={false}>
				<FormSection title="Informações do Item" />
				<ControlledInput name="title" control={control} label="Nome" />

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
				<CategorySelect
					name="categoryId"
					control={control}
					label="Pasta da credencial (Opcional)"
					folders={folders}
				/>
			</ScrollView>

			<Button
				onPress={handleSubmit}
				isDisabled={!isValid || isSubmitting}
        hasFlex={false}
				className="mt-6 bg-primary-500"
			>
				{isSubmitting && <ButtonSpinner mr="$2" />}
				<ButtonText className="text-accent-500">Salvar</ButtonText>
			</Button>
		</View>
	);
};
