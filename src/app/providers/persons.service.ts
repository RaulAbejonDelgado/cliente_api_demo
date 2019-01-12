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
  personaLogued: Person;
  constructor(public http : HttpClient) { 
    console.log("PersonsService -- constructor");
    this.isLogued = false;
    this.personaLogued = new Person();
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

getBySelfId(selfId:number): Observable <any>{
  
  return this.http.get(this.endpoint+"/"+selfId);

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
    console.log(res['nombre']);
    this.personaLogued.nombre= res['nombre'];
    this.personaLogued.familyId= res['familyId'];
    this.personaLogued.selfId= res['selfId'];
    this.personaLogued.correo= res['correo'];
    this.personaLogued.password= res['password'];
    console.log(this.personaLogued);
    //this.getBySelfId(this.personaLogued.selfId);
    // this.isLogued = false;
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

getUser():Person{
return this.personaLogued;
}

}
