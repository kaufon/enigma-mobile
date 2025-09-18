import { Text } from "@/src/ui/gluestack/text";
import { mergeClassNames } from "@/src/ui/widgets/global/utils";
import { Box } from "lucide-react-native";

const STRENGTH_LEVELS = [
	{
		label: "Muito fraca",
		color: "bg-danger border-danger",
	},
	{
		label: "Muito fraca",
		color: "bg-danger border-danger",
	},
	{
		label: "Fraca",
		color: "bg-danger border-danger",
	},
	{
		label: "Boa",
		color: "bg-warning border-warning",
	},
	{
		label: "Forte",
		color: "bg-primary border-primary",
	},
	{
		label: "Muito forte",
		color: "bg-primary border-primary",
	},
];

type Props = {
	password: string;
	isLarge?: boolean;
};

export const PasswordStregthView = ({ password, isLarge = false }: Props) => {
	const hasValue = password.length > 0;

	const strength =
		(password.length >= 12 ? 1 : 0) +
		(password.match(/[A-Z]/) ? 1 : 0) +
		(password.match(/[a-z]/) ? 1 : 0) +
		(password.match(/[0-9]/) ? 1 : 0) +
		(password.match(/[^A-Za-z0-9]/) ? 1 : 0);

	const levelIndex = Math.max(strength, 0);
	const currentLevel = STRENGTH_LEVELS[levelIndex];

	return (
		<Box
			className={mergeClassNames(
				isLarge ? "flex-row gap-4" : "items-center w-24",
			)}
		>
			<Box className="mb-2">
				<Text
					className={mergeClassNames(
						isLarge ? "text-xl uppercase tracking-wide font-bold" : "text-sm",
					)}
				>
					{currentLevel.label}
				</Text>
			</Box>

			<Box className={mergeClassNames("flex-row gap-1", isLarge && "gap-2")}>
				{[0, 1, 2, 3, 4].map((index) => (
					<Box
						key={index}
						className={mergeClassNames(
							isLarge
								? "w-2 h-full"
								: "w-2 h-4 rounded-none transition-colors duration-200 border",
							index < strength && hasValue
								? currentLevel.color
								: "bg-neutral border-neutral",
						)}
					/>
				))}
			</Box>
		</Box>
	);
};
