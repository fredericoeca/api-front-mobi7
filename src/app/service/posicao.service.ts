import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Posicao } from '../model/posicao.model';

@Injectable({
  providedIn: 'root'
})
export class PosicaoService {

  URL_API: string = 'http://backend.mobi7-challenge.io:8080'

  constructor(
    private http: HttpClient
  ) { }

  getPlacas(): Observable<Array<string>> {
    return this.http.get<Array<string>>(`${this.URL_API}/posicao/placas`);
  }

  getPosicao(placa?: string, data?: Date): Observable<Array<Posicao>> {
    let parameter = placa && data ? `?placa=${ placa }&data=${ data }` : placa ? `?placa=${ placa }` : data ? `?data=${ data }` : `` ;
    return this.http.get<Array<Posicao>>(`${this.URL_API}/posicao${ parameter }`);
  }  

}
