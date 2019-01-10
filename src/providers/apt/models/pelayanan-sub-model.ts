import { PelayananSubContract } from "./contracts/pelayanan-sub-contract";

export class PelayananSubModel implements PelayananSubContract {

    private nama: string

    getName(): string {
        return this.nama
    }    
    setName(name: string): void {
        this.nama = name
    }

    public static create(data: any): PelayananSubModel {
        let model = new PelayananSubModel()
        model.setName(data.nama)
        return model
    }

}