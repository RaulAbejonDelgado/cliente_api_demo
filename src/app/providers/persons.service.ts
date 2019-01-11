import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Person } from '../model/person';

@Injectable({
  providedIn: 'root'
})
export class PersonsService {
  endpoint: string;
  isLogued: boolean;
  constructor(public http : HttpClient) { 
    console.log("PersonsService -- constructor");
    this.isLogued = false;
    this.endpoint ="http://localhost:8080/API/publicaciones/person";
  }
  /**
   * All records from object
   */
  getAll() :  Observable <any>{

     console.log("PersonsService -- getAll");

     return this.http.get(this.endpoint);
  }

  /**
   * 
   * @param persona posted person
   */
  add(persona: Person): Observable<any>{
    
    console.trace(`PersonsService add ${this.endpoint}`);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.post( this.endpoint, JSON.stringify(persona),httpOptions  );
}
/**
 * 
 * @param nombre 
 */
getByName(nombre:string): Observable <any>{

  return this.http.get(this.endpoint+"/nombre/"+nombre);

}

checkLogin(persona:Person): Observable<any>{

  let person = new Person();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
  let x = this.http.post(this.endpoint+"/login",JSON.stringify(persona),httpOptions);
  x.subscribe(res=>{
    console.log("*************");
    console.log(res);
    this.isLogued = false;
  })
  return this.http.post(this.endpoint+"/login",JSON.stringify(persona),httpOptions)

}

checkLogState():boolean{
  
  return this.isLogued;
}

setLogState(logueado:boolean){
  
  this.isLogued = logueado;
}

logOut() {
  this.isLogued = false;
}

}
