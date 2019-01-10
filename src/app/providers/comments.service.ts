import { Comentario } from 'src/app/model/comentario';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  endpoint : string;

  constructor(public http : HttpClient) { 

    console.log("CommentsService -- constructor");

    this.endpoint = "http://localhost:8080/API/publicaciones/coments";
    


  }

  getAll() :  Observable <any>{

    console.log("CommentsService -- getAll");

    return this.http.get(this.endpoint);

  }

  add(comentario : Comentario): Observable <any>{
    let body  = {
      //"id": tarea.id,
      "texto": comentario.texto,
      "familia":comentario.familia,
      "persona":comentario.persona,
      "titulo":comentario.titulo
 
    };  
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    console.log(comentario);
    console.log(JSON.stringify(comentario));
    
    return this.http.post( this.endpoint, JSON.stringify(comentario),httpOptions  );

  }
}
