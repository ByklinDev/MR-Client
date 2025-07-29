import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MrRoleInterface } from '../interfaces/mr-role-interface';
import { environment } from '../../environments/environment';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MrRoleService {
  private readonly httpClient = inject(HttpClient);

  getAllRoles() {
    return this.httpClient
      .get<MrRoleInterface[]>(`${environment.apiUrl}/roles`, {
        responseType: 'json',
        observe: 'response',
      })
      .pipe(catchError(this.handleError));
  }
  private handleError(error: HttpErrorResponse) {
    // Handle the error here
    console.log('Getting error: ', error.error);
    return throwError(() => new Error(`${error.error.detail}`));
  }
  constructor() {}
}
