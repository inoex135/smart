import { PelayananSubContract } from "./pelayanan-sub-contract";

export class PelayananSubModel implements PelayananSubContract {

    private nama: string

    getName(): string {
        return this.nama
    }    
    setName(name: string): void {
        this.nama = name
    }


}