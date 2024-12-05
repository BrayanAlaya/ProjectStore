import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from 'src/app/core/models/User';

@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.scss']
})
export class ForgetComponent {

  public token: string | null;
  public hidePassword: boolean = true;
  public hidePasswordRepeat: boolean = true;
  public passwordForm: FormGroup

  public passwordChanged: boolean | undefined
  public validForm: boolean = true;
  public passwordValid: boolean = false;
  public samePassword: boolean = false;

  constructor(
    private _router: ActivatedRoute,
    private _fb: FormBuilder,
    private _userService: UserService,
    private _r: Router
  ) {
    this.passwordForm = this._fb.group({
      password: ["", [Validators.required]],
      repeatPassword: ["", [Validators.required]]
    })
    this.token = this._router.snapshot.queryParamMap.get("token")
  }

  onSubmit() {
    if (this.token == null || this.token == "") {
      this._r.navigate(["/"])
    }

    if (!this.passwordForm.valid) {
      this.passwordValid = true
      return
    }

    if (this.passwordForm.value.password != this.passwordForm.value.repeatPassword) {
      this.passwordValid = false
      this.samePassword = true
      return
    }

    this.samePassword = false

    const user: User = {
      password: this.passwordForm.value.password
    }

    this._userService.changePassword(user, this.token).subscribe({
      
      next: (response: any) => {
        if (parseInt(response.status) == 200) {
          this.passwordChanged = true
          localStorage.removeItem("user")
          localStorage.removeItem("token")
          this._r.navigate(["/"])
        } else {
          this.passwordChanged = false
        }
      }
    })
  }

}
