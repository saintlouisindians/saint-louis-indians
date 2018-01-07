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
import { SubcategoriesComponent } from './subcategories/subcategories.component';
import { BusinessComponent } from './business/business/business.component';
import { AddBusinessComponent } from './business/add-business/add-business.component';
import { AddMovieComponent } from './movies/add-movie/add-movie.component';
import { MoviesComponent } from './movies/movies/movies.component';
import { ErrorComponent } from './error/error.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { AddEventComponent } from './events/add-event/add-event.component';
import { EventsComponent } from './events/events/events.component';

const routes: Routes = [
  { path: '', redirectTo: 'movies', pathMatch: 'full' },
  { path: 'postadd', component: PostNewAddComponent, canActivate: [AuthGuard] },
 // { path: 'home', component: HomeComponent },
  { path: 'myadds', component: MyaddsComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'confirm-email', component: ConfirmEmailComponent },
  { path: 'logout', component: LogoutComponent, canActivate: [AuthGuard] },
  { path: 'adds/:id/:name', component: AddsComponent },
  { path: 'subcategories/:id/:name', component: SubcategoriesComponent },
  { path: 'business/:id/:name', component: BusinessComponent },
  { path: 'add-business', component: AddBusinessComponent, canActivate: [AuthGuard] },
  { path: 'add-movie', component: AddMovieComponent, canActivate: [AuthGuard], data: { roles: ['Admin', 'Movie_Distributer'] } },
  { path: 'movies', component: MoviesComponent },
  { path: 'error/:code', component: ErrorComponent },
  { path: 'manage-users', component: ManageUsersComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] } },
  { path: 'add-event', component: AddEventComponent },
  { path: 'events', component: EventsComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
