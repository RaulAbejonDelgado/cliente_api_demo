import { Family } from './../../model/family';
import { FamilysService } from './../../providers/familys.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-familias',
  templateUrl: './familias.component.html',
  styleUrls: ['./familias.component.scss']
})
export class FamiliasComponent implements OnInit {

  familias: Family[];

  constructor(private familiaService: FamilysService) {

    console.log("FamiliasComponent -- constructor")
    this.familias = [];
    this.getAll();

  }

  ngOnInit() {
  }

  getAll() {
    console.log("FamiliasComponent -- getAll");

    this.familiaService.getAll().subscribe(f => {
      console.log(f);
      f.forEach(element => {
        console.log(element);
        this.familias.push(element);
        console.log(element.personas);
      });

    });

  }

}