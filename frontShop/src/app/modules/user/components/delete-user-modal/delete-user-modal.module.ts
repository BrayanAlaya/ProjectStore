import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteUserModalComponent } from './delete-user-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    DeleteUserModalComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule
  ], 
  exports: [
    DeleteUserModalComponent
  ]
})
export class DeleteUserModalModule { }
