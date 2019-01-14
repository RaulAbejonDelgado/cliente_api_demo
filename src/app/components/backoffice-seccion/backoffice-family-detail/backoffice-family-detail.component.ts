import { Family } from './../../../model/family';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, Form } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PersonsService } from 'src/app/providers/persons.service';
import { FamilysService } from 'src/app/providers/familys.service';
import { Person } from 'src/app/model/person';

@Component({
  selector: 'app-backoffice-family-detail',
  templateUrl: './backoffice-family-detail.component.html',
  styleUrls: ['./backoffice-family-detail.component.scss']
})
export class BackofficeFamilyDetailComponent implements OnInit {

  id: number;
  formulario: FormGroup;
  mensaje: String;
  familia: Family;
  hayMensaje : boolean;
  personasArray : Person[];
  personas : Person[];
  personasForm : FormGroup;
  persona : FormControl;
  personasFamilia : Person[];

  constructor(private route: ActivatedRoute,
              private personService:PersonsService,
              private familyService:FamilysService) {

  this.id = 0;                
  this.personasArray = [];
  this.personasFamilia = [];
  this.personas = [];
  this.familia = new Family();
  this.persona = new FormControl();
  this.getAllPersons();
  
  this.formulario = new FormGroup({
    nombre: new FormControl('',
      [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(50)
      ]),
      personas: new FormArray( [this.crearPersonFormGroup()]),
      selfId : new FormControl(''),
  })

  this.setData();

  
}

  ngOnInit() {
    console.log("BackofficePersonEditableComponent -ngOnInit")
    this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      // llamar provider para conseguir datos a traves del id
      
      this.obtenerPorId(this.id);
});
  }

  obtenerPorId(id:number){
    if(id > 0){
      this.familyService.getById(id).subscribe(data =>{
        data.forEach(familia => {
          this.familia = familia;
          this.setData();
        });   
      });
    }
    
  }
  
  crearPersonFormGroup(): FormGroup{
    let personGroup = new FormGroup({
                persona: new FormControl('')
        });
    this.personasArray.forEach(res=>{
      personGroup.addControl('persona', new FormControl(res.selfId));
    })
    
    return personGroup;
}

  cargarPersonas() : FormGroup{
    console.log("cargarPersonas()**************")
    this.getAllPersonsByFamily();
    let personas : FormGroup;
    this.personasArray.forEach(persona =>{
      console.log(persona);
      personas.setControl('persona', new FormControl(persona.nombre)) ;

    this.formulario.setControl("personas",personas);


    })
    return personas;

  }

  getAllPersonsByFamily(){
    this.personService.getAll().subscribe(res=>{
      res.forEach(persona => {
        if(persona.selfId === this.familia.selfId){
          this.personasArray.push(persona);
        }
        
        
      });
    })
    
  }

  /**
 * Repuebla el formulario con los datos a editar
 */
setData(){
  console.log(this.familia);
  if(this.familia.selfId != 0 ){
    this.formulario.controls.nombre.setValue(this.familia.nombre);
    this.formulario.controls.selfId.setValue(this.familia.selfId);
    //this.formulario.controls.personas.setValue(this.familia.personas);
    this.cargarPersonas();
  }else{
    this.hayMensaje = true;
    this.mensaje = " No se encontro coincidencia, pruebe a editar un registro existente"+
    " , o crear un registro nuevo";
    this.familia = new Family();
    this.familia.selfId = 0;
    this.formulario.controls.selfId.setValue(this.familia.selfId);
  }
}

getPersonas(): FormArray{

  return this.formulario.get('personas') as FormArray;
}

getAllPersons(){
  this.personService.getAll().subscribe(res=>{
    res.forEach(persona => {
      this.personas.push(persona);
      
    });
  })
}

nuevoPersona(){
  let arrayPersonas = this.formulario.get('personas') as FormArray;
  arrayPersonas.push(this.crearPersonFormGroup());
}

/**
 * crea si el campo hidden selfId tiene un 0 
 */
create(){
  this.personas = [];
  console.log("*******CREANDO********");
  console.log(this.personas);
  let family =this.setFamily();
    family.personas = this.personasFamilia;
    this.familyService.add(family).subscribe(data => {
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

  this.mergePersons();
  let family =this.setFamily();
  this.familyService.update(family).subscribe(data => {
    console.debug(data);
    this.mensaje = "Registro editado con exito";
    this.hayMensaje = true;
  })

}

mergePersons(){
  let personTotales : Person[];
  personTotales = [];
  //personas existentes que no han sido eliminadas
  this.familia.personas.forEach(personaFamiliar =>{
    personTotales.push(personaFamiliar);
  })
  let nuevosPersonas : Person[];
  nuevosPersonas = [];
  //personas que se hayan podido añadir en la edicion
  nuevosPersonas = this.personasFamilia;
  nuevosPersonas.forEach(personaNueva =>{
    personTotales.push(personaNueva);
  })
  this.familia.personas = personTotales;
  //this.familia.personas = nuevosPersonas;
  console.log(this.familia.personas);
    
  
}

/**
 * evaluamos si es edicion o creacion para aprovechar el mismo componente
 */
editOrCreate(){
  this.getPersonById()
  let selfId = this.formulario.controls.selfId.value;
  console.log(selfId);
  switch(selfId) { 
    case 0: { 
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

setFamily():Family{

  this.familia.nombre = this.formulario.controls.nombre.value;
  console.log(this.formulario.controls.personas.value);
  this.familia.selfId = this.formulario.controls.selfId.value;
  console.log(this.personasFamilia);

  //this.familia.personas = this.personasFamilia;
  return this.familia;
}

getPersonById() : Person[]{
  this.formulario.controls.personas.value.forEach(element => {
    console.log(element.persona);
    this.personas.forEach(persona => {
      if(persona.selfId == element.persona && element.persona != ""){
        this.personasFamilia.push(persona);
      }
    });
    
  });
  return this.personasFamilia;

}

elimniarPersona(indice:number){
  this.familia.personas.splice(indice,1);
  console.log(this.familia);
}
}

