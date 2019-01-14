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
  formulario: FormGroup;
  personaArray: Person[];
  comentario: Comentario;
  comentarios: Comentario[];
  comentariosPropios : Comentario[];
  mensaje: string;
  hayMensaje: boolean;
  persona : Person;

  constructor(private familiasService: FamilysService, private personasService: PersonsService, private comentariosService: CommentsService) {

    console.log("NewCommentComponent -- constructor");
    this.formulario = new FormGroup({
      nombre: new FormControl('',
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
      titulo: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(200)
      ])

    })
    this.comentarios = [];
    this.mensaje = "";
    this.hayMensaje = false,
    this.comentario = new Comentario();
    this.familias = [];
    this.personaArray = [];
    this.persona = new Person();
    this.getFamilys();
    this.getComments();
    this.getSelfComments();
    this.setData();
  }

  ngOnInit() {
  }

  getFamilys() {
    console.log("NewCommentComponent -- getAll");

    this.familiasService.getAll().subscribe(f => {

      f.forEach(element => {

        this.familias.push(element);

      });

    });

  }

  sumitar() {

    this.comentario.titulo = this.formulario.controls.titulo.value;
    this.comentario.texto = this.formulario.controls.texto.value;

    //buscamos la familia
    this.familiasService.getById(this.formulario.controls.familia.value).subscribe(familiaObservable => {

      familiaObservable.forEach(familia => {
        //seteo la familia en el comenterio
        this.comentario.familia.push(familia);
        //obtenemos la persona   
        this.personasService.getByName(this.formulario.controls.nombre.value).subscribe(personObervable => {

          personObervable.forEach(persona => {
            //seteo la persona en el comentario
            this.comentario.persona.push(persona);
            //con el objeto completo hacemos post
            this.comentariosService.add(this.comentario).subscribe(data => {
              this.mensaje = "Comentario creado correctamente";
              this.hayMensaje = true;
              this.getComments();
              this.getSelfComments();
            });
          });
        });
      });
    })
  }

  getComments(){
    this.comentarios = [];
    this.comentariosService.getAll().subscribe(res=>{
      res.forEach(comentario => {
        this.comentarios.push(comentario);
      });
    })
  }

  getSelfComments(){
    this.comentariosPropios = [];
    let persona : Person = this.personasService.getUser();
    this.comentariosService.getCommentsByUser(persona).subscribe(c=>{
      c.forEach(comentario => {
        this.comentariosPropios.push(comentario);
      });
    });
  }

  setData(){
    this.persona = this.personasService.getUser();
    this.formulario.controls.nombre.setValue(this.persona.nombre);
    
}
}


