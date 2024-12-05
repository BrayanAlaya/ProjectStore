import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeuserRoutingModule } from './homeuser-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { HomeuserComponent } from './homeuser.component';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { DeleteUserModalModule } from '../../components/delete-user-modal/delete-user-modal.module';


@NgModule({
  declarations: [
    HomeuserComponent
  ],
  imports: [
    CommonModule,
    HomeuserRoutingModule,
    MatIconModule,
    RouterModule,
    MatDialogModule,
    DeleteUserModalModule
  ],exports: [
    HomeuserComponent
  ]
})
export class HomeuserModule { }
