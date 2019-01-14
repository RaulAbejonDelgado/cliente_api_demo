import { Component, OnInit } from '@angular/core';
import { Person } from 'src/app/model/person';
import { Family } from 'src/app/model/family';
import { PersonsService } from 'src/app/providers/persons.service';
import { FamilysService } from 'src/app/providers/familys.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { setTNodeAndViewData } from '@angular/core/src/render3/state';

@Component({
  selector: 'app-backoffice-person-editable',
  templateUrl: './backoffice-person-editable.component.html',
  styleUrls: ['./backoffice-person-editable.component.scss']
})
export class BackofficePersonEditableComponent implements OnInit {

  id:number;
  persona:Person;
  familia:Family;
  formulario: FormGroup;
  familias: Family[];
  mensaje: String;
  hayMensaje : boolean;
  

  constructor(private route: ActivatedRoute,
              private personService:PersonsService,
              private familyService:FamilysService) {
    this.formulario = new FormGroup({
      nombre: new FormControl('',
        [
          Validators.required,
          Validators.minLength(3),
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
      familySelector: new FormControl(),
      selfId : new FormControl()

    })
    this.persona = new Person();
    this.familias = [];
    this.mensaje = "";
    this.hayMensaje = false;
    this.getFamilys();
   


   }
  ngOnInit() {
    console.log("BackofficePersonEditableComponent -ngOnInit")
    this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      // llamar provider para conseguir datos a traves del id
      
      this.obtenerPorId(this.id);
});
  }
  /**
   * 
   * @param id selfId del objeto para obtener el detalle
   */
  obtenerPorId(id:number){
    if(id > 0){
      console.log("****Familia mayor a 0 ******")
      this.personService.getBySelfId(id).subscribe(data =>{
        data.forEach(persona => {
          this.persona = persona;
          this.setData();
        });
        this.obtenerFamilia();
        
      });
    }
    

}

/**
 * Para setear automaticamente el campo select con el valor de la familia
 */
obtenerFamilia(){
  this.familyService.getById(this.persona.familyId).subscribe(res=>{
    res.forEach(familia => {

      this.familia = familia;
      
    });
  })
}

/**
 * Repuebla el formulario con los datos a editar
 */
setData(){
  console.log(this.persona);
  if(this.persona != undefined){
    this.formulario.controls.nombre.setValue(this.persona.nombre);
    this.formulario.controls.correo.setValue(this.persona.correo);
    this.formulario.controls.password.setValue(this.persona.password);
    this.formulario.controls.selfId.setValue(this.persona.selfId);
  }else{
    this.hayMensaje = true;
    this.mensaje = " No se encontro coincidencia, pruebe a editar un registro existente"+
    " , o crear un registro nuevo";
    this.persona = new Person();
    this.persona.selfId = 0;
    this.formulario.controls.selfId.setValue(this.persona.selfId);
  }
}

/**
 * Familias para cargar el campo select familias
 */
getFamilys() {
  console.log("BackofficePersonEditableComponent -- getAll");

  this.familyService.getAll().subscribe(f => {

    f.forEach(element => {

      this.familias.push(element);

    });

  });

}

/**
 * crea si el campo hidden selfId tiene un 0 
 */
create(){
  console.log("*******CREANDO********");
  this.getFamilys();
  this.personService.add(this.setPerson()).subscribe(data => {
    console.debug(data);
    this.mensaje = "Registro creado con exito";
    this.hayMensaje = true;
  })

}

/**
 * Edita si el campo selfId tiene un valor distin a 0 
 * Si no tiene 0 es porque arrastra de la accion anterior este dato indicando edicion
 */
edit() {
  console.log("*******EDITANDO********");
  console.log("controls %o", this.formulario.controls);
  

  this.personService.update(this.setPerson()).subscribe(data => {
    console.debug(data);
    this.mensaje = "Registro editado con exito";
    this.hayMensaje = true;
  })

}

/**
 * evaluamos si es edicion o creacion para aprovechar el mismo componente
 */
editOrCreate(){

  let selfId = this.formulario.controls.selfId.value;
  console.log(selfId);
  switch(selfId) { 
    case null: { 
       this.create();
       break; 
    }
    default: { 
      //update
      this.edit();
      break; 
   }  

}
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
