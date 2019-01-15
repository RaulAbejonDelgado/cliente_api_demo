import { Comentario } from 'src/app/model/comentario';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Person } from '../model/person';
import { Family } from '../model/family';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  endpoint: string;

  constructor(public http: HttpClient) {

    console.log("CommentsService -- constructor");

    this.endpoint = "http://localhost:8080/comentarios{?page,size,sort}";

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

  update(comentario: Comentario): Observable<any> {
    console.log("CommentsService -- update")
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.put( this.endpoint+"/"+comentario.selfId, JSON.stringify(comentario) , httpOptions );

  }

  getCommentsByUser(p:Person): Observable<any>{

    return this.http.get(this.endpoint+"/byUser/"+p.selfId);
  }

  getCommentsByFamily(f:Family): Observable<any>{

    return this.http.get(this.endpoint+"/byFamily/"+f.selfId);
  }

  delete(id: number): Observable <any>{
    let uri = this.endpoint + "/"+id;
    console.log("CommentsService - delete->" + uri);
    return this.http.delete(uri);
  }
    
}
