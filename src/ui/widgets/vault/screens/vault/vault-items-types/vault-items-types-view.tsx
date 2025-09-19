import { Box } from "@/src/ui/gluestack/box"
import { Icon } from "@/src/ui/widgets/global/components/icon"
import { Text } from "@/src/ui/widgets/global/components/Themed"

export const VaultItemsTypesView = () =>{
  return <Box>
    <Box>
      <Icon name="password" />
      <Text>Credencial</Text>
    </Box>
    <Box>
      <Icon name="note" />
      <Text>Nota segura</Text>
    </Box>
  </Box>
}
