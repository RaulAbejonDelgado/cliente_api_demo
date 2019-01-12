import { Comentario } from './../../model/comentario';
import { PersonsService } from './../../providers/persons.service';
import { CommentsService } from 'src/app/providers/comments.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Person } from 'src/app/model/person';

@Component({
  selector: 'app-comentarios-detalle',
  templateUrl: './comentarios-detalle.component.html',
  styleUrls: ['./comentarios-detalle.component.scss']
})
export class ComentariosDetalleComponent implements OnInit {

  id:number;
  comentario:Comment;
  persona:Person;
  constructor(private route: ActivatedRoute, private comentariosService:CommentsService,private personaService:PersonsService) {

    this.persona = new Person();
    this.getLoguedUser();
    this.comentario = new Comment();

   }

  ngOnInit() {
    console.log("ComentariosDetalleComponent -ngOnInit")
    this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      // llamar provider para conseguir datos a traves del id
      this.obtenerPorId(this.id);
});
  }
  obtenerPorId(id:number){
    this.comentariosService.getBySelfId(id).subscribe(data =>{
      data.forEach(comentario => {
        //console.log(comentario);
        this.comentario = comentario;
      });     
    });

}

getLoguedUser(){

  this.persona = this.personaService.getUser()
}


}
