import { FamilysService } from './../../../providers/familys.service';
import { Component, OnInit } from '@angular/core';
import { Family } from 'src/app/model/family';
import { Router } from '@angular/router';

@Component({
  selector: 'app-backoffice-family',
  templateUrl: './backoffice-family.component.html',
  styleUrls: ['./backoffice-family.component.scss']
})
export class BackofficeFamilyComponent implements OnInit {
  familias: Family[];
  constructor(private familyService: FamilysService,private router: Router) {
    this.familias = [];
    this.getAll();
  }

  ngOnInit() {
  }

  getAll() {
    this.familyService.getAll().subscribe(res => {
      res.forEach(familia => {
        this.familias.push(familia);
        this.familias.reverse();

      });
    })
  }

  elimniar(id: number) {
    console.log(id);
    let txt;
    let r = confirm("Esta apunto de eliminar un registro");
    if (r == true) {
      this.familyService.delete(id).subscribe(data => {
        console.debug("Eliminado data");

        this.getAll();
        
      })
    } else {
      txt = "You pressed Cancel!";
    }
    this.router.navigate(['backoffice']);
  }

}
