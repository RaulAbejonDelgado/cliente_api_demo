import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PersonsService } from '../providers/persons.service';

@Injectable({
  providedIn: 'root'
})
export class BackofficeGuard implements CanActivate {
  constructor(private personService: PersonsService, private router: Router) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    console.log("BackofficeGuard - canActivate ");
    console.log(this.personService.checkAdmin());
    if (!this.personService.checkAdmin()) {
      
      //console.log("Guard estado :"+ this.personService.isLogged());
      this.router.navigate(['login']);
      return false;

    }

    return true;
  }
}
