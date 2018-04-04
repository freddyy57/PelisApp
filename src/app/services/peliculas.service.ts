import { Injectable } from '@angular/core';

import { Jsonp } from '@angular/http';
import  'rxjs/Rx';

@Injectable()
export class PeliculasService {

  private apikey:string ="";
  private urlMoviedb:string = "https://api.themoviedb.org/3";

  peliculas:any[] = [];

  constructor( private jsonp:Jsonp) { }


  getCartelera() {
    let desde = new Date();
    let hasta = new Date();
    hasta.setDate( hasta.getDate() + 7 );

    let desdeStr = `${ desde.getFullYear() }-${ desde.getMonth()+1 }-${ desde.getDate() }`;
    let hastaStr = `${ hasta.getFullYear() }-${ hasta.getMonth()+1 }-${ hasta.getDate() }`;

    let url =`${this.urlMoviedb}/discover/movie?primary_release_date.gte=${ desdeStr }&primary_release_date.lte=${ hastaStr }&api_key=${ this.apikey }&language=es&callback=JSONP_CALLBACK`;
    //console.log(url);
    return this.jsonp.get( url )
               .map( (res:any)=> {
                 console.log("Del service: ",res.json());
                 return res.json().results;
               });
  }

  getPopularesKids() {
    let url =`${this.urlMoviedb}/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc&api_key=${ this.apikey }&language=es&callback=JSONP_CALLBACK`;
    return this.jsonp.get( url )
               .map( res=> res.json().results);
  }


  getPopulares() {
    let url =`${this.urlMoviedb}/discover/movie?sort_by=popularity.desc&api_key=${ this.apikey }&language=es&callback=JSONP_CALLBACK`;
    return this.jsonp.get( url )
               .map( res=> res.json().results);
  }

  buscarPelicula( texto:string ){

    let url = `${ this.urlMoviedb }/search/movie?query=${ texto }&sort_by=popularity.desc&api_key=${ this.apikey }&language=es&callback=JSONP_CALLBACK`;

    return this.jsonp.get( url )
                .map( res=> {
                  this.peliculas = res.json().results;
                  console.log("Peliculas del service buscar", this.peliculas);
                  return res.json().results;
                });
  }


  getPelicula( id:string ) {
    let url =`${this.urlMoviedb}/movie/${ id }?&api_key=${ this.apikey }&language=es&callback=JSONP_CALLBACK`;
    return this.jsonp.get( url )
               .map( res=> res.json());
  }


}
