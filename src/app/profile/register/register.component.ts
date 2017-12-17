import { Component, OnInit } from '@angular/core';
import { ModalPopUp } from '../../models/modalPopUp';
import { FormsModule, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { PasswordValidation } from '../../validators/password-match.validator';
import { RegisterModel } from '../../models/register.model';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  modal: ModalPopUp;
  registerForm: FormGroup;
  registerModel: RegisterModel;

  constructor(private fb: FormBuilder, private profileSvc: ProfileService) {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: [null, [Validators.required, Validators.minLength(6), Validators.pattern('^([0-9]+[a-zA-Z]+|[a-zA-Z]+[0-9]+)[0-9a-zA-Z]*$')]],
      confirmPassword: [null, Validators.required]
    }, {
        validator: PasswordValidation.MatchPassword
      });
  }
  ngOnInit() {
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.modal = {
        type: 'loading',
        operation: 'open',
        message: 'Please go to your email account to verify the email you provided.'
      }
      this.registerUser();
    }
  }

  registerUser() {
    this.profileSvc.registerUser(this.mapRegisterModel()).subscribe(
      (res) => {
        this.modal.type = 'success';
      },
      (error) => {
        this.modal.type = 'error';
        try {
          if (error && error.status === 400) {
            this.modal.message = error.error.ModelState[''][1];
          }
          else {
            this.modal.message = 'Something went wrong. Please try again.';
          }
        }
        catch (e) {
          console.log(e);
          this.modal.message = 'Something went wrong. Please try again.';
        }
      }
    )
  }
  mapRegisterModel(): RegisterModel {
    return {
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      confirmPassword: this.registerForm.value.confirmPassword
    } as RegisterModel;
  }
}
