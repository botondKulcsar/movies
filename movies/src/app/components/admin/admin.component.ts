import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user.model';
import { HttpService } from 'src/app/services/http.service';

// export interface UserData {
//   _id: string;
//   firstName: string;
//   lastName: string;
//   nickName: string;
//   city: string;
//   yearOfBirth: string;
//   avatarURL: string;
//   email: string;
// }
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements AfterViewInit {

  // asyncTabs: Observable<[]>;

  displayedColumns: string[] = ['_id', 'nickName', 'firstName', 'lastName', ];
  userDataSource: MatTableDataSource<User>;

  users!: Array<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private httpService: HttpService) { 

    this.userDataSource = new MatTableDataSource(this.users);
  }

  ngAfterViewInit(): void {
    this.httpService.getUsers().subscribe(
      (data) => {this.users = data; console.log('users at Admin: ', this.users)},
      (err) => {

      }
    )
    this.userDataSource.paginator = this.paginator;
    this.userDataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.userDataSource.filter = filterValue.trim().toLowerCase();

    if (this.userDataSource.paginator) {
      this.userDataSource.paginator.firstPage();
    }
  }

}
