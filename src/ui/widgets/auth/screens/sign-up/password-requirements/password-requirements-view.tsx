import { Icon } from "@/src/ui/widgets/global/components/icon";
import { Text } from "@/src/ui/widgets/global/components/Themed";
import { View } from "react-native";

const RequirementItem = ({
	label,
	isMet,
}: { label: string; isMet: boolean }) => {
	const iconName = isMet ? "circle-check" : "circle";
	const colorClass = isMet ? "text-primary" : "text-neutral-500";
  const iconColor = isMet ? "primary" : "accent"; 

	return (
		<View className="flex-row items-center space-x-2 gap-2">
			<Icon name={iconName} size={16} color={iconColor} />
			<Text className={colorClass}>{label}</Text>
		</View>
	);
};

export type Requirements = {
	hasLower: boolean;
	hasUpper: boolean;
	hasDigit: boolean;
	hasSpecial: boolean;
	hasLength: boolean;
};

export const PasswordRequirementsView = ({
	requirements,
}: { requirements: Requirements }) => {
	return (
		<View className="flex flex-col gap-2 my-2">
			<RequirementItem
				label="1 Caracter minúsculo"
				isMet={requirements.hasLower}
			/>
			<RequirementItem
				label="1 Caracter maiúsculo"
				isMet={requirements.hasUpper}
			/>
			<RequirementItem label="1 Dígito" isMet={requirements.hasDigit} />
			<RequirementItem
				label="1 Caracter especial"
				isMet={requirements.hasSpecial}
			/>
			<RequirementItem
				label="No mínimo 12 caracteres"
				isMet={requirements.hasLength}
			/>
		</View>
	);
};
