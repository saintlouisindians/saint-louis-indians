import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HomeComponent } from'./home/home.component';
import {NavigationComponent} from './navigation/navigation.component';
import { PostNewAddComponent } from './adds/post-new-add/post-new-add.component';
import { AppRoutingModule } from './/app-routing.module';
import { RegisterComponent } from './profile/register/register.component';
import { LoginComponent } from './profile/login/login.component';
import { MyaddsComponent } from './adds/myadds/myadds.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavigationComponent,
    PostNewAddComponent,
    RegisterComponent,
    LoginComponent,
    MyaddsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
