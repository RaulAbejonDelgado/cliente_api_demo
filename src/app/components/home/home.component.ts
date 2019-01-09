import { Component, OnInit } from '@angular/core';
import { CommentsService } from 'src/app/providers/comments.service';
import { Comentario } from 'src/app/model/comentario';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  comentarios: Comentario[];

  constructor(private comentariosService: CommentsService) { 

    console.log("HomeComponent -- constructor");
    this.comentarios = [] ;
    this.getAll();

  }

  ngOnInit() {
    console.log("HomeComponent -- ngOnInit")
    
  }

  getAll(){
    console.log("HomeComponent -- getAll")
    this.comentariosService.getAll().subscribe(data=>{
      data.forEach(element => {
        console.log(element);
        
        this.comentarios.push(element);

      });
    })
    
  }

}
