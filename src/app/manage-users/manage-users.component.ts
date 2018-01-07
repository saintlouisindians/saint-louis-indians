import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.less']
})
export class ManageUsersComponent implements OnInit {

  users: any[];
  availableRoles: any = ['Admin', 'Movie_Distributer', 'Business_Owner', 'General'];
  constructor(private profileSvc: ProfileService) { }

  ngOnInit() {
    this.profileSvc.getUsers().subscribe(
      (resp) => {
        this.users = resp;
      }
    )
  }

  contains(roles: any[], role: string): boolean {
    let flag = false;

    roles.forEach(element => {
      if (element.Name === role) {
        flag = true;
        return true;
      }
    });
    if (flag) return true; else return false;
  }

  onRoleSelected(user, i, event) {
    if (event.target.checked) {
      this.users[i].Roles.push({ Name: event.target.value })
    } else {
      this.users[i].Roles = this.users[i].Roles.filter(n => n.Name != event.target.value)
    }
  }

  onUpdateClick(user) {
    this.profileSvc.updateUser(user).subscribe(
      (resp) => console.log(resp)
    )
  }
}
