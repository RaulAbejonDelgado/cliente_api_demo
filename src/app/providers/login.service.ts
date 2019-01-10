import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Person } from '../model/person';
import { Observable } from 'rxjs';



const USUARIO_NOMBRE = 'admin';
const USUARIO_PASSWORD = 'admin';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  persona : Person;
  endpoint : string;
  

  constructor(public http : HttpClient) { 
    console.trace('LoginService - constructor')
    this.persona = undefined;
    this.endpoint = "http://localhost:8080/API/publicaciones/person/login";
  }

  isLogged(): boolean{
    console.trace("LoginService - isLogged")
    let resul: boolean;
    if(this.persona){
      console.debug('Usuario logeado');
      resul= true;
    }else{
      console.warn('Usuario No logueado');
      resul= false;
    }
    return resul;
  }

  logOut(){
    console.trace("LoginService - logOut")
    this.persona = undefined;
  }

  login( p: Person): Observable<any>{
    let objetoTexto; // donde metemos la respuesta a formato string
    let  resul = false; //en funcion del objeto devuelto por la api retornamos true o false para verificar el usuario ya registrado
    console.trace('LoginService login %o',p);
    console.trace(`FrutaService add ${this.endpoint}`);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.post(this.endpoint,JSON.stringify(p), httpOptions)
    // return this.http.post( this.endpoint, JSON.stringify(p),httpOptions).subscribe(data =>{
    //   console.log("La respuesta del test de login es : " + data);
    //   objetoTexto =JSON.stringify(data);
    //   this.persona = JSON.parse(objetoTexto);
    //   console.log(this.persona);

    // });
    // if(this.persona.nombre != ""){
    //   resul = true;
    // }

    // return resul;

   }
}