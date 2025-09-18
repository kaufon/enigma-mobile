import type { PropsWithChildren } from "react";

import {
	Button,
	ButtonGroup,
	ButtonIcon,
	ButtonSpinner,
	ButtonText,
} from "../../../../gluestack/button";
import { COLORS } from "@/src/constants"; 
import { mergeClassNames } from "@/src/ui/widgets/global/utils"; 

type Props = {
	isLoading?: boolean;
	isDisabled?: boolean;
	className?: string;
	onPress: () => void;
};

export const ButtonView = ({
	children,
	isLoading = false,
	isDisabled = false,
	className,
	onPress,
}: PropsWithChildren<Props>) => {
	return (
		<ButtonGroup className="flex-1">
			<Button
				isDisabled={isDisabled}
				onPress={onPress}
				className={mergeClassNames(
					"bg-primary h-16 px-0 items-center justify-center",
					className,
				)}
			>
				{!isLoading && (
					<ButtonText className="text-xl font-bold uppercase text-accent translate-x-3">
						{children}
					</ButtonText>
				)}
				{isLoading && (
					<ButtonSpinner color={COLORS.dark.background} size="large" />
				)}
				<ButtonIcon />
			</Button>
		</ButtonGroup>
	);
};
