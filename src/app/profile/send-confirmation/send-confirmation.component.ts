import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ProfileService } from '../../services/profile.service';
import { ModalPopUp } from '../../models/modalPopUp';

@Component({
  selector: 'app-send-confirmation',
  templateUrl: './send-confirmation.component.html',
  styleUrls: ['./send-confirmation.component.css']
})
export class SendConfirmationComponent implements OnInit {

  constructor(private fb: FormBuilder, private profileSvc: ProfileService) { }
  sendForm: FormGroup;
  modal: ModalPopUp;

  ngOnInit() {
    this.sendForm = this.fb.group({
      'email': new FormControl(null, [Validators.required, Validators.email])
    })
  }

  onSend() {
    this.modal = {
      type: 'loading',
      message: 'We have sent you the confirmation email.',
      operation: 'open'
    }
    this.profileSvc.sendRegisterConfirmEmail(this.sendForm.value).subscribe(
      (resp) => this.modal.type = 'success',
      (error)=>{
        this.modal.type='error',
        this.modal.message='Something went wrong. Please try again. Make sure to enter the correct email.'
      }
    )
  }
}
