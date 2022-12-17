import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-transferencias',
  templateUrl: './transferencias.component.html'
})
export class TransferenciasComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) {}
  
  ngOnInit() {
    if(!this.authService.isAuthenticated()){
      this.router.navigate(['login']);
    }
  }

}
