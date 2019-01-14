import { Comentario } from './../../../model/comentario';
import { CommentsService } from './../../../providers/comments.service';
import { FamilysService } from './../../../providers/familys.service';
import { PersonsService } from './../../../providers/persons.service';
import { Component, OnInit } from '@angular/core';
import { Person } from 'src/app/model/person';
import { Family } from 'src/app/model/family';

@Component({
  selector: 'app-backoffice-navbar',
  templateUrl: './backoffice-navbar.component.html',
  styleUrls: ['./backoffice-navbar.component.scss']
})
export class BackofficeNavbarComponent implements OnInit {


  nPersonas : number;
  nFamilias : number;
  nComentarios : number;


  constructor( private personService : PersonsService,
               private familyService : FamilysService,
               private commentsService : CommentsService) {
  
  this.nPersonas = 0;
  this.nFamilias = 0;
  this.nComentarios = 0;

  this.countData();
                
  }

  ngOnInit() {
  }

  countData() {
    this.personService.getAll().subscribe(res=>{
      res.forEach(persona => {
        this.nPersonas ++;
      });
    })
    this.familyService.getAll().subscribe(res=>{
      res.forEach(familia => {
        this.nFamilias ++;
      });
    })
    this.commentsService.getAll().subscribe(res=>{
      res.forEach(comentario => {
        this.nComentarios ++;
      });
    })
  }

}
