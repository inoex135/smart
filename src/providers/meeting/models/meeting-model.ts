import { Place } from "./place";
import { MeetingContract } from "./model-contract";

export class Meeting implements MeetingContract{

    private agenda_id: number
    private agenda_name: string
    private time_id: number
    private place: Place
    private date: any
    private start_time: string
    private finish_time: string
    private total_participant: number
    private confirm_to_attend: boolean
    private allow_participant_confirmation: boolean

    public static create(element:any, time:any, profile:any): Meeting {
        let model: Meeting = new Meeting()
        model.setAgendaId(element.id)
        model.setAgendaName(element.nama_agenda)
        model.setTimeId(time.id)
        model.setPlace(Place.create(time))
        model.setDate(time.tanggal)
        model.setStartTime(time.jam_mulai)
        model.setFinishTime(time.jam_akhir)
        model.setTotalParticipant(time.peserta.length)
        model.confirmToAttend(false)
        model.allowConfirmation(false)
        if (time.peserta.length > 0) {
            time.peserta.forEach(peserta => {
                if (peserta.nip_tujuan === profile.nip) {
                    model.allowConfirmation(true)
                    model.confirmToAttend(peserta.konfirmasi_hadir)
                }
            })
        }
        return model
    }

    public static fromMeeting(meeting: any): Meeting {
        let model: Meeting = new Meeting()
        model.setAgendaId(meeting.agenda_id)
        model.setAgendaName(meeting.agenda_name)
        model.setTimeId(meeting.time_id)
        model.setPlace(Place.createFromJson(meeting.place))
        model.setDate(meeting.date)
        model.setStartTime(meeting.start_time)
        model.setFinishTime(meeting.finish_time)
        model.setTotalParticipant(meeting.total_participant)
        model.confirmToAttend(meeting.confirm_to_attend)
        model.allowConfirmation(meeting.allow_participant_confirmation)
        return model
    }

    getAgendaId(): number {
        return this.agenda_id
    }
    getAgendaName(): string {
        return this.agenda_name
    }
    getTimeId(): number {
        return this.time_id
    }
    getPlace(): Place {
        return this.place
    }
    getDate(): string {
        return this.date
    }
    getStartTime(): string {
        return this.start_time
    }
    getFinishTime(): string {
        return this.finish_time
    }
    getTotalParticipant(): number {
        return this.total_participant
    }
    isConfirmToAttend(): boolean {
        return this.confirm_to_attend
    }
    isAllowConfirmation(): boolean {
        return this.allow_participant_confirmation
    }
    setAgendaId(id: number): void {
        this.agenda_id = id
    }
    setAgendaName(name: string): void {
        this.agenda_name = name
    }
    setTimeId(timeId: number): void {
        this.time_id = timeId
    }
    setPlace(place: Place): void {
        this.place = place
    }
    setDate(date: string): void {
        this.date = date
    }
    setStartTime(startTime: string): void {
        this.start_time = startTime
    }
    setFinishTime(finishTime: string): void {
        this.finish_time = finishTime
    }
    setTotalParticipant(total: number): void {
        this.total_participant = total
    }
    confirmToAttend(status: boolean): void {
        this.confirm_to_attend = status
    }
    allowConfirmation(status: boolean): void {
        this.allow_participant_confirmation = status
    }

}