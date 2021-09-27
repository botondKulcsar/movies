import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { RegistrationComponent } from '../registration/registration.component';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  child1Component:boolean = true
  child2Component:boolean = false
  child3Component:boolean = false

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  child1() {
    this.child1Component = true;
    this.child2Component = false;
    this.child3Component = false;

  }
  child2() {
    this.child1Component = false;
    this.child2Component = true;
    this.child3Component = false;
  }
  child3() {
    this.child1Component = false;
    this.child2Component = false;
    this.child3Component = true;
  }

  openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {});

    dialogRef.afterClosed().subscribe(result => { });
  }

  openRegDialog(): void {
    const dialogRef = this.dialog.open(RegistrationComponent, {});

    dialogRef.afterClosed().subscribe(result => { });
  }
}
