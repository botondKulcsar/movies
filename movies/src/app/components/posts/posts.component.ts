import { Component, Input, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  @Input() selectedMovie: any = {};
  postList: any[] = [];
  userList: any[] = [];
  constructor(private httpService: HttpService, private dataService: DataService) { }

  ngOnInit(): void {
    this.httpService.getPosts().subscribe(
      (data:any[]) => {this.postList = data; console.log(this.postList)},
      error => console.error(error)
    )
    this.httpService.getUsers().subscribe(
      (data:any[]) => {this.userList = data; console.log(this.postList)},
      error => console.error(error)
    )
    this.dataService.savedNewPost.subscribe(
      data => {
        if(data) {
          this.postList.push(data)
        }
      },
      error => console.error(error)
    )
  }


}
