import { View, ScrollView } from "react-native";
import { Stack } from "expo-router";
import { Text } from "@/src/ui/widgets/global/components/Themed";
import {  ButtonSpinner, ButtonText } from "@/src/ui/gluestack/button";
import { FormSection } from "@/src/ui/widgets/global/components/format-section";
import { Switch } from "@/src/ui/gluestack/switch";
import { Controller } from "react-hook-form";
import { Select } from "@/src/ui/widgets/global/components/select";
import { ControlledPasswordInput } from "@/src/ui/widgets/global/components/controlled-password-input/controlled-password-input-view";
import { Button } from "@/src/ui/widgets/global/components/button";

const scheduleOptions = [
	{ label: "Diariamente", value: "daily" },
	{ label: "Semanalmente", value: "weekly" },
	{ label: "Mensalmente", value: "monthly" },
	{ label: "A cada segundo (DEV)", value: "1s" },
];

type Props = {
	control: any;
	handleSubmit: VoidFunction;
	isSubmitting: boolean;
	isValid: boolean;
};

export const ReportsNotificationScreenView = ({
	control,
	handleSubmit,
	isSubmitting,
	isValid,
}: Props) => {

	return (
		<View className="flex-1 bg-background-500 p-4">
			<Stack.Screen options={{ title: "Notificações de Saúde" }} />
			<ScrollView>
				<FormSection title="Notificações por E-mail" />
				<Controller
					control={control}
					name="reportNotificationEnabled"
					render={({ field: { onChange, value } }) => (
						<View className="bg-background-500 border border-neutral-500/20  p-4 rounded-lg flex-row justify-between items-center">
							<Text className="text-accent-500 text-base">
								Habilitar notificações
							</Text>
							<Switch value={value} onValueChange={onChange} />
						</View>
					)}
				/>

				<Select
					name="reportNotificationSchedule"
					control={control}
					label="Frequência"
					options={scheduleOptions}
				/>

				<FormSection title="Confirmação" />
				<ControlledPasswordInput
					name="masterPassword"
					control={control}
					label="Sua Senha Mestra"
				/>

				<Button
					onPress={handleSubmit}
					isDisabled={!isValid || isSubmitting}
					className="mt-6 bg-primary-500"
				>
					{isSubmitting && <ButtonSpinner mr="$2" />}
					<ButtonText className="text-accent-500">Salvar Configurações</ButtonText>
				</Button>
			</ScrollView>
		</View>
	);
};
