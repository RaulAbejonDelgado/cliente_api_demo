import { Component, OnInit } from '@angular/core';
import { Family } from 'src/app/model/family';
import { FamilysService } from 'src/app/providers/familys.service';

@Component({
  selector: 'app-new-comment',
  templateUrl: './new-comment.component.html',
  styleUrls: ['./new-comment.component.scss']
})
export class NewCommentComponent implements OnInit {
  familias: Family[];
  constructor(private familiasService:FamilysService) {
    

    console.log("NewCommentComponent -- constructor");

    this.familias = [];
    this.getFamilys();
   }

  ngOnInit() {
  }

  getFamilys(){
    console.log("FamiliasComponent -- getAll");

    this.familiasService.getAll().subscribe(f=>{

      f.forEach(element => {

        this.familias.push(element);

      });
      
    });

  }

}
