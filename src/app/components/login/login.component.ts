import { PersonsService } from './../../providers/persons.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Person } from 'src/app/model/person';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  flag: boolean;
  formulario: FormGroup;

  constructor(private personaService: PersonsService, private router: Router) {

    console.log("LoginComponent -- constructor")
    this.flag = false;
    this.formulario = new FormGroup({
      correo: new FormControl('',
        [
          Validators.required,
          Validators.pattern('^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$'),
          Validators.maxLength(200)
        ]),
      password: new FormControl('',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(50)
        ])
    })
  }

  ngOnInit() {
  }

  /**
   * Al final tira del mismo persons.service por mantener toda la logica relacionada con las personas 
   */
  login() {
    console.log("FamiliasComponent -- sumitar");
    console.log("controls %o", this.formulario.controls);
    let persona = new Person();

    persona.correo = this.formulario.controls.correo.value;
    persona.password = this.formulario.controls.password.value;

    this.personaService.checkLogin(persona).subscribe(res => {
      console.log(res);
      if (res != null) {
        this.personaService.setLogState(true);
        this.router.navigate(['comentario-nuevo']);
      }

    });
    if (this.flag) {

    }
  }

}


