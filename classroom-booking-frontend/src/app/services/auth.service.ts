import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  loginActive = false;

  constructor() {
    if (typeof window !== 'undefined' && window.localStorage) {
      this.loginActive = localStorage.getItem('loginActive') === 'true';
    }
  }

  setLoginActive(value: boolean) {
    this.loginActive = value;
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('loginActive', value ? 'true' : 'false');
    }
  }

  logout() {
    this.setLoginActive(false);
  }
}