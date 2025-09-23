import {
	Actionsheet,
	ActionsheetBackdrop,
	ActionsheetContent,
	ActionsheetDragIndicator,
	ActionsheetDragIndicatorWrapper,
} from "@/src/ui/gluestack/actionsheet";
import { Icon } from "@/src/ui/widgets/global/components/icon"; 
import { Pressable } from "react-native"; 
import type { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
	isOpen: boolean;
	onClose: () => void;
}>;

export const SheetView = ({ isOpen, onClose, children }: Props) => {
	return (
		<Actionsheet isOpen={isOpen} onClose={onClose} snapPoints={[99]}>
			<ActionsheetBackdrop />
			<ActionsheetContent className="bg-surface-500">
				<ActionsheetDragIndicatorWrapper>
					<ActionsheetDragIndicator />
				</ActionsheetDragIndicatorWrapper>

				{children}

				<Pressable
					onPress={onClose}
					className="absolute top-10 left-3 w-8 h-8  rounded-full items-center justify-center"
				>
					<Icon name="x" size={38} color="neutral"  />
				</Pressable>
			</ActionsheetContent>
		</Actionsheet>
	);
};
