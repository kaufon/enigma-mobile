import { ReportSchedule } from "@/src/core/types/report-schedule";

export type UserDto = {
	id: string;
	email: string;
	danger: true;
	dangerReason?: string;
	autoLockTimeout?: number;
  reportNotificationEnabled?: boolean;
  reportNotificationSchedule?: ReportSchedule;
};
