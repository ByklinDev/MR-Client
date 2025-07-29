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
    return this.httpClient
      .post<MrLoginResponseInterface>(
        `${environment.authUrl}/login`,
        { email, password, rememberMe },
        { responseType: 'json', observe: 'response' }
      )
      .subscribe({
        next: (response) => {
          localStorage.setItem(this.tokenKey, response.body?.token ?? '');

          localStorage.removeItem('Email');
          localStorage.removeItem('RememberMe');
          if (rememberMe) {
            localStorage.setItem('Email', email);
            localStorage.setItem('RememberMe', JSON.stringify(rememberMe));
          }
          this.userFirst.set(`${this.getUserFirst()}`);
          this.userLast.set(`${this.getUserLast()}`);
          this.userId.set(this.getUserId());
          this.userInitials.set(`${this.getUserInitials()}`);
          this.userEmail.set(`${this.getUserEmail()}`);
          this.showLogin.set(false);
          this.hideLogin.set(true);
          this.userService.getUserImage(this.userId()).subscribe({
            next: (response) => {
              const imagesrc = response as string;
              this.userService.imageSrc.set(imagesrc);
              sessionStorage.setItem(`userimage`, imagesrc); // Store the image in session storage
            },
          });
          this.setAccessRights();
          this.router.navigate(['/']);
        },
        error: (error) => {
          this.loginError.set(error.error);
        },
      });
  }

  userFirst = signal(`${this.getUserFirst()}`);
  userLast = signal(`${this.getUserLast()}`);
  userId = signal<number>(this.getUserId());
  userInitials = signal(`${this.getUserInitials()}`);
  userEmail = signal(`${this.getUserEmail()}`);
  userOldPassword = signal('**********');
  showLogin = signal<boolean>(this.userFirst() === 'Log In' ? true : false);
  hideLogin = signal<boolean>(this.userFirst() === 'Log In' ? false : true);
  loginError = signal('');

  isClinicsActive = signal<boolean>(
    this.isRoleActive('Admin') || this.isRoleActive('Sponsor')
  );
  isMyAccountActive = signal<boolean>(true);
  isMedicinesActive = signal<boolean>(
    this.isRoleActive('Admin') ||
      this.isRoleActive('Sponsor') ||
      this.isRoleActive('Manager')
  );
  isSupplyActive = signal<boolean>(
    this.isRoleActive('Admin') || this.isRoleActive('Manager')
  );
  isResearchActive = signal<boolean>(
    this.isRoleActive('Admin') ||
      this.isRoleActive('Sponsor') ||
      this.isRoleActive('Researcher')
  );
  isNewPatientActive = signal<boolean>(
    this.isRoleActive('Admin') || this.isRoleActive('Researcher')
  );
  isPatientInfoActive = signal<boolean>(
    this.isRoleActive('Admin') || this.isRoleActive('Researcher')
  );

  isRolesActive = signal<boolean>(
    this.isRoleActive('Admin') || this.isRoleActive('Sponsor')
  );

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.userService.imageSrc.set('user_icon.png'); // Reset user image
    this.setAccessRights();
    sessionStorage.removeItem('userimage');
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

  getUserLast(): string {
    const token = this.getAccessToken();
    if (token) {
      const decodedToken = this.decodeToken(token);
      return decodedToken ? decodedToken.lastName || '' : '';
    } else {
      return '';
    }
  }

  getUserFirst() {
    const token = this.getAccessToken();
    if (token) {
      const decodedToken = this.decodeToken(token);
      return decodedToken ? decodedToken.firstName || 'Log In' : 'Log In';
    } else {
      return 'Log In';
    }
  }

  getUserId(): number {
    const token = this.getAccessToken();
    if (token) {
      const decodedToken = this.decodeToken(token);
      return decodedToken ? parseInt(decodedToken.sub, 10) || 0 : 0;
    } else {
      return 0;
    }
  }

  getUserInitials(): string {
    const token = this.getAccessToken();
    if (token) {
      const decodedToken = this.decodeToken(token);
      return decodedToken ? decodedToken.initials || '' : '';
    } else {
      return '';
    }
  }

  getUserEmail(): string {
    const token = this.getAccessToken();
    if (token) {
      const decodedToken = this.decodeToken(token);
      return decodedToken ? decodedToken.email || '' : '';
    } else {
      return '';
    }
  }

  isAuthenticated(): boolean {
    const token = this.getAccessToken();
    return !!token; // Returns true if token exists, false otherwise
  }

  isRoleActive(role: string): boolean {
    const token = this.getAccessToken();
    if (token) {
      const decodedToken = this.decodeToken(token);
      if (decodedToken) {
        if (decodedToken.role === role) {
          return true;
        }
      }
    }
    return false;
  }

  setAccessRights() {
    this.isClinicsActive.set(false);
    this.isMedicinesActive.set(false);
    this.isMyAccountActive.set(false);
    this.isNewPatientActive.set(false);
    this.isPatientInfoActive.set(false);
    this.isResearchActive.set(false);
    this.isSupplyActive.set(false);
    this.isRolesActive.set(false);

    const token = this.getAccessToken();
    if (token) {
      const decodedToken = this.decodeToken(token);
      if (decodedToken) {
        if (decodedToken.role === 'Admin') {
          this.isClinicsActive.set(true);

          this.isMyAccountActive.set(true);
          this.isMedicinesActive.set(true);
          this.isSupplyActive.set(true);
          this.isResearchActive.set(true);
          this.isNewPatientActive.set(true);
          this.isPatientInfoActive.set(true);
          this.isRolesActive.set(true);
        }
        if (decodedToken.role === 'Sponsor') {
          this.isClinicsActive.set(true);
          this.isRolesActive.set(true);
        }
        if (
          decodedToken.role === 'Sponsor' ||
          decodedToken.role === 'Researcher'
        ) {
          this.isResearchActive.set(true);
        }

        if (
          decodedToken.role === 'Sponsor' ||
          decodedToken.role === 'Researcher' ||
          decodedToken.role === 'Manager'
        ) {
          this.isMyAccountActive.set(true);
        }

        if (
          decodedToken.role === 'Sponsor' ||
          decodedToken.role === 'Manager'
        ) {
          this.isMedicinesActive.set(true);
        }

        if (decodedToken.role === 'Manager') {
          this.isSupplyActive.set(true);
        }

        if (decodedToken.role === 'Researcher') {
          this.isNewPatientActive.set(true);
          this.isPatientInfoActive.set(true);
        }
      }
    }
  }
}
