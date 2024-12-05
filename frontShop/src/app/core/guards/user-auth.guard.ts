import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from 'src/app/modules/auth/services/user.service';

export const userAuthGuard = () => {

  const router = inject(Router)
  const userService = inject(UserService)

  if (userService.getLocalToken() && userService.getLocalUSer()) {

    if (userService.getLocalUSer()?.auth == 1) {
      return true;
    } else {
      router.navigate(["/auth/auth_code/account"])
      return false
    }

  } else {
    router.navigate(['/auth/login']);
    return false;
  }

};
