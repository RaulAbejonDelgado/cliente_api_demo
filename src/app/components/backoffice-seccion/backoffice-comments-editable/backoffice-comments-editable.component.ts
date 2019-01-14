import { CommentsService } from 'src/app/providers/comments.service';
import { Comentario } from 'src/app/model/comentario';
import { PersonsService } from './../../../providers/persons.service';
import { FamilysService } from 'src/app/providers/familys.service';
import { Component, OnInit } from '@angular/core';
import { Family } from 'src/app/model/family';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Person } from 'src/app/model/person';

@Component({
  selector: 'app-backoffice-comments-editable',
  templateUrl: './backoffice-comments-editable.component.html',
  styleUrls: ['./backoffice-comments-editable.component.scss']
})
export class BackofficeCommentsEditableComponent implements OnInit {
  familias: Family[];
  formulario : FormGroup;
  personas : Person[];
  comentario : Comentario;
  comentarios : Comentario[];
  hayMensaje : boolean ;
  mensaje : string;

  constructor(private familyService : FamilysService, private personService : PersonsService, private comentariosService : CommentsService) {

    this.familias = [];
    this.personas = [];
    this.comentario = new Comentario();
    this.hayMensaje = false;
    this.mensaje = "";
    this.getAllFamilys();
    this.getAllPersons();

    this.formulario = new FormGroup({
      titulo: new FormControl('',
      [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(50)
      ]),
      texto: new FormControl('',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(50)
        ]),
        personas: new FormControl(''),
        selfId : new FormControl(''),
        familia : new FormControl(''),
        
    })

    this.setData();
   }

  ngOnInit() {
  }

  getAllFamilys(){
    console.log("BackofficeCommentsEditableComponent -- getAllFamilys")
    this.familyService.getAll().subscribe(res=>{
      res.forEach(familia => {
        this.familias.push(familia);
        
      });
    })
  }

  getAllPersons(){
    console.log("BackofficeCommentsEditableComponent -- getAllPersons");
    this.personService.getAll().subscribe(res=>{
      res.forEach(persona => {
        this.personas.push(persona);
      });
    })
  }

/**
 * crea si el campo hidden selfId tiene un 0 
 */
create(){
    this.comentario.titulo = this.formulario.controls.titulo.value;
    this.comentario.texto = this.formulario.controls.texto.value;
    console.log(this.formulario.controls.personas.value);
    //buscamos la familia
    this.familyService.getById(this.formulario.controls.familia.value).subscribe(familiaObservable => {

      familiaObservable.forEach(familia => {
        //seteo la familia en el comenterio
        this.comentario.familia.push(familia);
        //obtenemos la persona   
        this.personService.getBySelfId(this.formulario.controls.personas.value).subscribe(personObervable => {

          personObervable.forEach(persona => {
            //seteo la persona en el comentario
            this.comentario.persona.push(persona);
            //con el objeto completo hacemos post
            this.comentariosService.add(this.comentario).subscribe(data => {
              this.mensaje = "Comentario creado correctamente";
              this.hayMensaje = true;
              this.getComments();
              // this.getSelfComments();
            });
          });
        });
      });
    })
  }


/**
 * Edita si el campo selfId tiene un valor distin a 0 
 * Si no tiene 0 es porque arrastra de la accion anterior este dato indicando edicion
 */
edit() {
  // console.log("*******EDITANDO********");
  // console.log("controls %o", this.formulario.controls);

  // this.mergePersons();
  // let family =this.setFamily();
  // this.familyService.update(family).subscribe(data => {
  //   console.debug(data);
  //   this.mensaje = "Registro editado con exito";
  //   this.hayMensaje = true;
  //})

}

  editOrCreate(){
    //this.getPersonById()
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

getComments(){
  this.comentarios = [];
  this.comentariosService.getAll().subscribe(res=>{
    res.forEach(comentario => {
      this.comentarios.push(comentario);
    });
  })
}

  /**
 * Repuebla el formulario con los datos a editar
 */
setData(){
  console.log(this.comentario);
  if(this.comentario.selfId != 0 ){
    this.formulario.controls.titulo.setValue(this.comentario.titulo);
    this.formulario.controls.selfId.setValue(this.comentario.selfId);
    this.formulario.controls.texto.setValue(this.comentario.texto);
    //this.formulario.controls.personas.setValue(this.familia.personas);
    //this.cargarPersonas();
  }else{
    this.hayMensaje = true;
    this.mensaje = " No se encontro coincidencia, pruebe a editar un registro existente"+
    " , o crear un registro nuevo";
    this.comentario = new Comentario();
    this.comentario.selfId = 0;
    this.formulario.controls.selfId.setValue(this.comentario.selfId);
  }
}



}
