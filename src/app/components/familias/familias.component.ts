import { PersonsService } from './../../providers/persons.service';
import { Family } from './../../model/family';
import { FamilysService } from './../../providers/familys.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-familias',
  templateUrl: './familias.component.html',
  styleUrls: ['./familias.component.scss']
})
export class FamiliasComponent implements OnInit {

  familias: Family[];

  constructor(private familiaService: FamilysService, private personService : PersonsService) {

    console.log("FamiliasComponent -- constructor")
    this.familias = [];
    this.getAll();

  }

  ngOnInit() {
  }

  getAll() {
    console.log("FamiliasComponent -- getAll");

    this.familiaService.getAll().subscribe(f => {
      f.forEach(element => {
        this.familias.push(element);
      });
      this.familias.reverse();
    });

  }

  isLogued():boolean{
    let resul = false;
    resul = this.personService.checkLogState();
    return resul;
  }

}