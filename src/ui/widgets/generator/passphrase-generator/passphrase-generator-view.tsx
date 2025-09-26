import { View } from "react-native";
import { Text } from "@/src/ui/widgets/global/components/Themed";
import { ButtonText } from "@/src/ui/gluestack/button";
import { Input, InputField } from "@/src/ui/gluestack/input";
import { Pressable } from "@/src/ui/gluestack/pressable";
import { Icon } from "@/src/ui/widgets/global/components/icon";
import { Button } from "@/src/ui/widgets/global/components/button";

const NumberStepper = ({
	label,
	value,
	onDecrement,
	onIncrement,
}: {
	label: string;
	value: number;
	onDecrement: () => void;
	onIncrement: () => void;
}) => (
	<View className="bg-surface-500 p-3 rounded-lg flex-row items-center justify-between">
		<View className="flex-col  gap-2 ">
			<Text className="text-accent-500">{label}</Text>

			<Text className="text-accent-500 font-bold text-lg w-8 text-center">
				{value}
			</Text>
		</View>
		<View className="flex-row items-center gap-4 space-x-4">
			<Pressable
				onPress={onDecrement}
				className="p-2 bg-background-500 rounded-full"
			>
				<Icon name="minus" size={20} color="primary" />
			</Pressable>
			<Pressable
				onPress={onIncrement}
				className="p-2 bg-background-500 rounded-full"
			>
				<Icon name="plus" size={20} color="primary" />
			</Pressable>
		</View>
	</View>
);

type Props = {
	wordCount: number;
	separator: string;
	setWordCount: (count: number) => void;
	setSeparator: (sep: string) => void;
	generatedPassphrase: string;
	generatePassphrase: () => void;
	copyToClipboard: () => void;
};

export default function PassphraseGeneratorScreen({
	wordCount,
	setSeparator,
	setWordCount,
	separator,
	generatePassphrase,
	generatedPassphrase,
	copyToClipboard,
}: Props) {
	return (
		<View className="flex-1 bg-background-500 p-4">
			<View className="bg-surface-500 p-4 rounded-lg flex-row items-center justify-between">
				<Text
					className="text-accent-500 text-lg font-mono flex-1"
					numberOfLines={6}
				>
					{generatedPassphrase}
				</Text>
				<Pressable onPress={generatePassphrase} className="p-2 ml-2">
					<Icon name="generator" size={20} color="primary" />
				</Pressable>
			</View>
			<Button
				hasFlex={false}
				onPress={copyToClipboard}
				className="mt-4 bg-primary-500 rounded-full"
			>
				<ButtonText className="text-accent-500">Copiar</ButtonText>
			</Button>

			<View className="mt-8 space-y-4">
				<NumberStepper
					label="Número de Palavras"
					value={wordCount}
					onDecrement={() => setWordCount((prev) => Math.max(3, prev - 1))}
					onIncrement={() => setWordCount((prev) => Math.min(20, prev + 1))}
				/>

				<View className="bg-surface-500 p-3 rounded-t-none rounded-br-lg rounded-l-lg border-t border-accent-500/20">
					<Text className="text-accent-500 mb-2">Separador de Palavras</Text>
					<Input>
						<InputField
							value={separator}
							onChangeText={setSeparator}
							maxLength={1}
							className="text-accent-500 text-start "
						/>
					</Input>
				</View>
			</View>
		</View>
	);
}
