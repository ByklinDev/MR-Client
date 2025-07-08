import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MrSignUpInterface } from '../interfaces/mr-sign-up-interface';
import { environment } from '../../environments/environment';
import { MrSignUpResponseInterface } from '../interfaces/mr-sign-up-response-interface';

@Injectable({
  providedIn: 'root',
})
export class MrSignUpService {
  private readonly httpClient = inject(HttpClient);
  private readonly router = inject(Router);

  constructor() {}

  signup(signupForm: MrSignUpInterface) {
    return this.httpClient
      .post<MrSignUpResponseInterface>(
        `${environment.apiUrl}/users`,
        signupForm,
        { responseType: 'json' }
      )
      .subscribe({
        next: (response) => {
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Sign up failed:', error);
        },
      });
  }
}
