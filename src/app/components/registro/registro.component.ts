import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  constructor() {
    
    console.log("RegistroComponent -- constructor");

   }

  ngOnInit() {
  }

  agregarFamilia(){
      
      console.log("RegistroComponent -- agregarFamilia");
  }

}
