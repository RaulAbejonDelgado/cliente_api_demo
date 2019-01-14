import { FamilysService } from './../../providers/familys.service';
import { Family } from 'src/app/model/family';
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
  familias : Family[];
  array : [];
  constructor(private comentarioService:CommentsService, private familiasService: FamilysService) {

    this.comentarios = [];
    this.familias = [];
    this.getAllComments();
    this.getAllFamilys();
 
    //this.array = new Array[this.familias.length];

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

  getAllFamilys(){
    this.familiasService.getAll().subscribe(res=>{
      res.forEach(f => {
        
          this.familias.push(f);
          //this.getAllCommentsByFamily(f);
        
        
      });
     
    })
  }

  getAllCommentsByFamily(f:Family):boolean{
    let resul = false;
    this.comentarioService.getCommentsByFamily(f).subscribe(res=>{
      res.forEach(c => {
        console.log("***************");
        //console.log(c);
        if(c != null){
          let comentario:Comentario = c;
          console.log(comentario);
          this.comentarios.push(comentario);
          resul = true;
        }
        
        
      });
    })
    return resul;
  }

  

}
