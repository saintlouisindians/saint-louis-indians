import { Component, OnInit } from '@angular/core';
import { ModalPopUp } from '../../models/modalPopUp';
import { LoginModel } from '../../models/login.model';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from '../../services/profile.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  modal: ModalPopUp;
  loginForm: FormGroup;
  loginModel: LoginModel;
  returnUrl: string;
  status: string;
  constructor(
    private fb: FormBuilder,
    private profileSvc: ProfileService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.createLoginForm();
  }
  createLoginForm() {
    this.loginForm = this.fb.group({
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }
  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  onSubmit() {
    this.modal = {
      type: 'loading',
      operation: 'open',
      message: ''
    }

    this.login()
  }

  login() {
    this.loginModel = {
      userName: this.loginForm.value.userName,
      password: this.loginForm.value.password,
      grant_type: 'password'
    }
    this.profileSvc.login(this.loginModel).subscribe(
      (res) => {
        sessionStorage.setItem('access_token', res.access_token);
        sessionStorage.setItem('role',res.Role);
        this.router.navigate([this.returnUrl]);
      },
      (error) => {
        if (error && error.status === 400) {
          this.status = error.error.error_description;
          this.modal.operation='close';
        }
        else {
          this.modal.type = 'error';
          this.modal.message = "Something went wrong. Please try again";
        }
      }
    )
  }
  closeModal() {
    this.modal = {
      type: 'loading',
      operation: 'close',
      message: ''
    }
  }
}
