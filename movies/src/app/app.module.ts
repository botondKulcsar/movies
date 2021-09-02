import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { NavComponent } from './components/nav/nav.component';
import { AdminComponent } from './components/admin/admin.component';
import { MoviesComponent } from './components/movies/movies.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { ActorsComponent } from './components/actors/actors.component';
import { ActorDetailsComponent } from './components/actor-details/actor-details.component';
import { UsersComponent } from './components/users/users.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PostsComponent } from './components/posts/posts.component';
import { PostFormComponent } from './components/post-form/post-form.component';
import { AngularTiltModule } from 'angular-tilt';
import { WelcomeChild1Component } from './components/welcome-child1/welcome-child1.component';
import { WelcomeChild2Component } from './components/welcome-child2/welcome-child2.component';
import { WelcomeChild3Component } from './components/welcome-child3/welcome-child3.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    AdminComponent,
    MoviesComponent,
    MovieDetailsComponent,
    ActorsComponent,
    ActorDetailsComponent,
    UsersComponent,
    UserProfileComponent,
    MyProfileComponent,
    LoginComponent,
    RegistrationComponent,
    WelcomeComponent,
    PostsComponent,
    PostFormComponent,
    WelcomeChild1Component,
    WelcomeChild2Component,
    WelcomeChild3Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularTiltModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
