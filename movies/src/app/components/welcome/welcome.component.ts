import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  child1Component:boolean = true
  child2Component:boolean = false
  child3Component:boolean = false
  constructor() { }

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
}
