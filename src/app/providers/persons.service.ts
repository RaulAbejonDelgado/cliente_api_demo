import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
}
