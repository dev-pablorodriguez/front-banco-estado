import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-destinatarios',
  templateUrl: './destinatarios.component.html'
})
export class DestinatariosComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) {}
  
  ngOnInit() {
    if(!this.authService.isAuthenticated()){
      this.router.navigate(['login']);
    }
  }

}
