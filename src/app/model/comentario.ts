import { Person } from './person';
import { Family } from './family';
export class Comentario {

    familia: Family[];
    titulo: string;
    texto: string;
    persona:Person[];
    selfId:number;
    fecha:Date;

    constructor(){
        this.familia = [];
        this.texto = "";
        this.titulo = "";
        this.persona = [];
        this.selfId = 0;
        this.fecha = new Date();
    }

}
