import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { getAllDebugNodes } from '@angular/core/src/debug/debug_node';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FamilysService {
  endpoint:string;

  constructor(public http : HttpClient) {

    console.log("FamilysService -- constructor");
    this.endpoint = "http://localhost:8080/API/publicaciones/family";

   }

   getAll() :  Observable <any>{

    console.log("FamilysService -- getAll")
    return this.http.get(this.endpoint);

  }
 
}


