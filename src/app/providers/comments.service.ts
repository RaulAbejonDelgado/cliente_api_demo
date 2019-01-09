import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
}
