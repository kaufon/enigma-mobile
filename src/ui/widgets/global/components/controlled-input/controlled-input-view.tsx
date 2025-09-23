import { FormInput } from "@/src/ui/widgets/global/components/form-input";
import { Text } from "@/src/ui/widgets/global/components/Themed";
import {
	Controller,
	type Control,
	type FieldValues,
	type Path,
} from "react-hook-form";

type Props<T extends FieldValues> = {
	control: Control<T>;
	name: Path<T>;
	label: string;
	placeholder?: string;
	isPassword?: boolean;
};

export const ControlledInput = <T extends FieldValues>({
	control,
	name,
	...props
}: Props<T>) => {
	return (
		<Controller
			control={control}
			name={name}
			render={({
				field: { onChange, onBlur, value },
				fieldState: { error },
			}) => (
				<>
					<FormInput
						value={value}
						onChangeText={onChange}
						{...props}
					/>
					{error && (
						<Text className="text-danger-500 mt-1">{error.message}</Text>
					)}
				</>
			)}
		/>
	);
};
