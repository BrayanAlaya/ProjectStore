import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/core/models/User';
import { UserService } from 'src/app/modules/auth/services/user.service';
import { environment } from 'src/environments/environment';
import { DeleteUserModalComponent } from '../../components/delete-user-modal/delete-user-modal.component';

@Component({
  selector: 'app-homeuser',
  templateUrl: './homeuser.component.html',
  styleUrls: ['./homeuser.component.scss']
})
export class HomeuserComponent implements OnInit {

  public user!: User | null;
  public srcImage: String = "assets/userUnknow.jpg"
  public s3Url: string = environment.s3url

  

  constructor(
    private _userService: UserService,
    private dialog: MatDialog
  ){

  }

  openDialog(): void{
    this.dialog.open(DeleteUserModalComponent, {
      width: '600px',
      height: '320px'
    });
  }

  ngOnInit(): void {
    this.user = this._userService.getLocalUSer();
    if (this.user?.image != null) {
      this.srcImage = this.s3Url + this.user?.image
    } else {
      this.srcImage = "../../../../../assets/userUnknow.jpg"
    }
  }

 
}
