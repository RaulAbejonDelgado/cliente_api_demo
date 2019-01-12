import { FamilysService } from './../../providers/familys.service';
import { PersonsService } from './../../providers/persons.service';
import { Person } from 'src/app/model/person';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Family } from 'src/app/model/family';

@Component({
  selector: 'app-persona-detalle',
  templateUrl: './persona-detalle.component.html',
  styleUrls: ['./persona-detalle.component.scss']
})
export class PersonaDetalleComponent implements OnInit {

  id:number;
  persona:Person;
  familia:Family;
  

  constructor(private route: ActivatedRoute, private personService:PersonsService,private familyService:FamilysService) { }

  ngOnInit() {
    console.trace("CardComponent -ngOnInit")
    this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      // llamar provider para conseguir datos a traves del id
      this.obtenerPorId(this.id);
});
  }
  obtenerPorId(id:number){
    this.personService.getBySelfId(id).subscribe(data =>{
      data.forEach(persona => {
        this.persona = persona;
      });
      this.obtenerFamilia();
      
    });

}

obtenerFamilia(){
  this.familyService.getById(this.persona.familyId).subscribe(res=>{
    res.forEach(familia => {

      this.familia = familia;
      
    });
  })
}

}
