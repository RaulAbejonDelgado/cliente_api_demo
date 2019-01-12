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

  }
}
