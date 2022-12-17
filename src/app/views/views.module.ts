import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SharedModule } from '../shared/shared.module';

import { HomeComponent } from './home/home.component'
import { TypographyComponent } from './home/typography/typography.component';
import { UserProfileComponent } from './home/user-profile/user-profile.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';

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
    TypographyComponent,
    UserProfileComponent,
  ],
  exports: [
  ]
})
export class ComponentsModule { }
