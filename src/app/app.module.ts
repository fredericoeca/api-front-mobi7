import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { PosicaoService } from './service/posicao.service';
import { DataFormatPipe } from './pipe/data-format.pipe';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { FormsModule } from '@angular/forms';
import { PoisService } from './service/pois.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DataFormatPipe
  ],
  imports: [
    BrowserModule,
    CommonModule,    
    FormsModule,
    AppRoutingModule,
    AngularFontAwesomeModule,
    HttpClientModule
  ],
  providers: [
    DataFormatPipe,
    PosicaoService,
    PoisService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
