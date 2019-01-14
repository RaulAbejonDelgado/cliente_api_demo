import { CommentsService } from 'src/app/providers/comments.service';
import { Comentario } from './../../../model/comentario';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-backoffice-comment',
  templateUrl: './backoffice-comment.component.html',
  styleUrls: ['./backoffice-comment.component.scss']
})
export class BackofficeCommentComponent implements OnInit {
  comentarios : Comentario[];
  constructor(private comentasService:CommentsService,private router: Router) {
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

  elimniar(id: number) {
    console.log(id);
    let txt;
    let r = confirm("Esta apunto de eliminar un registro");
    if (r == true) {
      this.comentasService.delete(id).subscribe(data => {
        console.debug("Eliminado data");

        this.getAll();
        
      })
    } else {
      txt = "You pressed Cancel!";
    }
    this.router.navigate(['../../backoffice-comment']);
  }

}
