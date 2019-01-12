import { Family } from './../../model/family';
import { PersonsService } from './../../providers/persons.service';
import { Component, OnInit } from '@angular/core';
import { Person } from 'src/app/model/person';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.scss']
})
export class PersonasComponent implements OnInit {
  personas: Person[];

  constructor(private personasService: PersonsService) {

    console.log("PersonasComponent -- constructor");
    this.personas = [];
    //this.familia = [];
    this.getAll();

  }

  ngOnInit() {
  }

  getAll() {

    console.log("PersonasComponent -- getAll");
    this.personasService.getAll().subscribe(data => {
      data.forEach(element => {
        console.log(element);
        this.personas.push(element);

      });
      this.personas.reverse();
    });

  }
}
