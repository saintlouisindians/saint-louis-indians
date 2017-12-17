import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PostNewAddComponent } from './adds/post-new-add/post-new-add.component';
import { MyaddsComponent } from './adds/myadds/myadds.component';
import { LoginComponent } from './profile/login/login.component';
import { RegisterComponent } from './profile/register/register.component';
import { ConfirmEmailComponent } from './profile/confirm-email/confirm-email.component';
import { AuthGuard } from './utility/utility.auth-guard';
import { LogoutComponent } from './profile/logout/logout.component';
import { AddsComponent } from './adds/adds/adds.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'postadd', component: PostNewAddComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent },
  { path: 'myadds', component: MyaddsComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'confirm-email', component: ConfirmEmailComponent },
  { path: 'logout', component: LogoutComponent, canActivate: [AuthGuard] },
  { path: 'adds/:id', component: AddsComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
