import { Icon } from "@/src/ui/widgets/global/components/icon";
import type { IconName } from "@/src/ui/widgets/global/components/icon/types";
import { Text } from "@/src/ui/widgets/global/components/Themed";
import {
	createContext,
	useContext,
	useState,
	type PropsWithChildren,
} from "react";
import { Modal, Pressable, View } from "react-native";

const MenuContext = createContext<{
	isOpen: boolean;
	setOpen: (open: boolean) => void;
} | null>(null);

const useMenu = () => {
	const context = useContext(MenuContext);
	if (!context) throw new Error("useMenu must be used within a Menu");
	return context;
};

const Menu = ({ children }: PropsWithChildren) => {
	const [isOpen, setOpen] = useState(false);
	return (
		<MenuContext.Provider value={{ isOpen, setOpen }}>
			{children}
		</MenuContext.Provider>
	);
};

const Trigger = ({ children }: PropsWithChildren) => {
	const { setOpen } = useMenu();
	return <Pressable onPress={() => setOpen(true)}>{children}</Pressable>;
};

const Content = ({ children }: PropsWithChildren) => {
	const { isOpen, setOpen } = useMenu();
	return (
		<Modal visible={isOpen} transparent animationType="fade">
			<Pressable className="flex-1" onPress={() => setOpen(false)}>
				<View className="absolute top-16 right-4 bg-surface-500 rounded-lg shadow-lg border border-neutral-500/20 w-48">
					{children}
				</View>
			</Pressable>
		</Modal>
	);
};

const Item = ({
	children,
	onPress,
	iconName,
	color,
}: PropsWithChildren<{
	onPress: () => void;
	iconName: IconName;
	color?: string;
}>) => {
	const { setOpen } = useMenu();
	const textColor = color ? color : "text-accent-500";

	return (
		<Pressable
			className="flex-row items-center p-3 space-x-3 gap-4"
			onPress={() => {
				onPress();
				setOpen(false);
			}}
		>
			<Icon name={iconName} size={18} color={textColor} />
			<Text className={`font-semibold `}>{children}</Text>
		</Pressable>
	);
};

Menu.Trigger = Trigger;
Menu.Content = Content;
Menu.Item = Item;

export { Menu };
