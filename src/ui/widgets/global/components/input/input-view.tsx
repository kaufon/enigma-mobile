import { Input, InputField, InputSlot } from "@/src/ui/gluestack/input";
import { Icon } from "@/src/ui/widgets/global/components/icon";
import type { IconName } from "../icon/types";
import { mergeClassNames } from "@/src/ui/widgets/global/utils";
import { Text } from "@/src/ui/widgets/global/components/Themed";

type Props = {
	type?: "text" | "password" | "number";
	value?: string;
	defaultValue?: string;
	label?: string;
	icon: IconName;
	placeholder?: string;
	endContent?: React.ReactNode;
	className?: string;
	onChange?: (value: string) => void;
};

export const InputView = ({
	type = "text",
	value,
	defaultValue,
	label,
	icon,
	placeholder,
	endContent,
	className,
	onChange,
}: Props) => {
	return (
		<Input
			variant="outline"
			className={mergeClassNames(
				"h-16 border border-neutral-500/20 bg-background-500 pt-5 px-4",
				className,
			)}
			isDisabled={false}
			isInvalid={false}
			isReadOnly={false}
		>
			{label && (
				<InputSlot className="absolute top-2 left-5 text-sm">
					<Text>{label}</Text>
				</InputSlot>
			)}
			<InputField
				type={type === "number" ? "text" : type}
				value={value ?? defaultValue ?? undefined}
				autoCapitalize="none"
				onChangeText={onChange}
				keyboardType={type === "number" ? "numeric" : "default"}
				className={mergeClassNames("text-md text-accent-500", label && "translate-y-2")}
			/>
			{endContent && <InputSlot className="pl-3 pb-3">{endContent}</InputSlot>}
		</Input>
	);
};
