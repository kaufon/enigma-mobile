import { SignInScreenView } from "./sign-in-view";
import { useAuthContext } from "@/src/ui/widgets/global/hooks";
import { useSignInScreen } from './use-sign-in-screen'; // Nosso ViewModel

export const SignInScreen = () => {
  // 1. Pega a função de negócio do nosso "Model" (AuthContext)
  const { signIn } = useAuthContext();

  // 2. Inicializa nosso ViewModel, passando a função de negócio
  const viewModel = useSignInScreen({
    onSignIn: signIn,
  });

  // 3. Renderiza a View, passando todas as propriedades do ViewModel
  return <SignInScreenView {...viewModel} />;
};
