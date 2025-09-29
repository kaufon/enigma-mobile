import { Link } from "expo-router";
import { Box } from "@/src/ui/gluestack/box";
import { Icon } from "@/src/ui/widgets/global/components/icon";
import { Text } from "@/src/ui/widgets/global/components/Themed";
import { Pressable } from "@/src/ui/widgets/global/components/pressable";

export const VaultItemsTypesView = () => {
	return (
		<Link href="/vault/credentials" asChild>
			<Pressable>
				<Box>
					<Icon name="globe" color="primary" />
					<Text>Credenciais</Text>
				</Box>
			</Pressable>
		</Link>
	);
};
