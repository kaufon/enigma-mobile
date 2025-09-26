import PassphraseGeneratorScreenView from "@/src/ui/widgets/generator/passphrase-generator/passphrase-generator-view";
import { usePassphraseGeneratorViewModel } from "@/src/ui/widgets/generator/passphrase-generator/use-passphrase-generator";

export const PassphraseGeneratorScreen = () => {
	const {
		wordCount,
		separator,
		setWordCount,
		setSeparator,
		generatedPassphrase,
		generatePassphrase,
		copyToClipboard,
	} = usePassphraseGeneratorViewModel();
	return (
		<PassphraseGeneratorScreenView
			wordCount={wordCount}
			setSeparator={setSeparator}
			setWordCount={setWordCount}
			separator={separator}
			generatePassphrase={generatePassphrase}
			generatedPassphrase={generatedPassphrase}
			copyToClipboard={copyToClipboard}
		/>
	);
};
