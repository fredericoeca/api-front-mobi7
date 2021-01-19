import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Poi } from 'src/app/model/poi.model';
import { Posicao } from 'src/app/model/posicao.model';
import { DataFormatPipe } from 'src/app/pipe/data-format.pipe';
import { PoisService } from 'src/app/service/pois.service';
import { PosicaoService } from 'src/app/service/posicao.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  placa: string = '';
  data: Date;

  placas: Array<string> = [];
  posicoesMonitoramento: Array<Posicao> = [];
  posicoesPorCarro: Array<any> = [];
  pois: Array<Poi> = [];
  monitoramento: Array<any> = [];

  constructor(
    private posicaoService: PosicaoService,
    private poisService: PoisService,
    private dataFormat: DataFormatPipe
  ) { }

  ngOnInit() {
    this.loadPois();
    this.loadPlacas();
  }

  loadPois() {
    this.poisService.getPois().subscribe( res => {
      this.pois = res;
    });
  }

  loadPlacas() {
    this.posicaoService.getPlacas().subscribe( res => {
      this.placas = res;
      this.loadPosicoes();
    });
  }

  loadPosicoes(placa?: string, data?: Date) {
    this.monitoramento = [];
    this.posicaoService.getPosicao(placa, this.dataFormat.transform(data)).subscribe( res => {
      if(placa) {
        this.posicoesPorCarro.push({
          placa: placa,
          posicoes: res.filter( posicao => posicao.placa === placa )
        });
      } else {
        this.placas.forEach( placa => {
          this.posicoesPorCarro.push({
            placa: placa,
            posicoes: res.filter( posicao => posicao.placa === placa )
          });
        });
      }
      this.monitoramentoFrota();
    });
  }

  monitoramentoFrota() { 

    this.posicoesPorCarro.forEach( posicao => {

      this.pois.forEach( poi => {
        this.posicoesMonitoramento = [];
        posicao.posicoes.forEach( pos => {
          
          if(this.isPositionInPoint(pos.latitude, pos.longitude, poi.latitude, poi.longitude, poi.raio) && (posicao.posicoes.indexOf(pos) + 1) !== posicao.posicoes.length) {        
            this.posicoesMonitoramento.push(pos);
          } else if(this.isPositionInPoint(pos.latitude, pos.longitude, poi.latitude, poi.longitude, poi.raio) && (posicao.posicoes.indexOf(pos) + 1) === posicao.posicoes.length) {
            this.posicoesMonitoramento.push(pos);
            this.registrarMonitoramento(pos.placa, poi.nome, this.posicoesMonitoramento);
            this.posicoesMonitoramento = [];
          } else {
            if(this.posicoesMonitoramento.length !== 0) {
              this.registrarMonitoramento(pos.placa, poi.nome, this.posicoesMonitoramento);
              this.posicoesMonitoramento = [];
            }
          }
        });
      });

    });  
    console.log(this.monitoramento);
  }

  search() {
    this.posicoesPorCarro = [];
    this.loadPosicoes(this.placa || undefined, this.data);
  }

  registrarMonitoramento(placa: string, poiNome: string, posicoes: Array<any>) {
    this.monitoramento.push({
      placa: placa,
      posicao: poiNome,
      inicio: posicoes[0].data,
      final: posicoes[posicoes.length - 1].data,
      periodo: this.periodoPermanenciaEmPonto(posicoes[0].data, posicoes[posicoes.length - 1].data),
      posicoes: this.posicoesMonitoramento
    });
  }

  linkMaps(latitude: number, longitude: number): string {
    return `http://maps.google.com/maps?q=${latitude},${longitude}`;
  }

  isPositionInPoint(latitudePosicao: number, longitudePosicao: number, latitudePonto: number, longitudePonto: number, raio: number) {
    let distancia = 6378140 * Math.acos(Math.cos(Math.PI * (90 - latitudePosicao) / 180) * Math.cos((90 - latitudePonto) * Math.PI / 180)
    + Math.sin((90 - latitudePosicao) * Math.PI / 180) * Math.sin((90 - latitudePonto) * Math.PI / 180) * Math.cos((longitudePonto - longitudePosicao) * Math.PI / 180));
    return distancia <= raio;      
  }

  periodoPermanenciaEmPonto(inicio: Date, fim: Date) {
    let periodo = new Date(fim).getTime() - new Date(inicio).getTime();
    let dias = periodo / (24 * 60 * 60 * 1000) >= 1 ? Math.floor(periodo / (24 * 60 * 60 * 1000)) : 0;
    let horas = periodo / (60 * 60 * 1000) - (dias * 24) >= 1 ? Math.floor(periodo / (60 * 60 * 1000) - (dias * 24)) : 0;
    let minutos = periodo / (60 * 1000) - (horas * 60 + (dias * 24 * 60)) >= 1 ? Math.floor(periodo / (60 * 1000) - (horas * 60 + (dias * 24 * 60))) : 0;
    let segundos = (periodo / 1000) - ((dias * 24 * 60 * 60) + (horas * 60 * 60) + (minutos * 60)) >= 1 ? Math.floor(periodo / 1000) - ((dias * 24 * 60 * 60) + (horas * 60 * 60) + (minutos * 60)) : 1;
      
    return `${dias} dia${ dias !== 1 ? `s` : `` }, ${horas} hora${ horas !== 1 ? `s` : `` }, ${minutos} minuto${ minutos !== 1 ? `s` : `` }, ${segundos} segundo${ segundos !== 1 ? `s` : `` }.`
  }

  filterMonitoramentoPorCarro(placa: string) {
    return this.monitoramento.filter(monitoramento => monitoramento.placa === placa);
  }
}
