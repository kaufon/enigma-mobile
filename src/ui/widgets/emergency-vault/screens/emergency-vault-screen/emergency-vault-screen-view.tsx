import { ActivityIndicator, View } from 'react-native';
import { EmergencyVaultLoginScreen } from '@/src/ui/widgets/emergency-vault/screens/emergency-vault-login-screen';
import { EmergencyVaultList } from '@/src/ui/widgets/emergency-vault/screens/emergency-vault-list-screen';

type Props = {
  isLoading: boolean;
  isUnlocked: boolean;
}

export const  EmergencyVaultScreenView= ({isUnlocked,isLoading}:Props)=> {

  if (isLoading) {
    return <ActivityIndicator size="large" className="flex-1" />;
  }


  return (
    <View className="flex-1">
      {isUnlocked ? <EmergencyVaultList /> : <EmergencyVaultLoginScreen />}
    </View>
  );
}
