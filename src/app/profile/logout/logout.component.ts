import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    this.logout();
  }

  logout() {
    sessionStorage.clear();
    this.profileService.updateLoginStatus(false);
  }
}
