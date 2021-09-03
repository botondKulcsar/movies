import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { HttpService } from 'src/app/services/http.service';


@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {
  @Input() selectedMovie: any = {};
  loggedInUser: any = {
    id: 4,
    username: "Bejelentkezett user",
    avatar: "http://valami.jpg"
  }
  postForm: FormGroup;
  constructor(private httpService: HttpService, private dataService: DataService) {
    this.postForm = new FormGroup({
      post: new FormControl('')
    })
  }

  ngOnInit(): void {
  }

  savePost() {
    let newPost = this.postForm.value;
    newPost.filmId = this.selectedMovie.id;
    newPost.userId = this.loggedInUser.id;
    this.httpService.saveNewMoviePost(newPost).subscribe(
      data => console.log('új post elmentve'),
      error => console.error(error)
    )
    this.postForm.reset();
    this.dataService.savedNewPost.next(newPost)
  }
}
