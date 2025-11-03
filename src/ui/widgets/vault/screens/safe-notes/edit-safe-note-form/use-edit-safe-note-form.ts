import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRest } from "@/src/hooks";
import { useToast } from "@/src/hooks/use-toast";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
	createSecureNoteSchema,
	CreateSecureNoteSchema,
} from "@/src/ui/widgets/vault/screens/safe-notes/create-safe-note-form/use-create-safe-note-form";

export const useEditSecureNoteForm = (noteId: string) => {
	const { show } = useToast();
	const { safeNoteService } = useRest();
	const router = useRouter();
	const [isLoadingData, setIsLoadingData] = useState(true);

	const {
		control,
		handleSubmit,
		formState: { isSubmitting, isValid },
		reset,
	} = useForm<CreateSecureNoteSchema>({
		resolver: zodResolver(createSecureNoteSchema),
		mode: "onChange",
	});

	useEffect(() => {
		const loadNote = async () => {
			setIsLoadingData(true);
			try {
				const response = await safeNoteService.getById(noteId);
				if (response.isSuccess && response.body) {
					reset(response.body);
				} else {
					show("Erro ao carregar a nota.", "error");
					router.back();
				}
			} catch (e) {
				show("Erro ao carregar a nota.", "error");
				router.back();
			} finally {
				setIsLoadingData(false);
			}
		};
		loadNote();
	}, [noteId, safeNoteService, reset, show, router]);

	const handleFormSubmit = async (data: CreateSecureNoteSchema) => {
		try {
			const response = await safeNoteService.update(noteId, data);
			if (response.isSuccess) {
				show("Nota atualizada com sucesso!", "success");
				router.back();
			} else {
				show(response.errorMessage || "Falha ao atualizar a nota.", "error");
			}
		} catch (error) {
			show("Ocorreu um erro inesperado.", "error");
		}
	};

	return {
		control,
		handleSubmit: handleSubmit(handleFormSubmit),
		isSubmitting,
		isValid,
		isLoadingData,
	};
};
