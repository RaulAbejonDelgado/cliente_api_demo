import { PersonsService } from './../../providers/persons.service';
import { Family } from './../../model/family';
import { FamilysService } from './../../providers/familys.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '../../../../node_modules/@angular/forms';
import { PersonasComponent } from '../personas/personas.component';
import { Person } from 'src/app/model/person';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  flag:boolean;
  familias: Family[];
  formulario : FormGroup;
  mensaje:string;
  hayMensaje:boolean;

  constructor(private familiasService:FamilysService, private persoansService:PersonsService)  {
    
    console.log("RegistroComponent -- constructor");
    this.flag = false;
    this.familias = [];
    this.mensaje = "";
    this.hayMensaje =false;

    this.formulario = new FormGroup({
      nombre : new FormControl('',
                              [
                                Validators.required,
                                Validators.minLength(2),
                                Validators.maxLength(50)
                              ]),
      password: new FormControl('',
                                [
                                  Validators.required,
                                  Validators.minLength(6),
                                  Validators.maxLength(50)
                                ]),
      correo: new FormControl('',
                                  [
                                    Validators.required,
                                    Validators.pattern('^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$'),
                                    Validators.maxLength(200)
                                  ]),
      familySelector: new FormControl()                            
                                  
})

    this.getFamilys();

   }

  ngOnInit() {
  }

  agregarFamilia(){
      
      console.log("RegistroComponent -- agregarFamilia");
      this.flag = !this.flag;
      console.log(this.flag);
      let select = document.getElementById("familySelector");
      let familyField = document.getElementById("nuevaFamilia");

      if(this.flag === true){

        select.style.display = "none";
        familyField.style.display = "block";
        familyField.setAttribute("required","required");
        familyField.setAttribute("minlength","5");
        familyField.setAttribute("maxlength","150");


      }else{

        select.style.display = "block";
        familyField.style.display = "none";
        familyField.setAttribute("required","false");
        
      }
  }

  getFamilys(){
    console.log("FamiliasComponent -- getAll");

    this.familiasService.getAll().subscribe(f=>{

      f.forEach(element => {

        this.familias.push(element);

      });
      
    });

  }

  sumitar(){
    console.log("FamiliasComponent -- sumitar");
    console.log("controls %o" ,this.formulario.controls);
    let persona = new Person();
    
    persona.nombre = this.formulario.controls.nombre.value;
    persona.correo = this.formulario.controls.correo.value;
    persona.familyId = parseInt(this.formulario.controls.familySelector.value);
    persona.password = this.formulario.controls.password.value;
    this.persoansService.add(persona).subscribe(data =>{
      console.debug(data);
      this.mensaje="Registro creado con exito";
      this.hayMensaje = true;
})

    console.log(persona);
  }

}
