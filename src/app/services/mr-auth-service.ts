import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { MrLoginResponseInterface } from '../interfaces/mr-login-response-interface';
import { Router } from '@angular/router';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { MrUserService } from './mr-user-service';

@Injectable({
  providedIn: 'root',
})
export class MrAuthService {
  private readonly httpClient = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly tokenKey = 'MrAuthToken';
  private readonly jwtHelper = inject(JwtHelperService);
  private readonly userService = inject(MrUserService);
  constructor() {}

  login(email: string, password: string, rememberMe: boolean) {
    // Login request to the server
    console.log(`Logging in with email: ${email}`);
    return this.httpClient
      .post<MrLoginResponseInterface>(
        `${environment.authUrl}/login`,
        { email, password, rememberMe },
        { responseType: 'json', observe: 'response' }
      )
      .subscribe({
        next: (response) => {
          localStorage.setItem(this.tokenKey, response.body?.token ?? '');
          if (this.getClaim('firstName')) {
            localStorage.setItem('firstName', this.getClaim('firstName'));
          }
          if (this.getClaim('lastName')) {
            localStorage.setItem('lastName', this.getClaim('lastName'));
          }
          if (this.getClaim('sub')) {
            localStorage.setItem('userId', this.getClaim('sub'));
          }
          if (this.getClaim('initials')) {
            localStorage.setItem('userInitials', this.getClaim('initials'));
          }
          if (this.getClaim('email')) {
            localStorage.setItem('userEmail', this.getClaim('email'));
          }

          localStorage.removeItem('Email');
          localStorage.removeItem('RememberMe');
          if (rememberMe) {
            localStorage.setItem('Email', email);
            localStorage.setItem('RememberMe', JSON.stringify(rememberMe));
          }
          this.userFirst.set(`${this.getClaim('firstName')}`);
          if (this.getClaim('lastName') !== null) {
            this.userLast.set(`${this.getClaim('lastName')}`);
          }
          if (this.getClaim('sub') !== null) {
            let id: string = this.getClaim('sub');
            this.userId.set(parseInt(id, 10));
          }
          if (this.getClaim('initials') !== null) {
            this.userInitials.set(`${this.getClaim('initials')}`);
          }
          if (this.getClaim('email') !== null) {
            this.userEmail.set(`${this.getClaim('email')}`);
          }
          this.showLogin.set(false);
          this.hideLogin.set(true);
          this.userService.getUserImage(this.userId());
          this.router.navigate(['/']);
        },
        error: (error) => {
          this.loginError.set(error.error);
        }}
      );
  }

  userFirst = signal(
    `${localStorage.getItem('firstName') ?? 'Log In'}` || 'Log In'
  );
  userLast = signal(`${localStorage.getItem('lastName') ?? ''}` || '');
  userId = signal<number>(parseInt(localStorage.getItem('userId') ?? '', 10));
  userInitials = signal(`${localStorage.getItem('userInitials') ?? ''}` || '');
  userEmail = signal(`${localStorage.getItem('userEmail') ?? ''}` || '');
  userOldPassword = signal('**********');
  showLogin = signal<boolean>(this.userFirst() === 'Log In' ? true : false);
  hideLogin = signal<boolean>(this.userFirst() === 'Log In' ? false : true);
  loginError = signal('');

  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem('firstName');
    localStorage.removeItem('lastName');
    localStorage.removeItem('userId');
    localStorage.removeItem('userInitials');
    localStorage.removeItem('userEmail');
    this.userFirst.set(`Log In`);
    this.userLast.set('');
    this.loginError.set('');
    this.userId.set(parseInt('', 10));
    this.userInitials.set('');
    this.userEmail.set('');
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
