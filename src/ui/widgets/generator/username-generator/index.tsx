import { useUsernameGeneratorViewModel } from "@/src/ui/widgets/generator/username-generator/use-username-generator";
import UsernameGeneratorScreenView from "@/src/ui/widgets/generator/username-generator/username-generator-view";

export const UsernameGeneratorScreen = () => {
	const {
		isLoading,
		baseEmail,
		setBaseEmail,
		generatedUsername,
		copyToClipboard,
		generateUsername,
	} = useUsernameGeneratorViewModel();
	return (
		<UsernameGeneratorScreenView
			isLoading={isLoading}
			baseEmail={baseEmail}
			setBaseEmail={setBaseEmail}
			generateUsername={generateUsername}
			copyToClipboard={copyToClipboard}
			generatedUsername={generatedUsername}
		/>
	);
};
