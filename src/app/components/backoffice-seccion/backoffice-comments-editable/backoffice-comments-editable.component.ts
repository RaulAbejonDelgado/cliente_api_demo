import { CommentsService } from 'src/app/providers/comments.service';
import { Comentario } from 'src/app/model/comentario';
import { PersonsService } from './../../../providers/persons.service';
import { FamilysService } from 'src/app/providers/familys.service';
import { Component, OnInit } from '@angular/core';
import { Family } from 'src/app/model/family';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Person } from 'src/app/model/person';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-backoffice-comments-editable',
  templateUrl: './backoffice-comments-editable.component.html',
  styleUrls: ['./backoffice-comments-editable.component.scss']
})
export class BackofficeCommentsEditableComponent implements OnInit {
  id : number;
  familias: Family[];
  familia : Family;
  formulario : FormGroup;
  personas : Person[];
  comentario : Comentario;
  comentarios : Comentario[];
  hayMensaje : boolean ;
  mensaje : string;

  constructor(private familyService : FamilysService,
              private personService : PersonsService,
              private comentariosService : CommentsService,
              private route: ActivatedRoute) {
    
    this.id = 0 ;
    this.familias = [];
    this.personas = [];
    this.familia = new Family();
    this.comentario = new Comentario();
    this.hayMensaje = false;
    this.mensaje = "";
    this.getAllFamilys();
    this.getAllPersons();
    //this.getFamilyBySelfId();

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
        personas: new FormControl('',[Validators.required]),
        selfId : new FormControl('',[Validators.required]),
        familia : new FormControl('',[Validators.required]),
        
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
    console.log(id);
    if(id > 0){
      this.comentariosService.getBySelfId(id).subscribe(data =>{
        data.forEach(comentario => {
          this.comentario = comentario;
          console.log(this.comentario.selfId);
          this.setData();
          //this.getFamilyBySelfId();
        });   
      });
    }
    
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
  this.comentario.titulo = this.formulario.controls.titulo.value;
    this.comentario.texto = this.formulario.controls.texto.value;
    console.log(this.formulario.controls.personas.value);
    //buscamos la familia
    this.familyService.getById(this.formulario.controls.familia.value).subscribe(familiaObservable => {

      familiaObservable.forEach(familia => {
        //seteo la familia en el comenterio
        this.comentario.familia = [];
        this.comentario.familia.push(familia);
        //obtenemos la persona   
        this.personService.getBySelfId(this.formulario.controls.personas.value).subscribe(personObervable => {

          personObervable.forEach(persona => {
            //seteo la persona en el comentario
            //reseteo las personas para que 
            this.comentario.persona = [];
            this.comentario.persona.push(persona);
            //con el objeto completo hacemos post
            this.comentariosService.add(this.comentario).subscribe(data => {
              this.mensaje = "Comentario editado correctamente";
              this.hayMensaje = true;
              this.getComments();
              // this.getSelfComments();
            });
          });
        });
      });
    })

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

/**Actualiza el listado de comentarios */
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

  if(this.comentario.selfId != 0 ){
    console.log("************Seteando datos del comentario a editar**************");
    this.formulario.controls.titulo.setValue(this.comentario.titulo);
    this.formulario.controls.selfId.setValue(this.comentario.selfId);
    this.formulario.controls.texto.setValue(this.comentario.texto);
    this.formulario.controls.personas.setValue(this.comentario.persona[0].selfId);
    this.formulario.controls.familia.setValue(this.comentario.familia[0].selfId);
    //this.formulario.controls.personas.setValue(this.familia.personas);
    //this.cargarPersonas();
  }else{
    this.comentario = new Comentario();
    this.comentario.selfId = 0;
    this.formulario.controls.selfId.setValue(this.comentario.selfId);
  }
}

getFamilyBySelfId(){
  this.familyService.getById(this.comentario.persona[0].familyId).subscribe(res=>{
    this.familia = res;
  })
}



}
