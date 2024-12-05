import { Component } from '@angular/core';
import { Notifications } from 'src/app/core/models/Notifications';
import { NotificationService } from './services/notification.service';
import { UserService } from '../auth/services/user.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent {
  public pageIndex: number = 0
  public nLength: number = 0

  public showStutus: boolean = false

  public notifications: Array<Notifications> = []

  constructor(
    private _notificationsService: NotificationService,
    private _userService: UserService
  ) {
    this._notificationsService.get(this._userService.getLocalToken()).subscribe({
      next: (r: any) => {
        if (parseInt(r.status) == 200) {
          this.nLength = parseInt(r.count)

          r.data.forEach((data: Notifications) => {
            this.notifications.push(data)
          })

          if (this.notifications.length >= this.nLength) {
            this.showStutus = false
          } else {
            this.showStutus = true
          }
        } else if (parseInt(r.status) == 401) {
          this._userService.closeSesion()
        } else {
          this.showStutus = false
        }
      }
    })
  }


  ngOnInit(): void {

  }

  showMore() {
    if (this.notifications.length < this.nLength) {
      this.pageIndex++;
      this._notificationsService.get(this._userService.getLocalToken(), this.pageIndex).subscribe({
        next: (r: any) => {
          if (parseInt(r.status) == 200) {
            r.data.forEach((data: Notifications) => {
              this.notifications.push(data)
            })
            if (this.notifications.length >= this.nLength) {
              this.showStutus = false
            }
          } else if (parseInt(r.status) == 401) {
            this._userService.closeSesion()
          }
        }
      })
    } else {
      this.showStutus = false
    }
  }
}
