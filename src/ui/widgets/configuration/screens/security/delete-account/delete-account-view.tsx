import { View, KeyboardAvoidingView, Platform } from "react-native";
import { Stack, useRouter } from "expo-router";
import { ButtonSpinner, ButtonText } from "@/src/ui/gluestack/button";
import { Text } from "@/src/ui/widgets/global/components/Themed";
import {
	AlertDialog,
	AlertDialogBackdrop,
	AlertDialogBody,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogCloseButton,
} from "@/src/ui/gluestack/alert-dialog";
import { Heading } from "@/src/ui/gluestack/heading";
import { Icon } from "@/src/ui/widgets/global/components/icon";
import { ScrollView } from "react-native";
import { ControlledInput } from "@/src/ui/widgets/global/components/controlled-input/controlled-input-view";
import { ControlledPasswordInput } from "@/src/ui/widgets/global/components/controlled-password-input/controlled-password-input-view";
import { Button } from "@/src/ui/widgets/global/components/button";
import { COLORS } from "@/src/constants";
import { useColorScheme } from "nativewind";
import { HStack } from "@/src/ui/gluestack/hstack";
type Props = {
	deleteFormControl: any;
	handleDeleteSubmit: () => Promise<void>;
	isDeleteDisabled: boolean;
	isDeleteFormValid: boolean;
	isDeleteDialogOpen: boolean;
	setDeleteDialogOpen: (open: boolean) => void;
	initiateAccountDeletion: () => void;
	countdown: number;
};

export default function DeleteAccountScreenView({
	isDeleteDialogOpen,
	deleteFormControl,
	handleDeleteSubmit,
	isDeleteFormValid,
	isDeleteDisabled,
	setDeleteDialogOpen,
	initiateAccountDeletion,
	countdown,
}: Props) {
	const { navigate } = useRouter();
	const { colorScheme } = useColorScheme();
	const theme = colorScheme === "dark" ? COLORS.dark : COLORS.light;
	return (
		<View className="flex-1 bg-background-500 p-4 justify-between">
			<Stack.Screen options={{ title: "Excluir Conta" }} />
			<View className=" h-[50%] justify-between flex-col">
				<View>
					<Text
						className="text-lg text-center font-bold text-danger-500"
						style={{ color: theme.danger }}
					>
						Ação Irreversível
					</Text>
					<Text className="mt-2" style={{ color: theme.accent }}>
						A exclusão da sua conta removerá permanentemente todos os seus
						dados, incluindo senhas, notas e pastas. Uma vez excluída, sua conta
						não poderá ser recuperada.
					</Text>
				</View>

				<View className="gap-8">
					<Button
						variant="outline"
						onPress={initiateAccountDeletion}
						className="border-danger-500 rounded-full"
						hasFlex={false}
					>
						<ButtonText className="text-danger-500">
							Excluir Minha Conta Permanentemente
						</ButtonText>
					</Button>
					<Button
						variant="outline"
						onPress={() => navigate("/configuration/security")}
						className="border-primary-500 rounded-full"
						hasFlex={false}
					>
						<ButtonText className="text-primary-500">Cancelar</ButtonText>
					</Button>
				</View>
			</View>

			<AlertDialog
				isOpen={isDeleteDialogOpen}
				onClose={() => setDeleteDialogOpen(false)}
			>
				<AlertDialogBackdrop />
				<KeyboardAvoidingView
					behavior={Platform.OS === "ios" ? "position" : "height"}
          style={{width: '100%',justifyContent: 'center', alignItems: 'center'}}
				>
					<AlertDialogContent className="bg-surface-500 border-danger-500 rounded-xl">
						<AlertDialogHeader>
							<Heading className="text-danger-500">Confirmar Exclusão</Heading>
							<AlertDialogCloseButton>
								<Icon name="x" />
							</AlertDialogCloseButton>
						</AlertDialogHeader>
						<ScrollView>
							<AlertDialogBody>
								<Text
									className="text-neutral-500 mb-4"
									style={{ color: theme.accent }}
								>
									Esta ação é{" "}
									<Text style={{ color: theme.danger }}>permanente</Text>. Para
									confirmar, por favor, insira seu e-mail e senha atual.
								</Text>

								<ControlledInput
									name="email"
									control={deleteFormControl}
									label="Email"
									placeholder="Confirme seu e-mail"
								/>
								<ControlledPasswordInput
									name="passwordConfirmation"
									control={deleteFormControl}
									label="Senha Atual"
								/>
							</AlertDialogBody>
						</ScrollView>
						<AlertDialogFooter className="mt-5">
							<Button
								onPress={() => setDeleteDialogOpen(false)}
								className="mr-3 bg-primary-500 rounded-full"
							>
								<ButtonText className="text-accent-500">Cancelar</ButtonText>
							</Button>
							<Button
								onPress={handleDeleteSubmit}
								isDisabled={isDeleteDisabled || !isDeleteFormValid}
								variant="solid"
								className="bg-danger-500 border-danger-500 rounded-full w-full"
							>
								<HStack space="sm" alignItems="center">
									{isDeleteDisabled && <ButtonSpinner color="$white" />}
									<ButtonText className="text-accent-500 pl-5">
										{isDeleteDisabled ? `Excluir em (${countdown})` : "Excluir"}
									</ButtonText>
								</HStack>
							</Button>
						</AlertDialogFooter>
					</AlertDialogContent>
				</KeyboardAvoidingView>
			</AlertDialog>
		</View>
	);
}
