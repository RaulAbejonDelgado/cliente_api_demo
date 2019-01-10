import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Person } from '../model/person';

@Injectable({
  providedIn: 'root'
})
export class PersonsService {
  endpoint: string;
  constructor(public http : HttpClient) { 
    console.log("PersonsService -- constructor");
    this.endpoint ="http://localhost:8080/API/publicaciones/person";
  }

  getAll() :  Observable <any>{

     console.log("PersonsService -- getAll");

     return this.http.get(this.endpoint);
  }

  add(persona: Person): Observable<any>{
    console.trace(`FrutaService add ${this.endpoint}`);
    // let body  = {
    //       //"id": tarea.id,
    //       "nombre": fruta.nombre,
    //       "precio": fruta.precio,
    //       "calorias": fruta.calorias, 
    //       "colores" : fruta.colores,
    //       "oferta": fruta.oferta,
    //       "descuento": fruta.descuento,
    //       "imagen" : fruta.imagen
    //     };  
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.post( this.endpoint, JSON.stringify(persona),httpOptions  );
}
}
