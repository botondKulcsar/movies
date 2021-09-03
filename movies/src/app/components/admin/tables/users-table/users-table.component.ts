import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { HttpService } from 'src/app/services/http.service';
import { User } from 'src/app/model/user.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginComponent } from 'src/app/components/login/login.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class UsersTableComponent implements AfterViewInit {

  data: User[] = [];
  dataSource = new MatTableDataSource(this.data);
  displayedColumns = ['avatar', 'nickName', 'email', 'name', 'city', 'year', 'role', 'edit', 'delete'];
  // displayedColumns = Object.keys(this.dataSource);
  expandedElement!: User | null;

  constructor(
    private httpService: HttpService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private router: Router
    ) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.httpService.getUsers().subscribe(
      (data) => {this.data = data},
      (err) => {
        this._snackBar.open(
          `Hoppá, nem sikerült betölteni az adatokat! \n ${err.error.message}\nKód: ${err.status}`,
          'OK',
          {
            duration: 5000,
            panelClass: ['snackbar-error']
          }
        );
        console.error(err);
        if (err.status === 401) {
          // this.router.navigate(['/']);
          this.openLoginDialog();
        }
      },
    );
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // getData() {
  //   this.httpService.getUsers().subscribe(
  //     (data) => { this.dataSource = data },
  //     (err) => {
  //       this._snackBar.open(
  //         `Hoppá, nem sikerült betölteni az adatokat! \n ${err.error.message}\nKód: ${err.status}`,
  //         'OK',
  //         {
  //           duration: 5000,
  //           panelClass: ['snackbar-error']
  //         }
  //       );
  //       console.error(err);
  //       if (err.status === 401) {
  //         // this.router.navigate(['/']);
  //         this.openLoginDialog();
  //       }
  //     },
  //   );
  // }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {});
    dialogRef.afterClosed().subscribe(result => { });
  }

}



