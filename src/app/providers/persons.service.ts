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
    
    console.trace(`PersonsService add ${this.endpoint}`);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.post( this.endpoint, JSON.stringify(persona),httpOptions  );
}

getByName(nombre:string): Observable <any>{

  return this.http.get(this.endpoint+"/nombre/"+nombre);

}

}
