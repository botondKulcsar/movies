import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-movie-posts-table',
  templateUrl: './movie-posts-table.component.html',
  styleUrls: ['./movie-posts-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class MoviePostsTableComponent implements OnInit {

  dataSource: any = this.httpService.getMoviePosts();
  displayedColumns = ['_id', 'post'];
  expandedElement!: MoviePosts | null;

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
  }

}

export interface MoviePosts {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  description: string;
}