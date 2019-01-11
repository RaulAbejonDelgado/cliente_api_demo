import { PersonsService } from './../../providers/persons.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Person } from 'src/app/model/person';
import { LoginService } from 'src/app/providers/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  flag: boolean;
  formulario : FormGroup;
  
  constructor(private personaService : PersonsService, private loginService : LoginService,private router: Router) {

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

  // tryLogin(){
    
  //   console.log("FamiliasComponent -- sumitar");
  //   console.log("controls %o" ,this.formulario.controls);
  //   let persona = new Person();
    
  //   persona.correo = this.formulario.controls.correo.value;
  //   persona.password = this.formulario.controls.password.value;

  //   this.flag = this.loginService.login(persona);
  //   if(this.flag){
  //     this.router.navigate(['comentario-nuevo']);
  //   }
  // }

  sumitar(){
    console.log("LoginComponent - sumitar")
    //todo llamar al servicio de login

    //recoger parametros del formulario

    let nombre = this.formulario.controls.correo.value;
    let password = this.formulario.controls.password.value;

    console.log("nombre %o", nombre);
    console.log("nombre %o", password);


    let u = new Person();
    u.nombre = nombre;
    u.password = password;

    //llamar al servicio
    if(this.loginService.login(u)){
      this.router.navigate(['comentario-nuevo']);
    }else{
      // this.mensaje = "Credenciales no validas, prueba de nuevo";
      // this.logueo = false;
    }

  }

  login(){
    console.log("FamiliasComponent -- sumitar");
    console.log("controls %o" ,this.formulario.controls);
    let persona = new Person();
    
    persona.correo = this.formulario.controls.correo.value;
    persona.password = this.formulario.controls.password.value;

    this.personaService.checkLogin(persona).subscribe(res =>{
      console.log(res);
      if (res!= null){
        this.personaService.setLogState(true);
        this.router.navigate(['comentario-nuevo']);
      }
      
    });
    if(this.flag){
     
    }
  }

  }


