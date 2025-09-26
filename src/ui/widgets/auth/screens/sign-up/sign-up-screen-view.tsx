import { View } from "react-native";
import { Link, Stack } from "expo-router";
import { ButtonSpinner, ButtonText } from "@/src/ui/gluestack/button";
import { Button } from "@/src/ui/widgets/global/components/button";
import { Text } from "@/src/ui/widgets/global/components/Themed";
import { ControlledInput } from "@/src/ui/widgets/global/components/controlled-input/controlled-input-view";
import { Pressable } from "@/src/ui/widgets/global/components/pressable";
import { ControlledPasswordInput } from "@/src/ui/widgets/global/components/controlled-password-input/controlled-password-input-view";
import { PasswordRequirements } from "@/src/ui/widgets/auth/screens/sign-up/password-requirements";
import { Requirements } from "@/src/ui/widgets/auth/screens/sign-up/password-requirements/password-requirements-view";

type Props = {
	control: any;
	handleSubmit: () => void;
	isSubmitting: boolean;
	isValid: boolean;
	passwordRequirements: Requirements;
};

export default function SignUpScreenView({
	control,
	handleSubmit,
	isSubmitting,
	isValid,
	passwordRequirements,
}: Props) {
	return (
		<View className="flex-1 bg-background-500 p-4 justify-center gap-8">
			<Stack.Screen options={{ title: "Criar Conta" }} />

			<View className="w-full max-w-md mx-auto flex-1 justify-center  flex ">
				<Text className="text-3xl font-bold text-accent-500 mb-6 text-center">
					Bem vindo ao Enigma!
				</Text>

				<View className="h-[80%]  w-full  ">
					<View className="flex flex-col gap-4 mb-6">
						<ControlledInput
							name="email"
							control={control}
							label="Email"
							placeholder="seu@email.com"
						/>
						<ControlledPasswordInput
							name="password"
							control={control}
							label="Senha"
							hasStrength
						/>
						<ControlledPasswordInput
							name="confirmPassword"
							control={control}
							label="Confirmar Senha"
							hasStrength
						/>
						<PasswordRequirements requirements={passwordRequirements} />
					</View>

					<View className="gap-28 flex flex-col ">
						<Button
							onPress={handleSubmit}
							isDisabled={!isValid || isSubmitting}
							className="mt-6 bg-primary-500"
						>
							{isSubmitting && <ButtonSpinner mr="$2" />}
							<ButtonText>Criar Conta</ButtonText>
						</Button>

						<Link href="/auth/sign-in" asChild>
							<Pressable className="mt-4">
								<Text className="text-center text-bold text-primary-500">
									Já tem uma conta? Faça login
								</Text>
							</Pressable>
						</Link>
					</View>
				</View>
			</View>
		</View>
	);
}
