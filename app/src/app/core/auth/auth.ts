import { Injectable } from '@angular/core';
import { CanActivateFn } from '@angular/router';

@Injectable()
export class AuthGuard {
  canActivate: CanActivateFn = () => true;
}
