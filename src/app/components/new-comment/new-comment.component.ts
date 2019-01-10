import { Person } from './../../model/person';
import { CommentsService } from 'src/app/providers/comments.service';
import { PersonsService } from './../../providers/persons.service';
import { Comentario } from 'src/app/model/comentario';
import { Component, OnInit } from '@angular/core';
import { Family } from 'src/app/model/family';
import { FamilysService } from 'src/app/providers/familys.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-comment',
  templateUrl: './new-comment.component.html',
  styleUrls: ['./new-comment.component.scss']
})
export class NewCommentComponent implements OnInit {

  familias: Family[];
  formulario : FormGroup;
  personaArray : Person[];
  comentario : Comentario;
  mensaje: string;
  hayMensaje:boolean;
  
  constructor(private familiasService:FamilysService, private personasService: PersonsService, private comentariosService: CommentsService) {

    console.log("NewCommentComponent -- constructor");
    this.formulario = new FormGroup({
      nombre : new FormControl('',
                              [
                                Validators.required,
                                Validators.minLength(2),
                                Validators.maxLength(50)
                              ]),
      familia: new FormControl(),
      texto: new FormControl('',
                                  [
                                    Validators.required,
                                    Validators.minLength(6),
                                    Validators.maxLength(200)
                                  ]),
      titulo: new FormControl('',[
                                    Validators.required,
                                    Validators.minLength(6),
                                    Validators.maxLength(200)
                              ])                                                      
                                  
})
    this.mensaje = "";
    this.hayMensaje = false,
    this.comentario = new Comentario();
    this.familias = [];
    this.personaArray = [];
    this.getFamilys();
   }

  ngOnInit() {
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

    this.comentario.titulo = this.formulario.controls.titulo.value;
    this.comentario.texto = this.formulario.controls.texto.value;

    //obtenemos la familia
    this.familiasService.getById(this.formulario.controls.familia.value).subscribe(familiaObservable =>{

      familiaObservable.forEach(familia => {

        this.comentario.familia.push(familia);
          //obtenemos la persona   
            this.personasService.getByName(this.formulario.controls.nombre.value).subscribe(personObervable =>{

              personObervable.forEach(persona => {

                  this.comentario.persona.push(persona);
                      //con el objeto completo hacemos post
                      this.comentariosService.add(this.comentario).subscribe(data=>{
                        this.mensaje = "Comentario creado correctamente";
                        this.hayMensaje = true ;
                      });
              });
            });
      });
    })
  }
}


