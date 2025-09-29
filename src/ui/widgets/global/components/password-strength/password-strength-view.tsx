import { Text } from "@/src/ui/gluestack/text";
import { mergeClassNames } from "@/src/ui/widgets/global/utils";
import { Box } from "@/src/ui/gluestack/box"; 

const STRENGTH_LEVELS = [
  { label: "Vazio", color: "bg-neutral-500 border-neutral-500" }, 
  { label: "Muito Fraca", color: "bg-danger-500 border-danger-500" }, 
  { label: "Fraca", color: "bg-danger-500 border-danger-500" }, 
  { label: "Boa", color: "bg-warning-500 border-warning-500" }, 
  { label: "Forte", color: "bg-primary-500 border-primary-500" }, 
  { label: "Muito Forte", color: "bg-primary-500 border-primary-500" }, 
];

type Props = {
  password?: string; 
  isLarge?: boolean;
};

export const PasswordStregthView = ({ password = "", isLarge = false }: Props) => {
  const strength =
    (password.length > 0 ? 1 : 0) + 
    (password.length >= 12 ? 1 : 0) +
    (password.match(/[A-Z]/) ? 1 : 0) +
    (password.match(/[a-z]/) ? 1 : 0) +
    (password.match(/[0-9]/) ? 1 : 0) +
    (password.match(/[^A-Za-z0-9]/) ? 1 : 0);

  const levelIndex = password.length === 0 ? 0 : Math.min(Math.max(strength - 1, 1), 5);
  const currentLevel = STRENGTH_LEVELS[levelIndex];

  return (
    <Box
      className={mergeClassNames(
        "items-start", 
        isLarge ? "flex-row gap-4" : "w-24",
      )}
    >
      {password.length > 0 && (
        <Box className="mb-1">
          <Text
            className={mergeClassNames(
              "text-xs", 
              isLarge && "text-sm",
              `text-${currentLevel.color.split('-')[1]}-500` 
            )}
          >
            {currentLevel.label}
          </Text>
        </Box>
      )}

      <Box className={mergeClassNames("flex-row gap-1", isLarge && "gap-2")}>
        {[1, 2, 3, 4, 5].map((barIndex) => (
          <Box
            key={barIndex}
            className={mergeClassNames(
              "h-1 rounded-full", 
              isLarge ? "w-8" : "w-4",
              password.length > 0 && barIndex <= levelIndex
                ? currentLevel.color.replace('border-','bg-') 
                : "bg-neutral-500/20", 
            )}
          />
        ))}
      </Box>
    </Box>
  );
};
