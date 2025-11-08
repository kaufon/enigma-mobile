import { SharedItemScreenView } from "@/src/ui/widgets/share/shared-item/shared-item-view";
import { useSharedItemViewModel } from "@/src/ui/widgets/share/shared-item/use-shared-item";

type Props = {
  id:string
}

export const SharedItemScreen = ({id}:Props) => {
	const { isLoading, credential, error } = useSharedItemViewModel(id);
	return (
		<SharedItemScreenView
			isLoading={isLoading}
			credential={credential}
			error={error}
		/>
	);
};
