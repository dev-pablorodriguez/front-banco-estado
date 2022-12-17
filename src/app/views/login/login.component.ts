import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { LoginResponse } from '../../interfaces/LoginResponse';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  public username: string;
  public password: string

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) {}
  
  ngOnInit() {
    if(this.authService.isAuthenticated()){
      this.router.navigate(['/']);
    }
  }

  iniciarSesion(e: SubmitEvent){
    e.preventDefault();

    if(this.username?.trim() === '' || this.password?.trim() === ''){
      this.toastr.info('Todos los campos son obligatorios.', 'Advertencia', {
        timeOut: 8000,
        closeButton: true,
        enableHtml: true,
        toastClass: "alert alert-warning",
        positionClass: 'toast-top-right'
      });

      return;
    }

    this.authService.login(this.username, this.password)
      .subscribe( (res: LoginResponse) => {
        this.authService.setJwtToken(res.token);
        this.router.navigate(['/']);

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
