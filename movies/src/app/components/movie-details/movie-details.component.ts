import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
  selectedMovie: any;


  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.selectedMovie.subscribe(
      (data:any) => this.selectedMovie = data,
      error => console.error(error)
    )
  }
  newPost() {
    this.selectedMovie = this.selectedMovie
  }
}
