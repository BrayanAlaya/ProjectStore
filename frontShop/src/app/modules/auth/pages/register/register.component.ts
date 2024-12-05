import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from 'src/app/core/models/User';
import { DatePipe } from '@angular/common';
import { clases } from "../../../../core/Clases";
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [DatePipe, clases]
})
export class RegisterComponent {

  public registerForm: FormGroup
  public hide = true;
  public hide2 = true;
  public emailValid: boolean | undefined = true;
  public statusMessage: string = ""
  public status: boolean | undefined
  public disableButton: boolean = false

  constructor(
    private _fb: FormBuilder,
    private _userService: UserService,
    private _datePipe: DatePipe,
    private _clases: clases,
    private _route: Router
  ) {
    this.registerForm = this._fb.group({
      name: ["", [Validators.required]],
      birthdate: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]],
      password2: ["", [Validators.required]]
    })
    this.emailValid = this.registerForm.get("email")?.valid;
  }

  onSubmit(): void {

    if (!this.registerForm.valid) {
      this.status = false;
      this.statusMessage = "Llenar todos lo campos correctamente"
      return
    } else {
      this.status = undefined
      this.statusMessage = ""
    }

    // return;
    if (this._clases.calcularEdad(this.registerForm.value.birthdate) < 18) {
      this.status = false;
      this.statusMessage = "Obligatorio ser mayor de edad"
      return
    } else {
      this.status = undefined;
      this.statusMessage = ""
    }

    if (this.registerForm.value.password != this.registerForm.value.password2) {
      this.status = false;
      this.statusMessage = "Las contraseñas no coinciden"
      return
    } else {
      this.status = undefined
      this.statusMessage = ""
    }

    this.disableButton = true

    let user: User = {
      name: this.registerForm.value.name,
      birthdate: this._datePipe.transform(this.registerForm.value.birthdate, "yyyy-MM-dd") || "",
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
    }

    this._userService.register(user).subscribe({
      next: ((response: any) => {
        if (parseInt(response.status) == 200) {
          this.status = true;
          this.statusMessage = "Registrado correctamente"
          setTimeout(() => {
            this._route.navigate(["/auth"])
          }, 2000);
        } else if (parseInt(response.status) == 409) {
          this.status = false;
          this.disableButton = false
          this.statusMessage = "Email existente"
        } else {
          this.status = false;
          this.disableButton = false
          this.statusMessage = "Hubo un error al registrar, vuelve a intentar"
        }
      })
    })

  }

  getErrorMessage() {

    if (this.registerForm.get("email")?.getError("required")) {
      return 'Email obligatorio';
    }

    return this.registerForm.get("email")?.hasError('email') ? 'Not a valid email' : '';
  }
}
