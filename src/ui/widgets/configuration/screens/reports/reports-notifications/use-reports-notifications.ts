import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRest,  } from "@/src/hooks";
import { useRouter } from "expo-router";
import { z } from "zod";
import { passwordSchema } from "@/src/validation/schemas/zod";
import { useToast } from "@/src/hooks/use-toast";
import { useAuthContext } from "@/src/ui/widgets/global/hooks";

export const reportScheduleEnum = z.enum(["1s", "monthly", "weekly", "daily"]);
export type ReportSchedule = z.infer<typeof reportScheduleEnum>;

export const setupReportSchema = z.object({
	reportNotificationEnabled: z.boolean(),
	reportNotificationSchedule: reportScheduleEnum,
	masterPassword: passwordSchema,
});

export type SetupReportSchema = z.infer<typeof setupReportSchema>;
export const useReportSettingsForm = () => {
	const { show } = useToast();
	const { securityService } = useRest();
	const router = useRouter();
	const { user, refreshUser } = useAuthContext();

	const {
		control,
		handleSubmit,
		formState: { isSubmitting, isValid },
	} = useForm<SetupReportSchema>({
		resolver: zodResolver(setupReportSchema),
		mode: "onChange",
		defaultValues: {
			reportNotificationEnabled: user?.reportNotificationEnabled ?? false,
			reportNotificationSchedule: user?.reportNotificationSchedule ?? "monthly",
			masterPassword: "",
		},
	});

	const handleFormSubmit = async (data: SetupReportSchema) => {
		try {
      console.log("Submitting form with data:", data);
			const response = await securityService.setupReport(data);
      console.log("Response from setupReport:", response);
			if (response.isSuccess) {
				show("Configurações salvas com sucesso!", "success");
				await refreshUser(); 
				router.back();
			} else {
				show(
					response.errorMessage || "Falha ao salvar. Senha mestra incorreta?",
					"error",
				);
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
	};
};
