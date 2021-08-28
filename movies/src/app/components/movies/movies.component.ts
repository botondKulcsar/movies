import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Film } from 'src/app/model/film';
import { ConfigService } from 'src/app/services/config.service';
import { DataService } from 'src/app/services/data.service';
import { HttpService } from 'src/app/services/http.service';


@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit, OnDestroy {
  movies: any[] = []
  genreList: {value: string, name: string}[] = this.configService.genre
  filteredGenreList: {value: string, name: string}[] = this.configService.genre
  formGenre: FormGroup;
  pageSizes: number[] = [2,3,5];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>(this.movies);
  obs!: Observable<any>;
  // dataSubscription: Subscription;
  // dataSubscription: Subscription;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  dataSubscription!: Subscription;
  constructor(
    private configService: ConfigService,
    private httpService: HttpService,
    private dataService: DataService,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.formGenre = new FormGroup({
      category: new FormControl('')
    })
  }

  ngOnInit(): void {
    this.changeDetectorRef.detectChanges();
    this.dataSource.paginator = this.paginator;
    this.dataSubscription = this.httpService.getMovies().subscribe(
      (data:any) => {
        // this.movies = data;
        this.dataSource.data = data

      },
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
  SelectKecsOhajaSzerint(genreValue: any) {
    this.filteredGenreList = this.genreList.filter(data => data.value === genreValue)

  }
  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe()
  }

}
