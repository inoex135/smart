export class BaseModel {

    constructor(data:any) {
        for (let i in data) {
            this[i] = data[i]
        }
    }

}