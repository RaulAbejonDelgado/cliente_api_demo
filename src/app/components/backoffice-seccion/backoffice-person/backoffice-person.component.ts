import { PersonsService } from 'src/app/providers/persons.service';
import { Component, OnInit } from '@angular/core';
import { Person } from 'src/app/model/person';

@Component({
  selector: 'app-backoffice-person',
  templateUrl: './backoffice-person.component.html',
  styleUrls: ['./backoffice-person.component.scss']
})
export class BackofficePersonComponent implements OnInit {
  personas: Person[];
  hayMensaje : boolean ;
  mensaje : string;
  constructor(private personService:PersonsService) {
    this.personas = [];
    this.mensaje = "";
    this.hayMensaje = false;
    this.getAll();
   }
  

  ngOnInit() {
  }

  getAll(){
    this.personas = [];
    this.personService.getAll().subscribe(res=>{
      res.forEach(persona => {
        this.personas.push(persona);
        this.personas.reverse();
      });
    })
  }

  elimniar(id: number){
    console.log(id);
    let txt;
    let r = confirm("Esta apunto de eliminar un registro");
    if (r == true) {
      this.personService.delete(id).subscribe(data =>{
        console.debug("Eliminado data");
        this.mensaje = "registro borrado correctamente";
        this.hayMensaje = true;
        this.getAll();
      })
    } else {
        txt = "You pressed Cancel!";
    }
    
}



}
