import {
	FormControl,
	FormControlLabelText,
} from "@/src/ui/gluestack/form-control";
import { Input, InputField } from "@/src/ui/gluestack/input";
import { Text } from "@/src/ui/widgets/global/components/Themed";
import { View } from "react-native";

type Props = {
	label: string;
	value: string;
	onChangeText: (text: string) => void;
	placeholder?: string;
};

export const FormInputView = ({ label, ...props }: Props) => {
	return (
		// Usamos uma View simples como container principal
		<View className="my-2">
			{/* O Input agora serve como container para o label e o input real */}
			<Input
				variant="outline"
				className="h-16 border border-neutral-500/20 bg-background-500 pt-5 px-4"
			>
				<Text className="text-neutral-500 absolute top-2 left-4 text-xs">
					{label}
				</Text>

				<InputField
					type="text"
					placeholderTextColor="#A9AFB7"
					className="text-accent-500 text-base"
					{...props}
				/>
			</Input>
		</View>
	);
};
