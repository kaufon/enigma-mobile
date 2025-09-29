import { Text } from "@/src/ui/gluestack/text";
import {  Stack } from "expo-router";


export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <Text>Oie</Text>
    </>
  );
}
