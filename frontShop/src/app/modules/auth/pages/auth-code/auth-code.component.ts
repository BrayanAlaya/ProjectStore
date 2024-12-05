import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/core/models/User';

@Component({
  selector: 'app-auth-code',
  templateUrl: './auth-code.component.html',
  styleUrls: ['./auth-code.component.scss']
})
export class AuthCodeComponent implements OnInit {

  public emailValid: boolean | undefined = true
  public authCodeForm: FormGroup
  public validForm: boolean = true
  public codeSent: boolean = false
  public user: User | null | undefined;
  public codeValid: boolean = true
  public coseSentButton: boolean = false
  public coseSentText: string = "Enviar Clave"

  constructor(
    private _fb: FormBuilder,
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router,

  ) {
    this.authCodeForm = this._fb.group({
      email: ["", [Validators.required, Validators.email]],
      code1: ["", [Validators.required]],
      code2: ["", [Validators.required]],
      code3: ["", [Validators.required]],
      code4: ["", [Validators.required]],
    })

    this.user = this._userService.getLocalUSer();
  }

  ngOnInit(): void {

    if (this.user != null) {
      this.authCodeForm.setValue({
        email: this.user.email,
        code1: "",
        code2: "",
        code3: "",
        code4: "",
      })
    }
    this.emailValid = this.authCodeForm.get("email")?.valid;
    if (this.emailValid) {
      this.codeSent = true
    }
  }

  onSubmit(): void {

    if (!this.authCodeForm.valid) {
      return
    }

    const authCode = this.authCodeForm.value.code1 + this.authCodeForm.value.code2 + this.authCodeForm.value.code3 + this.authCodeForm.value.code4

    const authUser: User = {
      email: this.authCodeForm.value.email,
      auth_code: authCode
    }

    this._userService.authCode(authUser).subscribe({
      next: (response: any) => {
        if (parseInt(response.status) == 200) {
          this._route.params.subscribe(a => {
            switch (a["action"]) {
              case "password":
                this._router.navigate(["/auth/change_password"], {
                  queryParams: {
                    token: response.token
                  }
                })
                break;
              case "account":
                this._router.navigate(["/auth/auth_account"], {
                  queryParams: {
                    token: response.token
                  }
                })
                break;
              default:
                break;
            }
          });
        } else if (parseInt(response.status) == 429) {
          this.codeValid = false
        } else if (parseInt(response.status) == 400) {

        }
      }
    })
  }

  sendCode(): void {

    // if (!this.authCodeForm.get("email")?.valid) {
    //   return
    // }

    let user: User = {
      email: this.authCodeForm.value.email
    }
    this.coseSentButton = true

    this._userService.sendAuthCode(user).subscribe({
      next: (response: any) => {
        if (parseInt(response.status) == 200) {
          this.codeSent = true
          this.codeValid = true

          let count = 30; // Iniciar el contador
          this.coseSentText = `Enviar Clave (${count})`; // Mostrar el conteo inicial
          
          const interval = setInterval(() => {
            count--; // Decrementar el contador
            if (count >= 0) {
              this.coseSentText = `Enviar Clave (${count})`; // Actualizar el texto del botón
            }
          
            if (count < 0) {
              clearInterval(interval); // Detener el intervalo cuando llegue a -1
              this.coseSentText = "Enviar Clave"
              this.coseSentButton = false
            }
          }, 1000); // Actualizar cada segundo
        }
      }
    })
  }

  getErrorMessage() {

    if (this.authCodeForm.get("email")?.getError("required")) {
      return 'Email obligatorio';
    }

    return this.authCodeForm.get("email")?.hasError('email') ? 'Email no válido' : '';
  }
}
