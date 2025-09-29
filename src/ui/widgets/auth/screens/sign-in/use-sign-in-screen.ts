type Params = {
  signInAccount: (email: string, password: string) => Promise<void>
}

export function useSignInScreen({ signInAccount }: Params) {
  async function handleSignIn(email: string, password: string) {
    await signInAccount(email, password)
  }

  return {
    handleSignIn,
  }
}
