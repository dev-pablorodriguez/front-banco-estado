import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TransferenciasService } from '../../../services/transferencias.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-transferencias',
  templateUrl: './transferencias.component.html'
})
export class TransferenciasComponent implements OnInit {

  public transferencias = [];

  constructor(
    private authService: AuthService,
    private transferenciasService: TransferenciasService,
    private router: Router,
    private toastr: ToastrService
  ) {}
  
  ngOnInit() {
    if(this.authService.isAuthenticated()){
      
      this.cargarTransferencias();

    }else{
      this.router.navigate(['login']);
    }
  }

  cargarTransferencias = () => {
    this.transferenciasService.getTransferencias()
      .subscribe( res => {
        console.log(res)
        this.transferencias = res.transferencias;

      }, ({ error }) => {
        this.toastr.info(error.msg, 'Error', {
          timeOut: 8000,
          closeButton: true,
          enableHtml: true,
          toastClass: "alert alert-danger",
          positionClass: 'toast-top-right'
        });
      });
  }

}
