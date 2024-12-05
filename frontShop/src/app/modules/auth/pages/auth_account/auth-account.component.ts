import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-auth-account',
  templateUrl: './auth-account.component.html',
  styleUrls: ['./auth-account.component.scss']
})
export class AuthAccountComponent implements OnInit {

  public token: string | null;
  public tokenValid: boolean | undefined;

  constructor(
    private _router: ActivatedRoute,
    private _userService: UserService,
    private _r: Router
  ) {
    this.token = this._router.snapshot.queryParamMap.get("token")
  }

  ngOnInit(): void {
    if (this.token == null || this.token == "") {
      this._r.navigate(["/"])
    }
    this._userService.confirmValidAuthAccoutn(this.token).subscribe({
      next: (response: any) => {
        if (parseInt(response.status) == 200) {
          this.tokenValid = true
          localStorage.removeItem("user")
          localStorage.removeItem("token")
        } else if (parseInt(response.status) == 500) {
          this.tokenValid = false
        }
      }
    })
  }


}
