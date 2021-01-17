import { Component, OnInit } from '@angular/core';
import { DataFormatPipe } from 'src/app/pipe/data-format.pipe';
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

  constructor(
    private posicaoService: PosicaoService,
    private dataFormat: DataFormatPipe
  ) { }

  ngOnInit() {
    this.loadPlacas();
    this.loadPosicoes(undefined, new Date());
  }

  loadPlacas() {
    this.posicaoService.getPlacas().subscribe( res => {
      this.placas = res;
    });
  }

  loadPosicoes(placa?: string, data?: Date) {
    this.posicaoService.getPosicao(placa, this.dataFormat.transform(data)).subscribe( res => {
      console.log(res);
    })
  }

}
