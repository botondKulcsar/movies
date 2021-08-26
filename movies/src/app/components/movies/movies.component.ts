import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfigService } from 'src/app/services/config.service';
import { DataService } from 'src/app/services/data.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  movies: any[] = []
  genreList: {value: string, name: string}[] = this.configService.genre
  filteredGenreList: {value: string, name: string}[] = this.configService.genre
  formGenre: FormGroup;

  constructor(
    private configService: ConfigService,
    private httpService: HttpService,
    private dataService: DataService,
    private router: Router
  ) {
    this.formGenre = new FormGroup({
      category: new FormControl('')
    })
  }

  ngOnInit(): void {
    this.httpService.getMovies().subscribe(
      (data:any) => this.movies = data,
      error => console.error(error)
    )
  }

  selectFilm(movie:any) {
    this.dataService.selectedMovie.next(movie)
    this.router.navigate([`/movie-details/${movie.id}`])
  }

  selectGenre() {
    let selected = this.formGenre.value;
    if (selected.category === "") {
      this.filteredGenreList = this.genreList;
    } else {

      this.filteredGenreList = this.genreList.filter(data => data.value === selected.category)

    }
  }

}
