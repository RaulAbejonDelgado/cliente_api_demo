import { FamilysService } from 'src/app/providers/familys.service';
import { Family } from './../../model/family';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-familia-detalle',
  templateUrl: './familia-detalle.component.html',
  styleUrls: ['./familia-detalle.component.scss']
})
export class FamiliaDetalleComponent implements OnInit {

  id:number;
  familia:Family;
  

  constructor(private route: ActivatedRoute, private familyService:FamilysService) { }

  ngOnInit() {
    console.trace("CardComponent -ngOnInit")
    this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      // llamar provider para conseguir datos a traves del id
      this.obtenerPorId(this.id);
});
  }
  obtenerPorId(id:number){
    this.familyService.getById(id).subscribe(data =>{
      data.forEach(familia => {
        this.familia = familia;
      });
      
    });

}
}