import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
    );
  }

  addVisit(visit: MrAddVisitInterface): Observable<MrPatientVisitInterface> {
    return this.httpClient.post<MrPatientVisitInterface>(
      `${environment.apiUrl}/visits`,
      visit
    );
  }

  getRandomMedicineType() {
    return this.httpClient.get<MrMedicineTypeInterface>(
      `${environment.apiUrl}/medicinetypes/random`
    );
  }

  getRandomMedicineStock(clinicId: number, medicineTypeId: number) {
    return this.httpClient.get<MrMedicineStockInterface>(
      `${environment.apiUrl}/ClinicStockMedicines/Clinics/${clinicId}/MedicineType/${medicineTypeId}`
    );
  }
  constructor() {}
}
