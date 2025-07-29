import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { MrPatientVisitInterface } from '../interfaces/mr-patient-visit-interface';
import { environment } from '../../environments/environment';
import { MrAddVisitInterface } from '../interfaces/mr-add-visit-interface';
import { MrMedicineTypeInterface } from '../interfaces/mr-medicine-type-interface';
import { MrMedicineStockInterface } from '../interfaces/mr-medicine-stock-interface';

@Injectable({
  providedIn: 'root',
})
export class MrVisitService {
  private readonly httpClient = inject(HttpClient);

  getAllVisits(userId: number): Observable<MrPatientVisitInterface[]> {
    return this.httpClient.get<MrPatientVisitInterface[]>(
      `${environment.apiUrl}/visits/patients/${userId}`
    ).pipe(catchError(this.handleError));
  }

  addVisit(visit: MrAddVisitInterface): Observable<MrPatientVisitInterface> {
    return this.httpClient
      .post<MrPatientVisitInterface>(`${environment.apiUrl}/visits`, visit)
      .pipe(catchError(this.handleError));
  }

  getRandomMedicineType() {
    return this.httpClient.get<MrMedicineTypeInterface>(
      `${environment.apiUrl}/medicinetypes/random`
    ).pipe(catchError(this.handleError));
  }

  getRandomMedicineStock(clinicId: number, medicineTypeId: number) {
    return this.httpClient.get<MrMedicineStockInterface>(
      `${environment.apiUrl}/ClinicStockMedicines/Clinics/${clinicId}/MedicineType/${medicineTypeId}`
    ).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    // Handle the error here
    console.log('Getting error: ', error.error);
    return throwError(() => new Error(`${error.error.detail}`));
  }
  constructor() {}
}
