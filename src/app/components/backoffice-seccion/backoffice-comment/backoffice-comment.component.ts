import { CommentsService } from 'src/app/providers/comments.service';
import { Comentario } from './../../../model/comentario';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-backoffice-comment',
  templateUrl: './backoffice-comment.component.html',
  styleUrls: ['./backoffice-comment.component.scss']
})
export class BackofficeCommentComponent implements OnInit {
  comentarios : Comentario[];
  constructor(private comentasService:CommentsService) {
    this.comentarios = [];
    this.getAll();
   }

  ngOnInit() {
  }

  getAll(){
    this.comentasService.getAll().subscribe(res=>{
      res.forEach(comentario => {
        this.comentarios.push(comentario);
        this.comentarios.reverse();
        
      });
    })
  }

}
