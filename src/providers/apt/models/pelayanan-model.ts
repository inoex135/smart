import { PelayananContract } from "./pelayanan-contract";

export class PelayananModel implements PelayananContract {

    private nama: string

    getName(): string {
        return this.nama
    }    
    
    setName(name: string): void {
        this.nama = name
    }

}