import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActorDetailsComponent } from './components/actor-details/actor-details.component';
import { ActorsComponent } from './components/actors/actors.component';
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/login/login.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { MoviesComponent } from './components/movies/movies.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UsersComponent } from './components/users/users.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

const routes: Routes = [
  {path: '', component:WelcomeComponent},
  {path: 'actors', component:ActorsComponent},
  {path: 'actor-details/:id', component:ActorDetailsComponent},
  {path: 'admin', component:AdminComponent},
  {path: 'login', component:LoginComponent},
  {path: 'movies', component:MoviesComponent},
  {path: 'movie-details/:id', component:MovieDetailsComponent},
  {path: 'my-profile', component:MyProfileComponent},
  {path: 'registration', component:RegistrationComponent},
  {path: 'users', component:UsersComponent},
  {path: 'user-profile/:id', component:UserProfileComponent},
  {path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
