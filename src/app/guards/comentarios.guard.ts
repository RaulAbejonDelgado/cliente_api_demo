import { PersonsService } from './../providers/persons.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComentariosGuard implements CanActivate {

  constructor(private personService: PersonsService, private router: Router) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    console.log("ComentariosGuard - canActivate ");
    if (!this.personService.checkLogState()) {

      //console.log("Guard estado :"+ this.personService.isLogged());
      this.router.navigate(['login']);
      return false;

    }

    return true;
  }
}
