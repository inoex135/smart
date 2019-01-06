import { Notice } from "./notice";

export interface DashboardContract {
    getPresentAccumulation(): string
    getAbsence(): string
    getTodayCheckIn(): string
    getNotices(): Notice[]
    setNotices(notices: Array<Notice>): void
}