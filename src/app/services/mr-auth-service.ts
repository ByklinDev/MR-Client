import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { MrLoginResponseInterface } from '../interfaces/mr-login-response-interface';
import { Router } from '@angular/router';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class MrAuthService {
  private readonly httpClient = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly tokenKey = 'MrAuthToken';
  private readonly jwtHelper = inject(JwtHelperService);
  constructor() {}

  login(email: string, password: string, rememberMe: boolean) {
    // Login request to the server
    console.log(`Logging in with email: ${email}`);
    return this.httpClient
      .post<MrLoginResponseInterface>(
        `${environment.authUrl}/login`,
        { email, password, rememberMe },
        { responseType: 'json' }
      )
      .subscribe((response) => {
        localStorage.setItem(this.tokenKey, response.token);
        if (this.getClaim('firstName')) {
          localStorage.setItem('firstName', this.getClaim('firstName'));
        }
        if (this.getClaim('lastName')) {
          localStorage.setItem('lastName', this.getClaim('lastName'));
        }
        localStorage.removeItem('Email');
        localStorage.removeItem('RememberMe');
        if (rememberMe) {
          localStorage.setItem('Email', email);
          localStorage.setItem('RememberMe', JSON.stringify(rememberMe));
        }
        console.log('Login successful, token stored:', response.token);
        this.userFirst.set(`${this.getClaim('firstName')}`);
        if (this.getClaim('lastName') !== null) {
          this.userLast.set(`${this.getClaim('lastName')}`);
        }
        this.showLogin.set(false);
        this.hideLogin.set(true);
        this.router.navigate(['/']);
      });
  }

  userFirst = signal(
    `${localStorage.getItem('firstName') ?? 'Log In'}` || 'Log In'
  );
  userLast = signal(`${localStorage.getItem('lastName') ?? ''}` || '');
  showLogin = signal<boolean>(this.userFirst() === 'Log In' ? true : false);
  hideLogin = signal<boolean>(this.userFirst() === 'Log In' ? false : true);

  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem('firstName');
    localStorage.removeItem('lastName');
    this.userFirst.set(`Log In`);
    this.userLast.set('');
    this.showLogin.set(true);
    this.hideLogin.set(false);
    this.router.navigate(['/']);
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  decodeToken(token: string): any {
    return this.jwtHelper.decodeToken(token);
  }
  getClaim(claimKey: string): any {
    const decodedToken = this.decodeToken(this.getAccessToken() || '');
    return decodedToken ? decodedToken[claimKey] : null;
  }

  isAuthenticated(): boolean {
    const token = this.getAccessToken();
    return !!token; // Returns true if token exists, false otherwise
  }
}
