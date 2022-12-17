import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html'
})
export class UserProfileComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) {}
  
  ngOnInit() {
    if(!this.authService.isAuthenticated()){
      this.router.navigate(['login']);
    }
  }

}
