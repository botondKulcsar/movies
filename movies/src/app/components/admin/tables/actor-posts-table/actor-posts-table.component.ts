import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-actor-posts-table',
  templateUrl: './actor-posts-table.component.html',
  styleUrls: ['./actor-posts-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class ActorPostsTableComponent {
  
  dataSource: any = this.httpService.getMoviePosts();
  displayedColumns = ['_id', 'post'];
  expandedElement!: ActorPosts | null;

  constructor(private httpService: HttpService) {}

}

export interface ActorPosts {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  description: string;
}