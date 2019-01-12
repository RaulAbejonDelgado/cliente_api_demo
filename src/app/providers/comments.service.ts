import { Comentario } from 'src/app/model/comentario';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Person } from '../model/person';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  endpoint: string;

  constructor(public http: HttpClient) {

    console.log("CommentsService -- constructor");

    this.endpoint = "http://localhost:8080/API/publicaciones/coments";

  }

  getAll(): Observable<any> {

    console.log("CommentsService -- getAll");

    return this.http.get(this.endpoint);

  }

  getBySelfId(selfId:number):Observable<any>{

    return this.http.get(this.endpoint+"/"+selfId);
    
  }

  add(comentario: Comentario): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post(this.endpoint, JSON.stringify(comentario), httpOptions);

  }

  getCommentsByUser(p:Person): Observable<any>{

    return this.http.get(this.endpoint+"/byUser/"+p.selfId);
  }
}
