import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Person } from 'src/app/model/person';
import { FamilysService } from 'src/app/providers/familys.service';
import { Family } from 'src/app/model/family';
import { PersonsService } from 'src/app/providers/persons.service';

@Component({
  selector: 'app-peril',
  templateUrl: './peril.component.html',
  styleUrls: ['./peril.component.scss']
})
export class PerilComponent implements OnInit {


  persona:Person;
  familias: Family[];
  formulario: FormGroup;
  mensaje: string;
  hayMensaje: boolean;
  
  constructor(private familiasService: FamilysService,private personService:PersonsService) { 

    this.mensaje = "";
    this.hayMensaje = false;
    this.familias = [];
    this.persona = new Person();
    this.formulario = new FormGroup({
      nombre: new FormControl('',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(50)
        ]),
      password: new FormControl('',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(50)
        ]),
      correo: new FormControl('',
        [
          Validators.required,
          Validators.pattern('^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$'),
          Validators.maxLength(200)
        ]),
      familySelector: new FormControl(),
      selfId : new FormControl(),

    })
    this.getUser();
    this.getFamilys();
    this.setData();
  }

  ngOnInit() {
  }

  getFamilys() {
    console.log("FamiliasComponent -- getAll");

    this.familiasService.getAll().subscribe(f => {

      f.forEach(element => {

        this.familias.push(element);

      });

    });

  }

  getUser(){
    this.persona = this.personService.getUser();
    
  }

  setData() {
    this.formulario.controls.nombre.setValue(this.persona.nombre);
    this.formulario.controls.correo.setValue(this.persona.correo);
    this.formulario.controls.password.setValue(this.persona.password);
    this.formulario.controls.selfId.setValue(this.persona.selfId);

  }

  edit() {
    console.log("*******EDITANDO********");
    console.log("controls %o", this.formulario.controls);
    let persona = this.setPerson();  
  
    this.personService.update(persona).subscribe(data => {
      console.debug(data);
      this.mensaje = "Registro editado con exito";
      this.hayMensaje = true;
    })
  
  }

  setPerson():Person{

    let persona = new Person();
    
    persona.nombre = this.formulario.controls.nombre.value;
    persona.correo = this.formulario.controls.correo.value;
    persona.familyId = parseInt(this.formulario.controls.familySelector.value);
    persona.password = this.formulario.controls.password.value;
    persona.selfId = this.formulario.controls.selfId.value;
    return persona;
  }
}
