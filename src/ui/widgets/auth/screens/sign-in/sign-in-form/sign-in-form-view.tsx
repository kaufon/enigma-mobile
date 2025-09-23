import { Controller } from "react-hook-form";
import { PasswordInput } from "@/src/ui/widgets/global/components/password-input";
import { Input } from "@/src/ui/widgets/global/components/input";
import { Box } from "@/src/ui/gluestack/box";
import { useSignInForm } from "@/src/ui/widgets/auth/screens/sign-in/sign-in-form/use-sign-in-form";
import { Link } from "expo-router";
import { Button } from "@/src/ui/widgets/global/components/button";
import { Text } from "@/src/ui/widgets/global/components/Themed";

type Props = {
	onSignIn: (email: string, password: string) => Promise<void>;
};

export const SignInFormView = ({ onSignIn }: Props) => {
	const { isSubmitting, isValid, control, handleSubmit } =
		useSignInForm(onSignIn);
	return (
		<Box>
			<Box>
				<Controller
					control={control}
					name="email"
					render={({ field: { onChange } }) => (
						<Input
							icon="email"
							placeholder="Digite seu e-mail"
							label="E-mail"
							onChange={onChange}
						/>
					)}
				/>
			</Box>
			<Box>
				<Controller
					control={control}
					name="password"
					render={({ field: { onChange } }) => (
						<PasswordInput label="Senha" onChange={onChange} />
					)}
				/>
			</Box>
			<Box className="flex flex-row items-center justify-between mt-6">
				<Link href="/auth/sign-up" className="text-primary p-2">
					Esqueceu sua senha?
				</Link>
				<Link href="/auth/sign-up" className="text-primary p-2">
					Criar conta
				</Link>
			</Box>

			<Box className="mt-12 bg-primary">
				<Button
					onPress={handleSubmit}
					isDisabled={!isValid}
					isLoading={isSubmitting}
          className="bg-[#599BFF] text-white"
				>
					Entrar
				</Button>
			</Box>
		</Box>
	);
};
