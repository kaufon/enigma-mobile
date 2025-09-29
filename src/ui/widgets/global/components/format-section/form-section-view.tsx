import { Text } from "@/src/ui/widgets/global/components/Themed";

export const FormSectionView = ({ title }: { title: string }) => (
	<Text className="text-xl font-bold uppercase text-accent-500 mt-6 mb-2">
		{title}
	</Text>
);
