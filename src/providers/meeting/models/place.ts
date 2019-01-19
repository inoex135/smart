export class Place {

    private room: string
    private building: string

    public setRoom(room: string): void {
        this.room = room
    }

    public setBuilding(building: string): void {
        this.building = building
    }

    public getRoom(): string {
        return this.room
    }

    public getBuilding(): string {
        return this.building
    }

    public static create(data:any): Place {
        let place = new Place()
        if (data.ruang) {
            place.setRoom(data.ruang.nama)
            place.setBuilding(data.ruang.gedung)
        }
        if (data.ruang_eksternal) {
            place.setRoom(data.ruang_eksternal)
        }
        return place
    }

    public static createFromJson(data:any): Place {
        let place = new Place()
        place.setRoom(data.room)
        place.setBuilding(data.building)
        return place
    }

}