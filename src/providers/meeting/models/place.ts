export class Place {

    private room: string
    private building: string

    public static create(data:any): Place {
        let place = new Place
        if (data.ruang) {
            place.room = data.ruang.nama
            place.building = data.ruang.gedung
        }
        if (data.ruang_eksternal) {
            place.room = data.ruang_eksternal
        }
        return place
    }

    public static createFromJson(data:any): Place {
        let place = new Place
        place.room = data.room
        place.building = data.building
        return place
    }

}