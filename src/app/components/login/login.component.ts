import { PersonsService } from './../../providers/persons.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Person } from 'src/app/model/person';
import { LoginService } from 'src/app/providers/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formulario : FormGroup;
  
  constructor(private personaService : PersonsService, private loginService : LoginService) {

    console.log("LoginComponent -- constructor")

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

  tryLogin(){

    console.log("FamiliasComponent -- sumitar");
    console.log("controls %o" ,this.formulario.controls);
    let persona = new Person();
    console.log(document.getElementById("familySelector"));
    
    persona.correo = this.formulario.controls.correo.value;
    persona.password = this.formulario.controls.password.value;
    this.loginService.login(persona).subscribe(el=>{
      this.loginService.isLogged();
    })
    // if(this.loginService.login(persona)){

    //   console.log("Usuario autentificado correctamente");

    // }else{
    //   console.log("Usuario no autentificado");
    // }

      // this.mensaje="Registro creado con exito";
      // this.hayMensaje = true;

  }

}
