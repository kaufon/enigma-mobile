import { Text } from "@/src/ui/gluestack/text";
import { mergeClassNames } from "@/src/ui/widgets/global/utils";
import { Box } from "@/src/ui/gluestack/box"; // 👈 CORREÇÃO 1: Importe o Box do Gluestack

// CORREÇÃO 2: Simplifiquei o array de níveis.
// O índice do array agora corresponde diretamente à pontuação de força.
const STRENGTH_LEVELS = [
  { label: "Vazio", color: "bg-neutral-500 border-neutral-500" }, // Nível 0
  { label: "Muito Fraca", color: "bg-danger-500 border-danger-500" }, // Nível 1
  { label: "Fraca", color: "bg-danger-500 border-danger-500" }, // Nível 2
  { label: "Boa", color: "bg-warning-500 border-warning-500" }, // Nível 3
  { label: "Forte", color: "bg-primary-500 border-primary-500" }, // Nível 4
  { label: "Muito Forte", color: "bg-primary-500 border-primary-500" },// Nível 5
];

type Props = {
  password?: string; // Tornar opcional para o estado inicial
  isLarge?: boolean;
};

export const PasswordStregthView = ({ password = "", isLarge = false }: Props) => {
  const strength =
    (password.length > 0 ? 1 : 0) + // Adicionei +1 se não estiver vazio para diferenciar de 0
    (password.length >= 12 ? 1 : 0) +
    (password.match(/[A-Z]/) ? 1 : 0) +
    (password.match(/[a-z]/) ? 1 : 0) +
    (password.match(/[0-9]/) ? 1 : 0) +
    (password.match(/[^A-Za-z0-9]/) ? 1 : 0);

  // CORREÇÃO 3: Lógica de seleção de nível ajustada
  // Garante que o índice não ultrapasse o tamanho do array
  const levelIndex = password.length === 0 ? 0 : Math.min(Math.max(strength - 1, 1), 5);
  const currentLevel = STRENGTH_LEVELS[levelIndex];

  return (
    <Box
      className={mergeClassNames(
        "items-start", // Alinhado à esquerda para consistência
        isLarge ? "flex-row gap-4" : "w-24",
      )}
    >
      {/* Oculta o label se não houver senha digitada */}
      {password.length > 0 && (
        <Box className="mb-1">
          <Text
            className={mergeClassNames(
              "text-xs", // Tamanho de fonte consistente para o label
              isLarge && "text-sm",
              `text-${currentLevel.color.split('-')[1]}-500` // Cor do texto dinâmica
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
              "h-1 rounded-full", // Estilo de barra mais moderno
              isLarge ? "w-8" : "w-4",
              // CORREÇÃO 4: Lógica de cor simplificada
              password.length > 0 && barIndex <= levelIndex
                ? currentLevel.color.replace('border-','bg-') // Garante que a barra seja preenchida
                : "bg-neutral-500/20", // Cor de fundo para barras inativas
            )}
          />
        ))}
      </Box>
    </Box>
  );
};
