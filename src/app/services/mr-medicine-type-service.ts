import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { MrMedicineSprInterface } from '../interfaces/mr-medicine-spr-interface';

@Injectable({
  providedIn: 'root',
})
export class MrMedicineTypeService {
  private readonly httpClient = inject(HttpClient);
  getAllMedicineTypes() {
    return this.httpClient.get<MrMedicineSprInterface[]>(
      `${environment.apiUrl}/medicinetypes`,
      {
        responseType: 'json',
      }
    );
  }
  constructor() {}
}
