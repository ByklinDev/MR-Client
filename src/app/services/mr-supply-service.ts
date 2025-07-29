import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { MrAddToSupplyInterface } from '../interfaces/mr-add-to-supply-interface';
import { MrSupplyInterface } from '../interfaces/mr-supply-interface';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MrSupplyService {
  private readonly httpClient = inject(HttpClient);
  addToSupply(supply: MrAddToSupplyInterface): Observable<MrSupplyInterface> {
    return this.httpClient
      .post<MrSupplyInterface>(`${environment.apiUrl}/supplies`, supply)
      .pipe(catchError(this.handleError));
  }

  getSuppliesByUserId(userId: number): Observable<MrSupplyInterface[]> {
    return this.httpClient
      .get<MrSupplyInterface[]>(
        `${environment.apiUrl}/supplies/users/${userId}`
      )
      .pipe(catchError(this.handleError));
  }

  deleteSupply(supplyId: number): Observable<void> {
    return this.httpClient
      .delete<void>(`${environment.apiUrl}/supplies/${supplyId}`)
      .pipe(catchError(this.handleError));
  }

  addSupplies(supplies: MrSupplyInterface[], userId: number) {
    return this.httpClient
      .patch<MrSupplyInterface[]>(
        `${environment.apiUrl}/supplies/${userId}`,
        supplies
      )
      .pipe(catchError(this.handleError));
  }
  private handleError(error: HttpErrorResponse) {
    // Handle the error here
    return throwError(() => new Error(`${error.error.detail}`));
  }
  constructor() {}
}
