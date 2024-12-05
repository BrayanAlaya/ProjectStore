import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationsRoutingModule } from './notifications-routing.module';
import { NotificationsComponent } from './notifications.component';
import { MatIconModule } from '@angular/material/icon';
import { UserNotificationModule } from './components/user-notification/user-notification.module';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    NotificationsComponent
  ],
  imports: [
    CommonModule,
    NotificationsRoutingModule,
    MatIconModule,
    UserNotificationModule,
    MatButtonModule
  ],
  exports: [
    NotificationsComponent
  ]
})
export class NotificationsModule { }
