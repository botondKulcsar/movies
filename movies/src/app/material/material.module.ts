import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';

//Layout


import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';

import { MatCardModule } from '@angular/material/card';

const material = [
  MatButtonModule,
  MatToolbarModule,
  MatSidenavModule,
  MatListModule,
  MatMenuModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule
]

@NgModule({
  imports: [material],
  exports: [material]
})
export class MaterialModule { }
