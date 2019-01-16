import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { getAllDebugNodes } from '@angular/core/src/debug/debug_node';
import { Observable } from 'rxjs';
import { Family } from '../model/family';

@Injectable({
  providedIn: 'root'
})
export class FamilysService {
  endpoint: string;

  constructor(public http: HttpClient) {

    console.log("FamilysService -- constructor");
    this.endpoint = "http://localhost:8080/API/publicaciones/familias";

  }

  getAll(): Observable<any> {

    console.log("FamilysService -- getAll")
    return this.http.get(this.endpoint);

  }

getById(id: number): Observable<any> {

  return this.http.get(this.endpoint + "/" + id);

}

add(familia : Family): Observable<any>{
  console.trace(`PersonsService add ${this.endpoint}`);
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
  return this.http.post( this.endpoint, JSON.stringify(familia),httpOptions  );
}

update(familia: Family): Observable<any>{
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
};
  return this.http.put( this.endpoint+"/"+familia.selfId, JSON.stringify(familia) , httpOptions );
}

delete(id: number): Observable <any>{
  let uri = this.endpoint + "/"+id;
  console.log("FamilyService - delete->" + uri);
  return this.http.delete(uri);
}
  

}

