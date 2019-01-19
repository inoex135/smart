import { PelayananContract } from "./contracts/pelayanan-contract";

export class PelayananModel implements PelayananContract {

    private nama: string

    getName(): string {
        return this.nama
    }    
    
    setName(name: string): void {
        this.nama = name
    }

    public static create(data: any): PelayananModel {
        let model = new PelayananModel()
        model.setName(data.nama)
        return model
    }

}