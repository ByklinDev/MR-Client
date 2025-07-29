import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MrMedicineInterface } from '../interfaces/mr-medicine-interface';
import { environment } from '../../environments/environment';
import { MrAddMedicineInterface } from '../interfaces/mr-add-medicine-interface';
import { MrEditMedicineInterface } from '../interfaces/mr-edit-medicine-interface';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MrMedicineService {
  private readonly httpClient = inject(HttpClient);

  getAllMedicines() {
    return this.httpClient
      .get<MrMedicineInterface[]>(`${environment.apiUrl}/medicines`, {
        responseType: 'json',
      })
      .pipe(catchError(this.handleError));
  }

  getMedicines(text: string) {
    return this.httpClient
      .get<MrMedicineInterface[]>(`${environment.apiUrl}/medicines`, {
        responseType: 'json',
        params: { SearchTerm: text },
      })
      .pipe(catchError(this.handleError));
  }
  editMedicine(medicine: MrEditMedicineInterface) {
    return this.httpClient
      .put<MrMedicineInterface>(
        `${environment.apiUrl}/medicines/${medicine.id}`,
        medicine,
        {
          responseType: 'json',
        }
      )
      .pipe(catchError(this.handleError));
  }
  addMedicine(medicine: MrAddMedicineInterface) {
    return this.httpClient
      .post<MrMedicineInterface>(`${environment.apiUrl}/medicines`, medicine, {
        responseType: 'json',
      })
      .pipe(catchError(this.handleError));
  }

  deleteMedicine(id: number) {
    return this.httpClient
      .delete<boolean>(`${environment.apiUrl}/medicines/${id}`, {
        responseType: 'json',
      })
      .pipe(catchError(this.handleError));
  }

  getMedicine(id: number) {
    return this.httpClient
      .get<MrMedicineInterface>(`${environment.apiUrl}/medicines/${id}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    // Handle the error here
    console.log('Getting error: ', error.error);
    return throwError(() => new Error(`${error.error.detail}`));
  }
  constructor() {}
}
