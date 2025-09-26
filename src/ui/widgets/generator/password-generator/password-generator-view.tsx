import { View } from "react-native";
import { Stack } from "expo-router";
import { Text } from "@/src/ui/widgets/global/components/Themed";
import { ButtonText } from "@/src/ui/gluestack/button";
import {
	Slider,
	SliderFilledTrack,
	SliderThumb,
	SliderTrack,
} from "@/src/ui/gluestack/slider";
import { Switch } from "@/src/ui/gluestack/switch";
import { Icon } from "@/src/ui/widgets/global/components/icon";
import { Pressable } from "@/src/ui/widgets/global/components/pressable";
import { useColorScheme } from "nativewind";
import { COLORS } from "@/src/constants";
import { Button } from "@/src/ui/widgets/global/components/button";

const OptionSwitch = ({
	label,
	value,
	onValueChange,
	hasBorderBottom = true,
	hasRoundedTop = false,
	hasRoundedBottom = false,
}: {
	label: string;
	value: boolean;
	hasBorderBottom?: boolean;
	hasRoundedTop?: boolean;
	hasRoundedBottom?: boolean;
	onValueChange: (val: boolean) => void;
}) => (
	<View
		className={`flex-row items-center bg-surface-500 p-3 justify-between ${hasBorderBottom ? "border-b border-accent-500/20" : ""} ${hasRoundedTop ? "rounded-t-lg" : ""} ${hasRoundedBottom ? "rounded-b-lg" : ""}`}
	>
		<Text className="text-accent-500">{label}</Text>
		<Switch
			value={value}
			onValueChange={onValueChange}
			trackColor={{ false: COLORS.dark.neutral, true: COLORS.dark.primary }}
			thumbColor={COLORS.dark.accent}
		/>
	</View>
);

type Props = {
	length: number;
	includeUppercase: boolean;
	includeLowercase: boolean;
	includeDigits: boolean;
	includeSpecial: boolean;
	setLength: (length: number) => void;
	setIncludeUppercase: (include: boolean) => void;
	setIncludeLowercase: (include: boolean) => void;
	setIncludeDigits: (include: boolean) => void;
	setIncludeSpecial: (include: boolean) => void;
	generatedPassword: string;
	generatePassword: () => void;
	copyToClipboard: () => void;
};

export const PasswordGeneratorScreenView = ({
	length,
	includeUppercase,
	includeLowercase,
	includeDigits,
	includeSpecial,
	setLength,
	setIncludeDigits,
	setIncludeSpecial,
	setIncludeLowercase,
	setIncludeUppercase,
	generatedPassword,
	generatePassword,
	copyToClipboard,
}: Props) => {
	const { colorScheme } = useColorScheme();
	const theme = COLORS[colorScheme || "light"];
	return (
		<View className="flex-1 bg-background-500 p-4">
			<View className="bg-surface-500 p-4 rounded-lg flex-row items-center justify-between">
				<Text
					className="text-accent-500 text-lg font-mono flex-1"
					numberOfLines={1}
				>
					{generatedPassword}
				</Text>
				<Pressable onPress={generatePassword} className="p-2 ml-2">
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
			<View className="mt-8">
				<View className="bg-surface-500 p-4 rounded-lg gap-8 flex-row items-center justify-between">
					<View className="flex-col items-center justify-between">
						<Text className="text-accent-500">Comprimento</Text>
						<Text className="text-accent-500 font-bold  w-full">{length}</Text>
					</View>
					<View className="flex-1 w-full">
						<Slider
							value={length}
							minValue={5}
							maxValue={100}
							step={1}
							onChange={(val) => setLength(val)}
							className="my-2 bg-neutral-500"
						>
							<SliderTrack>
								<SliderFilledTrack />
							</SliderTrack>
							<SliderThumb />
						</Slider>
					</View>
				</View>
				<View className="mt-4">
					<OptionSwitch
						label="A-Z"
						value={includeUppercase}
						onValueChange={setIncludeUppercase}
						hasRoundedTop={true}
					/>
					<OptionSwitch
						label="a-z"
						value={includeLowercase}
						onValueChange={setIncludeLowercase}
					/>
					<OptionSwitch
						label="0-9"
						value={includeDigits}
						onValueChange={setIncludeDigits}
					/>
					<OptionSwitch
						label="!@#$%^&*"
						value={includeSpecial}
						onValueChange={setIncludeSpecial}
						hasBorderBottom={false}
						hasRoundedBottom={true}
					/>
				</View>
			</View>
		</View>
	);
};
