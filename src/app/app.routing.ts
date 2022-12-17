import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './views/login/login.component';
import { HomeComponent } from './views/home/home.component';
import { TransferenciasComponent } from './views/home/transferencias/transferencias.component';
import { DestinatariosComponent } from './views/home/destinatarios/destinatarios.component';

const routes: Routes =[
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        redirectTo: 'transferencias',
      },
      {
        path: 'transferencias',
        component: TransferenciasComponent,
      },
      {
        path: 'destinatarios',
        component: DestinatariosComponent,
      },
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
