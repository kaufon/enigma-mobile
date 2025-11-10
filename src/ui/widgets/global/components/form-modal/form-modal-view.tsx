import {
	Modal,
	View,
	Pressable,
	KeyboardAvoidingView,
	Platform,
} from "react-native";
import { Text } from "@/src/ui/widgets/global/components/Themed";
import { Icon } from "@/src/ui/widgets/global/components/icon";
import { Heading } from "@/src/ui/gluestack/heading";

type Props = {
	isOpen: boolean;
	onClose: () => void;
	title: string;
	description?: string;
	children: React.ReactNode; // Para os inputs do formulário
	footer: React.ReactNode; // Para os botões
};

export const FormModalView = ({
	isOpen,
	onClose,
	title,
	description,
	children,
	footer,
}: Props) => {
	return (
		<Modal
			animationType="fade"
			transparent={true}
			visible={isOpen}
			onRequestClose={onClose}
		>
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				className="flex-1"
			>
				<Pressable
					className="flex-1 bg-black/60 justify-center items-center p-4 mb-36"
					onPress={onClose}
				>
					<Pressable
						className="bg-surface-500 rounded-2xl w-full"
						onPress={() => {}}
					>
						<View className="flex-row justify-between items-center p-4 border-b border-neutral-500/20">
							<Heading className="text-accent-500">{title}</Heading>
							<Pressable onPress={onClose} className="p-1">
								<Icon name="x" size={20} color="neutral" />
							</Pressable>
						</View>

						<View className="p-4">
							{description ? (
								<Text className="text-neutral-500 mb-4">{description}</Text>
							) : null}
							{children}
						</View>

						<View className="flex-row gap-4 p-4 border-t border-neutral-500/20 justify-end">
							{footer}
						</View>
					</Pressable>
				</Pressable>
			</KeyboardAvoidingView>
		</Modal>
	);
};
