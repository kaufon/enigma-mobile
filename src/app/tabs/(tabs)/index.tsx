import { Center } from "@/src/ui/gluestack/center";
import { Divider } from "@/src/ui/gluestack/divider";
import { Heading } from "@/src/ui/gluestack/heading";
import { Text } from "@/src/ui/gluestack/text";

export default function Home() {
	return (
		<Center className="flex-1">
			<Heading className="font-bold text-2xl">Expo V3</Heading>
			<Divider className="my-[30px] w-[80%]" />
			<Text className="p-4">Example below to use gluestack-ui components.</Text>
		</Center>
	);
}
