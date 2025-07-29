import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MrSignUpInterface } from '../interfaces/mr-sign-up-interface';
import { environment } from '../../environments/environment';
import { MrSignUpResponseInterface } from '../interfaces/mr-sign-up-response-interface';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MrSignUpService {
  private readonly httpClient = inject(HttpClient);

  constructor() {}

  signup(signupForm: MrSignUpInterface) {
    return this.httpClient
      .post<MrSignUpResponseInterface>(
        `${environment.apiUrl}/users`,
        signupForm,
        { responseType: 'json' }
      )
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    // Handle the error here
    return throwError(() => new Error(`${error.error.detail}`));
  }
}
