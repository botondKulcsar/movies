import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';

// TODO: Replace this with your own data model type
export interface UsersTableItem {
  _id: number;
  nickName: string;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: UsersTableItem[] = [
  {_id: 1, nickName: 'Hydrogen'},
  {_id: 2, nickName: 'Helium'},
  {_id: 3, nickName: 'Lithium'},
  {_id: 4, nickName: 'Beryllium'},
  {_id: 5, nickName: 'Boron'},
  {_id: 6, nickName: 'Carbon'},
  {_id: 7, nickName: 'Nitrogen'},
  {_id: 8, nickName: 'Oxygen'},
  {_id: 9, nickName: 'Fluorine'},
  {_id: 10, nickName: 'Neon'},
  {_id: 11, nickName: 'Sodium'},
  {_id: 12, nickName: 'Magnesium'},
  {_id: 13, nickName: 'Aluminum'},
  {_id: 14, nickName: 'Silicon'},
  {_id: 15, nickName: 'Phosphorus'},
  {_id: 16, nickName: 'Sulfur'},
  {_id: 17, nickName: 'Chlorine'},
  {_id: 18, nickName: 'Argon'},
  {_id: 19, nickName: 'Potassium'},
  {_id: 20, nickName: 'Calcium'},
];

/**
 * Data source for the UsersTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class UsersTableDataSource extends DataSource<UsersTableItem> {
  // data: UsersTableItem[] = this.httpService.getUsers().subscribe(
  //   (data) => { this.data = data; console.log('users at Admin: ', this.data) },
  //   (err) => { }
  // );
  data: UsersTableItem[] = EXAMPLE_DATA;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<UsersTableItem[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.data ]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: UsersTableItem[]): UsersTableItem[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: UsersTableItem[]): UsersTableItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'nickName': return compare(a.nickName, b.nickName, isAsc);
        case '_id': return compare(+a._id, +b._id, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
