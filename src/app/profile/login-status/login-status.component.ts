import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service'

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.less']
})
export class LoginStatusComponent implements OnInit {
  isLoggedIn: boolean;
  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    this.getLoginStatus();
  }

  getLoginStatus() {
    this.isLoggedIn = this.profileService.getLoginStatus();
  }

}
