import { View, Pressable } from "react-native";
import { Stack } from "expo-router";
import {  ButtonSpinner, ButtonText } from "@/src/ui/gluestack/button";
import { Text } from "@/src/ui/widgets/global/components/Themed";
import { FormSection } from "@/src/ui/widgets/global/components/format-section";
import { Icon } from "@/src/ui/widgets/global/components/icon";
import { ControlledPasswordInput } from "@/src/ui/widgets/global/components/controlled-password-input/controlled-password-input-view";
import { Button } from "@/src/ui/widgets/global/components/button";

type Props = {
	control: any;
	handleSubmit: VoidFunction;
	isSubmitting: boolean;
	isValid: boolean;
	fileName: string | null;
	handlePickDocument: VoidFunction;
};

export const ImportVaultScreenView = ({
	control,
	handleSubmit,
	isValid,
	isSubmitting,
	fileName,
	handlePickDocument,
}: Props) => {
	return (
		<View className="flex-1 bg-background-500 p-4">
			<Stack.Screen options={{ title: "Importar Cofre" }} />

			<Text className="text-neutral-500 mb-4">
				Importe um arquivo .json ou .csv de outro gerenciador de senhas. Você
				precisará confirmar sua senha mestra para completar a ação.
			</Text>

			<FormSection title="Arquivo para Importar" />
			<Pressable
				onPress={handlePickDocument}
				className="bg-background-500 p-4 h-16 rounded-md flex-row justify-between items-center border border-dashed border-neutral-500/50"
			>
				<Icon name="file" size={20} color="neutral" />
				<Text className="text-accent-500 text-base" numberOfLines={1}>
					{fileName || "Nenhum arquivo selecionado"}
				</Text>
				<Icon name="arrow-down" size={16} color="neutral"/>
			</Pressable>

			<View className="mt-4">
				<FormSection title="Confirmação" />
				<ControlledPasswordInput
					name="password"
					control={control}
					label="Senha Mestra"
				/>
			</View>

			<Button
				onPress={handleSubmit}
				isDisabled={!isValid || isSubmitting}
				className="mt-6 bg-primary-500"
			>
				{isSubmitting && <ButtonSpinner mr="$2" />}
				<ButtonText className="text-accent-500">Importar Cofre</ButtonText>
			</Button>
		</View>
	);
};
