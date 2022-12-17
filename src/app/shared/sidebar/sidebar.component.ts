import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {

  constructor(private authService: AuthService, private router: Router){}

  cerrarSesion(){
    this.authService.cerrarSesion();
    this.router.navigate(['/']);
  }
}
