import { View, Pressable } from "react-native";
import { Switch } from "@/src/ui/gluestack/switch";
import { Text } from "@/src/ui/widgets/global/components/Themed";
import {  ButtonText } from "@/src/ui/gluestack/button";
import { Controller } from "react-hook-form";
import * as Clipboard from "expo-clipboard";
import { useToast } from "@/src/hooks/use-toast";
import { FormModal } from "@/src/ui/widgets/global/components/form-modal";
import { ControlledInput } from "@/src/ui/widgets/global/components/controlled-input/controlled-input-view";
import { Select } from "@/src/ui/widgets/global/components/select";
import { ControlledPasswordInput } from "@/src/ui/widgets/global/components/controlled-password-input/controlled-password-input-view";
import { Button } from "@/src/ui/widgets/global/components/button";

const expiryOptions = [
	{ label: "1 Hora", value: "1h" },
	{ label: "24 Horas", value: "24h" },
	{ label: "7 Dias", value: "7d" },
];

type Props = {
	isOpen: boolean;
	onClose: () => void;
	control: any;
	handleSubmit: () => void;
	isSubmitting: boolean;
	isValid: boolean;
	generatedLink: string | null;
};

export const CreateShareFormView = ({
	isOpen,
	onClose,
	control,
	handleSubmit,
	isValid,
	isSubmitting,
	generatedLink,
}: Props) => {
	const { show } = useToast();

	const copyLink = async () => {
		await Clipboard.setStringAsync(generatedLink!);
		show("Link copiado para a área de transferência!", "success");
		onClose();
	};

	if (generatedLink) {
		return (
			<FormModal
				isOpen={isOpen}
				onClose={onClose}
				title="Link Gerado"
				description="Qualquer pessoa com este link pode ver a credencial. O link inclui a chave de descriptografia."
				children={
					<ControlledInput
						control={control}
						name="link"
						label="Link Secreto"
						value={generatedLink}
						isReadOnly
					/>
				}
				footer={
					<Button onPress={copyLink}>
						<ButtonText>Copiar e Fechar</ButtonText>
					</Button>
				}
			/>
		);
	}

	return (
		<FormModal
			isOpen={isOpen}
			onClose={onClose}
			title="Compartilhar Credencial"
			children={
				<View className="gap-4">
					<Select
						name="expiresIn"
						control={control}
						label="Tempo de Expiração"
						options={expiryOptions}
					/>
					<Controller
						control={control}
						name="deleteOnRead"
						render={({ field: { onChange, value } }) => (
							<View className="flex-row items-center justify-between bg-surface-500 p-3 rounded-md">
								<Text className="text-accent-500">Excluir após ser lido</Text>
								<Switch value={value} onValueChange={onChange} />
							</View>
						)}
					/>
					<ControlledPasswordInput
						name="masterPassword"
						control={control}
						label="Sua Senha Mestra"
					/>
				</View>
			}
			footer={
				<>
					<Button variant="outline" className="bg-danger-500" onPress={onClose}>
						<ButtonText className="text-accent-500">Cancelar</ButtonText>
					</Button>
					<Button onPress={handleSubmit} className="bg-primary-500" isDisabled={!isValid || isSubmitting}>
						<ButtonText className="text-accent-500">Gerar Link</ButtonText>
					</Button>
				</>
			}
		/>
	);
};
