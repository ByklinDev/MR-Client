import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MrClinicInterface } from '../mr-clinic-interface';
import { response } from 'express';
import { MrAddClinicInterface } from '../interfaces/mr-add-clinic-interface';

@Injectable({
  providedIn: 'root',
})
export class MrClinicService {
  private readonly httpClient = inject(HttpClient);
  private readonly router = inject(Router);

  getAllClinics() {
    return this.httpClient.get<MrClinicInterface[]>(
      `${environment.apiUrl}/clinics`,
      {
        responseType: 'json',
      }
    );
  }

  addClinic(clinic: MrAddClinicInterface) {
    return this.httpClient.post<MrClinicInterface>(
      `${environment.apiUrl}/clinics`,
      clinic,
      {
        responseType: 'json',
      }
    );
  }

  editClinic(clinic: MrClinicInterface) {
    return this.httpClient.put<MrClinicInterface>(
      `${environment.apiUrl}/clinics/${clinic.id}`,
      clinic,
      {
        responseType: 'json',
      }
    );
  }

  constructor() {}
}
