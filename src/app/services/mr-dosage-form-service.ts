import { inject, Injectable } from '@angular/core';
import { MrMedicineSprInterface } from '../interfaces/mr-medicine-spr-interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MrDosageFormService {
  private readonly httpClient = inject(HttpClient);
  getAllDosageForms() {
    return this.httpClient.get<MrMedicineSprInterface[]>(
      `${environment.apiUrl}/dosageforms`,
      {
        responseType: 'json',
      }
    );
  }

  constructor() {}
}
