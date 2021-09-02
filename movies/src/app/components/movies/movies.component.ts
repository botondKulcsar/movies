import { ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Film } from 'src/app/model/film';
import { ConfigService } from 'src/app/services/config.service';
import { DataService } from 'src/app/services/data.service';
import { HttpService } from 'src/app/services/http.service';
import { PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit, OnDestroy {
  movies: any[] = []
  genreList: {value: string, name: string}[] = this.configService.genre
  filteredGenreList: {value: string, name: string}[] = this.configService.genre
  filteredMovies: any[] = []; 
  formGenre: FormGroup;


  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>(this.movies);
  obs!: Observable<any>;
  // dataSubscription: Subscription;
  // dataSubscription: Subscription;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  dataSubscription!: Subscription;

  // pageSizes: number[] = [2];
  pageSize: number = 2;
  lengths: number[] = [];
  pageIndexes: number[] = [0, 0, 0];
  pageSizeOptions = [2, 3, 5, 10, 25];
  showFirstLastButtons = true;

  @ViewChild('widgetsContent', { read: ElementRef })
  widgetsContent!: ElementRef<any>;
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
        this.dataSource.data = data;
        
        console.log('DataSource: ', this.dataSource.data);  // debug
        console.log('filteredGenreList: ', this.filteredGenreList); // debug
      },
      error => console.error(error)
    )





  }
  scrollRight() {
    //this.widgetsContent.nativeElement.scrollLeft += this.widgetsContent.nativeElement.scrollWidth;

    this.widgetsContent.nativeElement.scrollTo({ left: (this.widgetsContent.nativeElement.scrollLeft + 150), behavior: 'smooth' });
  }

  scrollLeft() {
    //this.widgetsContent.nativeElement.scrollLeft -= this.widgetsContent.nativeElement.scrollWidth;
    this.widgetsContent.nativeElement.scrollTo({ left: (this.widgetsContent.nativeElement.scrollLeft - 150), behavior: 'smooth' });
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

  handlePageEvent(event: PageEvent, i: number, j?: number) {
    this.lengths[i] = event.length;
    this.pageSize = event.pageSize;
    this.pageIndexes[i] = event.pageIndex;
  }
}
