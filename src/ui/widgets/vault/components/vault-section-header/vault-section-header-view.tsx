import { View } from "react-native";
import { Text } from "@/src/ui/widgets/global/components/Themed";

type Props = { title: string; count: number };

export const VaultSectionHeaderView = ({ title, count }: Props) => (
  <View className="flex-row justify-between items-center px-4 pt-6 pb-2">
    <Text className="text-m font-bold uppercase text-neutral-500">{title}</Text>
  </View>
);
