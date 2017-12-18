import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ImageUploadModule } from 'ng2-imageupload';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavigationComponent } from './navigation/navigation.component';
import { PostNewAddComponent } from './adds/post-new-add/post-new-add.component';
import { AppRoutingModule } from './/app-routing.module';
import { RegisterComponent } from './profile/register/register.component';
import { LoginComponent } from './profile/login/login.component';
import { MyaddsComponent } from './adds/myadds/myadds.component';
import { ModalComponent } from './modal/modal.component';
import { ConfirmEmailComponent } from './profile/confirm-email/confirm-email.component';
import { LoginStatusComponent } from './profile/login-status/login-status.component';
import { LogoutComponent } from './profile/logout/logout.component'
import { AddsComponent } from './adds/adds/adds.component';



import { ProfileService } from './services/profile.service';
import { AuthGuard } from './utility/utility.auth-guard';
import { NavigationService} from './services/navigation.service';
import {AddsService } from './services/adds.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './utility/TokenInterceptor';
import { SubcategoriesComponent } from './subcategories/subcategories.component';





@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavigationComponent,
    PostNewAddComponent,
    RegisterComponent,
    LoginComponent,
    MyaddsComponent,
    ModalComponent,
    ConfirmEmailComponent,
    LoginStatusComponent,
    LogoutComponent,
    AddsComponent,
    SubcategoriesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ImageUploadModule
  ],
  providers: [ProfileService, AuthGuard, NavigationService, AddsService,{
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
