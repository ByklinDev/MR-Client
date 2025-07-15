import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MrMedicineSprInterface } from '../interfaces/mr-medicine-spr-interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MrMedicineContainerService {
  private readonly httpClient = inject(HttpClient);
  getAllMedicineContainers() {
    return this.httpClient.get<MrMedicineSprInterface[]>(
      `${environment.apiUrl}/medicinecontainers`,
      {
        responseType: 'json',
      }
    );
  }
  constructor() {}
}
