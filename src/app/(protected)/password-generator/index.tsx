import { Text, View } from "@/src/ui/widgets/global/components/Themed";
import { StyleSheet } from "react-native";

export default function PasswordGeneratorScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gerador de Senhas</Text>
      {/* Aqui você colocará os componentes do seu gerador */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
