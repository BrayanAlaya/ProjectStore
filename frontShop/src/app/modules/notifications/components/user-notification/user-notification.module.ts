import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserNotificationComponent } from './user-notification.component';



@NgModule({
  declarations: [
    UserNotificationComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    UserNotificationComponent
  ]
})
export class UserNotificationModule { }
