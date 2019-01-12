import { Comentario } from 'src/app/model/comentario';
import { CommentsService } from './../../providers/comments.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.scss']
})
export class ComentariosComponent implements OnInit {
  comentarios : Comentario[];
  constructor(private comentarioService:CommentsService) {

    this.comentarios = [];
    this.getAllComments();

   }

  ngOnInit() {
  }

  getAllComments(){
    this.comentarios=[];
    this.comentarioService.getAll().subscribe(res=>{
      res.forEach(comentario => {

        this.comentarios.push(comentario);
        
      });
      //invierto el array para mostrar el ultimo comentario como primero en la tabla
     this.comentarios.reverse();
    })
  }

}
