import { PasswordGeneratorScreenView } from "@/src/ui/widgets/generator/password-generator/password-generator-view";
import { usePasswordGeneratorViewModel } from "@/src/ui/widgets/generator/password-generator/use-password-generator";

export const PasswordGeneratorScreen = () => {
	const {
		length,
		setLength,
		setIncludeDigits,
		setIncludeSpecial,
		setIncludeLowercase,
		setIncludeUppercase,
		includeDigits,
		includeSpecial,
		includeLowercase,
		includeUppercase,
		generatePassword,
		generatedPassword,
		copyToClipboard,
	} = usePasswordGeneratorViewModel();
	return (
		<PasswordGeneratorScreenView
			length={length}
			setLength={setLength}
			setIncludeDigits={setIncludeDigits}
			setIncludeSpecial={setIncludeSpecial}
			setIncludeLowercase={setIncludeLowercase}
			setIncludeUppercase={setIncludeUppercase}
			includeDigits={includeDigits}
			includeSpecial={includeSpecial}
			includeLowercase={includeLowercase}
			includeUppercase={includeUppercase}
			generatePassword={generatePassword}
			generatedPassword={generatedPassword}
			copyToClipboard={copyToClipboard}
		/>
	);
};
