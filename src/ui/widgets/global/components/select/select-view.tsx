import { useState } from "react";
import { useController } from "react-hook-form";
import { Pressable, View, Modal, FlatList } from "react-native";
import { Text } from "@/src/ui/widgets/global/components/Themed";
import { Icon } from "@/src/ui/widgets/global/components/icon";

type Option = {
  label: string;
  value: string; 
};

type Props = {
  control: any;
  name: string;
  label: string;
  options: Option[];
  placeholder?: string;
};

export const SelectView = ({ control, name, label, options, placeholder }: Props) => {
  const [isModalVisible, setModalVisible] = useState(false);
  
  const { field } = useController({ control, name });

  const selectedOption = options.find((o) => o.value === field.value);
  const displayLabel = selectedOption ? selectedOption.label : placeholder || "Selecione...";

  const handleSelect = (value: string) => {
    field.onChange(value); 
    setModalVisible(false); 
  };

  return (
    <>
      <View className="my-2">
        <Text className="text-neutral-500 mb-2">{label}</Text>
        <Pressable
          onPress={() => setModalVisible(true)}
          className="bg-background-500 p-3 h-16 rounded-md flex-row justify-between items-center border border-neutral-500/20"
        >
          <Text className="text-accent-500 text-base">{displayLabel}</Text>
          <Icon name="arrow-down" size={16} color="neutral"/>
        </Pressable>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable
          className="flex-1 bg-black/60 justify-center items-center"
          onPress={() => setModalVisible(false)}
        >
          <View className="bg-surface-500 rounded-2xl max-h-[50%] w-[90%]">
            <View className="p-4 border-b border-neutral-500/20 items-center">
              <Text className="text-lg font-bold text-accent-500">{label}</Text>
            </View>
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => handleSelect(item.value)}
                  className="flex-row items-center justify-between p-4 border-b border-neutral-500/10"
                >
                  <Text className="text-accent-500 text-base">{item.label}</Text>
                  {field.value === item.value && (
                    <Icon name="check" size={20} color="primary"/>
                  )}
                </Pressable>
              )}
            />
          </View>
        </Pressable>
      </Modal>
    </>
  );
};
