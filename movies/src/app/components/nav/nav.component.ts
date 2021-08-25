import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  menuItems = this.configService.menuItems;
  constructor(private configService: ConfigService) { }

  ngOnInit(): void {
  }

}
