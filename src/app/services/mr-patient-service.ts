import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { MrAddPatientInterface } from '../interfaces/mr-add-patient-interface';
import { MrPatientInterface } from '../interfaces/mr-patient-interface';
import { MrPatientExtInterface } from '../interfaces/mr-patient-ext-interface';
import { MrUpdatePatientInterface } from '../interfaces/mr-update-patient-interface';
import { catchError, throwError } from 'rxjs';
import { MrErrorDetailInterface } from '../interfaces/mr-error-detail-interface';

@Injectable({
  providedIn: 'root',
})
export class MrPatientService {
  private readonly httpClient = inject(HttpClient);
  addPatient(patient: MrAddPatientInterface) {
    return this.httpClient
      .post<MrPatientInterface>(`${environment.apiUrl}/patients`, patient, {
        responseType: 'json',
      })
      .pipe(catchError(this.handleError));
  }

  getAllPatients() {
    return this.httpClient
      .get<MrPatientInterface[]>(`${environment.apiUrl}/patients`, {
        responseType: 'json',
      })
      .pipe(catchError(this.handleError));
  }

  getPatients(text: string) {
    return this.httpClient
      .get<MrPatientInterface[]>(`${environment.apiUrl}/patients`, {
        responseType: 'json',
        params: { SearchTerm: text },
      })
      .pipe(catchError(this.handleError));
  }

  getPatient(patientId: number) {
    return this.httpClient
      .get<MrPatientInterface>(`${environment.apiUrl}/patients/${patientId}`)
      .pipe(catchError(this.handleError));
  }

  endPatient(patient: MrUpdatePatientInterface) {
    return this.httpClient
      .put<MrPatientInterface>(
        `${environment.apiUrl}/patients/${patient.id}`,
        patient
      )
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    // Handle the error here
    console.log('Getting error: ', error.error);
    return throwError(() => new Error(`${error.error.detail}`));
  }
  constructor() {}
}
