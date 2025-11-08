import { SharedItemsScreenView } from "@/src/ui/widgets/share/shared-items/shared-items-view";
import { useMySharesViewModel } from "@/src/ui/widgets/share/shared-items/use-shared-items";

export const SharedItemsScreen = () => {
	const { shares, isLoading, handleRevokeShare,handleCopyshareLink,handleViewSharedItem } = useMySharesViewModel();
	return (
		<SharedItemsScreenView
			shares={shares}
			isLoading={isLoading}
			handleRevokeShare={handleRevokeShare}
      handleCopyshareLink={handleCopyshareLink}
      handleViewSharedItem={handleViewSharedItem}
		/>
	);
};
