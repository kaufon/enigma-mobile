import { COLORS } from "@/src/constants";
import { useColorScheme } from "nativewind";

export function useTheme() {
	const { colorScheme } = useColorScheme();
	return COLORS[colorScheme || "light"];
}
