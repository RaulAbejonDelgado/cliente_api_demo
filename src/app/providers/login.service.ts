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
    console.log('LoginService - constructor')
    this.persona = undefined;
    this.endpoint = "http://localhost:8080/API/publicaciones/person/login";
  }

  // isLogged(): boolean{
  //   console.log("LoginService - isLogged")
  //   let resul: boolean;
  //   if(this.persona){
  //     console.debug('Usuario logeado');
  //     resul= true;
  //   }else{
  //     console.warn('Usuario No logueado');
  //     resul= false;
  //   }
  //   return resul;
  // }

  // logOut(){
  //   console.log("LoginService - logOut")
  //   this.persona = undefined;
  // }

  // login( p: Person): boolean{
  //   let objetoTexto; // donde metemos la respuesta a formato string
  //   let  resul = false; //en funcion del objeto devuelto por la api retornamos true o false para verificar el usuario ya registrado
  //   console.log('LoginService login %o',p);
  //   console.log(`LoginService add ${this.endpoint}`);
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type':  'application/json'
  //     })
  //   };
  //   this.http.post(this.endpoint,JSON.stringify(p), httpOptions).subscribe(res=>{
  //     resul = true;
 

  //   });
  //   return resul;
  //  }


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

  login( u: Person): boolean{
    console.trace('LoginService login %o',u);
    if (u && u.nombre === USUARIO_NOMBRE && u.password === USUARIO_PASSWORD ){
       console.debug(' usuario logeado');
      this.persona = u;      
      return true;
    }else{
       console.warn(' usuario no valido');
      this.persona = undefined;
      return false;
    }
   }
}