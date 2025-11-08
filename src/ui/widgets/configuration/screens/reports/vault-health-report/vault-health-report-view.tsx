import { Text, View } from "@/src/ui/widgets/global/components/Themed";
import { Stack } from "expo-router";
import { ButtonSpinner, ButtonText } from "@/src/ui/gluestack/button";
import { Button } from "@/src/ui/widgets/global/components/button";
type Props = {
	handleGenerateReport: VoidFunction;
	isSubmitting: boolean;
};
export const VaultHealthReportView = ({
	handleGenerateReport,
	isSubmitting,
}: Props) => {
	return (
		<View className="flex-1 bg-background-500 p-4">
			<Stack.Screen options={{ title: "Saúde do Cofre" }} />
			<Text className="text-neutral-500 mb-4">
				Gere um relatório em PDF sobre a saúde do seu cofre, incluindo senhas
				fracas, reutilizadas ou duplicadas.
			</Text>
			<Button
				onPress={handleGenerateReport} 
				isDisabled={isSubmitting} 
				className="mt-6 bg-primary-500"
			>
				{isSubmitting && <ButtonSpinner mr="$2" />}
				<ButtonText className="text-accent-500">Gerar Relatório em PDF</ButtonText>
			</Button>
		</View>
	);
};
