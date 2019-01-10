import { LoginService } from './../providers/login.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComentariosGuard implements CanActivate {

  constructor(private loginService : LoginService,private router: Router){

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    console.trace("ComentariosGuard - canActivate ");
    if ( !this.loginService.isLogged() ){

      console.log("Guard estado :"+ !this.loginService.isLogged());
      this.router.navigate(['login']);
      return false;

    }

    
    console.log("Guard estado :"+ !this.loginService.isLogged()+" redirecionando a comentarios");
    return true;
  }
}
