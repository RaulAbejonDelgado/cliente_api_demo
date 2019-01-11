import { Person } from './person';
export class Family {


    selfId: number;
    nombre: string;
    personas: Person[];

    constructor() {
        this.selfId = 0;
        this.nombre = "";
        this.personas = [];
    }
}
