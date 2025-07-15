import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MrMedicineInterface } from '../interfaces/mr-medicine-interface';
import { environment } from '../../environments/environment';
import { MrAddMedicineInterface } from '../interfaces/mr-add-medicine-interface';
import { MrEditMedicineInterface } from '../interfaces/mr-edit-medicine-interface';

@Injectable({
  providedIn: 'root',
})
export class MrMedicineService {
  private readonly httpClient = inject(HttpClient);

  getAllMedicines() {
    return this.httpClient.get<MrMedicineInterface[]>(
      `${environment.apiUrl}/medicines`,
      {
        responseType: 'json',
      }
    );
  }

  getMedicines(text: string) {
    return this.httpClient.get<MrMedicineInterface[]>(
      `${environment.apiUrl}/medicines`,
      {
        responseType: 'json',
        params: { SearchTerm: text },
      }
    );
  }
  editMedicine(medicine: MrEditMedicineInterface) {
    return this.httpClient.put<MrMedicineInterface>(
      `${environment.apiUrl}/medicines/${medicine.id}`,
      medicine,
      {
        responseType: 'json',
      }
    );
  }
  addMedicine(medicine: MrAddMedicineInterface) {
    console.log(medicine);
    return this.httpClient.post<MrMedicineInterface>(
      `${environment.apiUrl}/medicines`,
      medicine,
      {
        responseType: 'json',
      }
    );
  }

  deleteMedicine(id: number) {
    return this.httpClient.delete<boolean>(
      `${environment.apiUrl}/medicines/${id}`,
      {
        responseType: 'json',
      }
    );
  }
  constructor() {}
}
