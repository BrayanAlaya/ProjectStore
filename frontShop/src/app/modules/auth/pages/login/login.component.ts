import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from 'src/app/core/models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  
  public hide = true;
  public emailValid:boolean | undefined; 
  public loginForm!: FormGroup;
  public validForm: boolean = true

  constructor(
    private _fb: FormBuilder,
    private _userService: UserService,
    private _route: Router
  ){
    this.loginForm = this._fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]]
    })
    this.emailValid = this.loginForm.get("email")?.valid;
  }

  onSubmit(): void{

    if (!this.loginForm.valid) {
      return
    }

    let user: User = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    }

    this._userService.login(user).subscribe({
      next: (response: any) => {
        if (response.status == 200) {
          this.validForm = true;

          localStorage.setItem("user", JSON.stringify(response.data))
          localStorage.setItem("token", response.token)

          this._route.navigate(["/"])

        } else if(response.status == 401){
          localStorage.setItem("user", JSON.stringify(response.data))
          localStorage.setItem("token", response.token)
          this._route.navigate(["/auth/auth_code/account"])
        }else{
          this.validForm = false;
        }
      }
    })
  }

  getErrorMessage() {
    
    if (this.loginForm.get("email")?.getError("required")) {
      return 'Email obligatorio';
    }

    return this.loginForm.get("email")?.hasError('email') ? 'Not a valid email' : '';
  }

}
