import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SharedModule } from '../shared/shared.module';

import { HomeComponent } from './home/home.component'
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { DestinatariosComponent } from './home/destinatarios/destinatarios.component';
import { TransferenciasComponent } from './home/transferencias/transferencias.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    SharedModule,
    FormsModule
  ],
  declarations: [
    LoginComponent,
    HomeComponent,
    DestinatariosComponent,
    TransferenciasComponent
  ],
  exports: [
  ]
})
export class ComponentsModule { }
