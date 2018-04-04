import { Component, OnInit } from '@angular/core';
import { PeliculasService } from '../../services/peliculas.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  cartelera:any;
  populares:any;
  populareskids:any;

  constructor( private _ps:PeliculasService) {

    this._ps.getCartelera()
            .subscribe( data=> {
              console.log("los datos son: ", data);
              this.cartelera = data;
            })

    this._ps.getPopulares()
            .subscribe( data=> { this.populares = data; })

    this._ps.getPopularesKids()
            .subscribe( data=> { this.populareskids = data; })              

   }

  ngOnInit() {
  }

}
