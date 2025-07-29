import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { MrEmailCreateInterface } from '../interfaces/mr-email-create-interface';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MrEmailService {
  private readonly httpClient = inject(HttpClient);

  sendEmail(email: MrEmailCreateInterface) {
    return this.httpClient
      .post<void>(`${environment.apiUrl}/emails`, email, {
        responseType: 'json',
      })
      .pipe(catchError(this.handleError));
  }
  private handleError(error: HttpErrorResponse) {
    // Handle the error here
    return throwError(() => new Error(`${error.error.detail}`));
  }
  constructor() {}
}
