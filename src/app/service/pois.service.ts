import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Poi } from '../model/poi.model';

@Injectable({
  providedIn: 'root'
})
export class PoisService {

  URL_API: string = 'http://backend.mobi7-challenge.io:8080'

  constructor(
    private http: HttpClient
  ) { }

  getPois(): Observable<Array<Poi>> {
    return this.http.get<Array<Poi>>(`${this.URL_API}/pois`);
  }

  getPoiByName(poiNome: string): Observable<Poi> {
      return this.http.get<Poi>(`${this.URL_API}/pois/${poiNome}`);
  }
}
