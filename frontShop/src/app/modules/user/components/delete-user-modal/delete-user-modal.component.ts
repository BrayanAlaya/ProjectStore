import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/modules/auth/services/user.service';

@Component({
  selector: 'app-delete-user-modal',
  templateUrl: './delete-user-modal.component.html',
  styleUrls: ['./delete-user-modal.component.scss']
})
export class DeleteUserModalComponent {

  public userForm!: FormGroup
  private disableButton: boolean = true

  constructor(
    public dialogRef: MatDialogRef<DeleteUserModalComponent>,
    private _userService: UserService,
    private _fb: FormBuilder,
  ) {
    this.userForm = _fb.group({
      input: ["", [Validators.required]]
    })
  }

  deleteUser() {
    if (!this.userForm.valid) {
      return
    }

    if (this.userForm.get("input")?.value.trim().toLowerCase() != "cancelar cuenta") {
      return
    }

    if (!this.disableButton) {
      return
    }

    this.disableButton = false

    this._userService.delete(this._userService.getLocalToken()).subscribe({
      next: (r: any) => {
        if (parseInt(r.status) == 200) {
          this.disableButton = true
        } else if (parseInt(r.status) == 401) {
          this._userService.closeSesion()
        } else {
          this.disableButton = false
        }
      }
    })

  }
}
