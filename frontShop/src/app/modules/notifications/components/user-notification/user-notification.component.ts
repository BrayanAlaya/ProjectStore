import { Component, Input } from '@angular/core';
import { Notifications } from 'src/app/core/models/Notifications';

@Component({
  selector: 'app-user-notification',
  templateUrl: './user-notification.component.html',
  styleUrls: ['./user-notification.component.scss']
})
export class UserNotificationComponent {
  @Input() notification!: Notifications
}
