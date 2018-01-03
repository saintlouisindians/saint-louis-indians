import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ImageUploadModule } from 'ng2-imageupload';
import { NgDatepickerModule } from 'ng2-datepicker';

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
import { BusinessComponent } from './business/business/business.component';
import { AddBusinessComponent } from './business/add-business/add-business.component';




import { ProfileService } from './services/profile.service';
import { MoviesService } from './services/movies.service';
import { AuthGuard } from './utility/utility.auth-guard';
import { NavigationService } from './services/navigation.service';
import { AddsService } from './services/adds.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './utility/TokenInterceptor';
import { SubcategoriesComponent } from './subcategories/subcategories.component';
import { BusinessService } from './services/business.service';
import { QuickLinksComponent } from './quick-links/quick-links.component';
import { AddMovieComponent } from './movies/add-movie/add-movie.component';
import { MoviesComponent } from './movies/movies/movies.component';
import { FooterComponent } from './footer/footer.component';
import { ModifyAddComponent } from './adds/modify-add/modify-add.component';
import { ErrorComponent } from './error/error.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';





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
    SubcategoriesComponent,
    BusinessComponent,
    AddBusinessComponent,
    QuickLinksComponent,
    AddMovieComponent,
    MoviesComponent,
    FooterComponent,
    ModifyAddComponent,
    ErrorComponent,
    ContactUsComponent,
    ManageUsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ImageUploadModule, NgDatepickerModule
  ],
  providers: [ProfileService, AuthGuard, NavigationService, AddsService, BusinessService, MoviesService, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
