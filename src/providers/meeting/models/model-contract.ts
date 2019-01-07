import { Place } from "./place";
import { setRootDomAdapter } from "@angular/platform-browser/src/dom/dom_adapter";

export interface MeetingContract {

    getAgendaId(): number
    getAgendaName(): string
    getTimeId(): number
    getPlace(): Place
    getDate(): string
    getStartTime(): string
    getFinishTime(): string
    getTotalParticipant(): number
    isConfirmToAttend(): boolean
    isAllowConfirmation(): boolean

    setAgendaId(id: number): void
    setAgendaName(name: string): void
    setTimeId(timeId: number): void
    setPlace(place: Place): void
    setDate(date: string): void
    setStartTime(startTime: string): void
    setFinishTime(finishTime: string): void
    setTotalParticipant(total: number): void
    confirmToAttend(status: boolean): void
    allowConfirmation(status: boolean): void

}