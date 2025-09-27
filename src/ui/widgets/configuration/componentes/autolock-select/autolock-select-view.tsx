import { useState } from "react";
import {
    ActionsheetItem,
    ActionsheetItemText,
} from "@/src/ui/gluestack/actionsheet";
import { Text, View } from "@/src/ui/widgets/global/components/Themed";
import { Icon } from "@/src/ui/widgets/global/components/icon";
import { Sheet } from "@/src/ui/widgets/global/components/action-sheet";
// Importe o Pressable do react-native para garantir o comportamento padrão.
import { Pressable } from "react-native";

type Option = {
    label: string;
    value: number | null;
};

type Props = {
    label: string;
    options: Option[];
    currentValue: number | null | undefined;
    onSelect: (value: number | null) => void;
};

export const AutoLockSelectView = ({
    label,
    options,
    currentValue,
    onSelect,
}: Props) => {
    const [isSheetOpen, setSheetOpen] = useState(false);

    const selectedOptionLabel =
        options.find((o) => o.value === currentValue)?.label || "Nunca";

    // Função para abrir o Sheet de forma segura
    const handleOpenSheet = () => {
    console.log("Opening sheet...");
        setTimeout(() => {
            setSheetOpen(true);
        }, 0);
    };

    return (
        <>
            <View className="my-2">
                <Text className="text-neutral-500 mb-2">{label}</Text>
                <Pressable
                    onPress={handleOpenSheet} // Usamos a nova função aqui
                    className="bg-surface-500 p-3 h-16 rounded-md flex-row justify-between items-center border border-neutral-500/20"
                >
                    <Text className="text-accent-500 text-base">
                        {selectedOptionLabel}
                    </Text>
                    <Icon name="arrow-down" size={16} />
                </Pressable>
            </View>

            <Sheet isOpen={isSheetOpen} onClose={() => setSheetOpen(false)}>
                {options.map((option) => (
                    <ActionsheetItem
                        key={option.label}
                        onPress={() => {
                            onSelect(option.value);
                            setSheetOpen(false);
                        }}
                        // Adicionei um estilo para o item selecionado, para melhor feedback visual
                        className={`flex-row justify-between items-center p-4 border-b border-background-500 ${
                            currentValue === option.value ? "bg-primary-500/10" : ""
                        }`}
                    >
                        <ActionsheetItemText className="text-accent-500">
                            {option.label}
                        </ActionsheetItemText>
                        {currentValue === option.value && (
                            <Icon name="check" size={20} color="primary" />
                        )}
                    </ActionsheetItem>
                ))}
            </Sheet>
        </>
    );
};
