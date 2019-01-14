import { HttpClient } from '@angular/common/http';
import { PersonsService } from './../../providers/persons.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private personService: PersonsService, private router: Router) {

    console.log("NavbarComponent -- constructor")
  }

  ngOnInit() {
  }

  logOut() {
    console.log("Desconectando.....");

   // this.personService.logOut();
    this.personService.setLogState(false);
    this.router.navigate(['login']);

  }

  isLogued():boolean{
    let resul = false;
    resul = this.personService.checkLogState();
    return resul;
  }

  isAdmin():boolean{
    let resul = false;
    if(this.personService.getUser().nombre === "admin"){
      resul = true;
    }
    return resul;
  }

}
