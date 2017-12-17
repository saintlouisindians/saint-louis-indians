import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmEmailModel } from '../../models/confirm-email.model';
import { ProfileService } from '../../services/profile.service';
import { ModalPopUp } from '../../models/modalPopUp';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.less']
})
export class ConfirmEmailComponent implements OnInit {
  confirmEmailModel: ConfirmEmailModel;
  modal: ModalPopUp;
  constructor(private route: ActivatedRoute, private profileSvc: ProfileService) { }

  ngOnInit() {
    this.confirmEmail();
  }

  confirmEmail() {

    this.confirmEmailModel = {
      email: this.route.snapshot.queryParams['userId'],
      token: this.route.snapshot.queryParams['token']
    }
    console.log(this.confirmEmailModel);
    this.modal = {
      type: 'loading',
      operation: 'open',
      message: 'Your email has been verified'
    }
    this.profileSvc.confirmEmail(this.confirmEmailModel).subscribe(
      (res) => {
        this.modal.type = 'success';
        this.modal.returnUrl='login';
      },

      (error) => {
        this.modal.type = 'error';
        this.modal.message = 'Something went wrong. Please try again';
      }
    );
  }

}
