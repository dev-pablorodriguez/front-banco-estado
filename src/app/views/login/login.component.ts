import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
    constructor(private toastr: ToastrService) {}
    
    ngOnInit() { }

    iniciarSesion(e: SubmitEvent){
        e.preventDefault();

        this.toastr.info('Todos los campos son obligatorios.', 'Advertencia', {
            timeOut: 8000,
            closeButton: true,
            enableHtml: true,
            toastClass: "alert alert-danger",
            positionClass: 'toast-top-right'
          });
    }
}
