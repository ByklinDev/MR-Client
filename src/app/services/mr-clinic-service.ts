import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { MrClinicInterface } from '../interfaces/mr-clinic-interface';
import { response } from 'express';
import { MrAddClinicInterface } from '../interfaces/mr-add-clinic-interface';
import { MrQueryInterface } from '../interfaces/mr-query-interface';

@Injectable({
  providedIn: 'root',
})
export class MrClinicService {
  private readonly httpClient = inject(HttpClient);

  getAllClinics(query?: MrQueryInterface) {
    let params = new HttpParams()
      .set('Take', query?.take ?? 25)
      .set('Skip', query?.skip ?? 1)
      .set('SearchTerm', query?.searchTerm ?? '')
      .set('SearchColumn', query?.sortColumn ?? '')
      .set('isAscending', query?.isAscending ?? false);

    return this.httpClient.get<MrClinicInterface[]>(
      `${environment.apiUrl}/clinics`,
      {
        observe: 'response',
        responseType: 'json',
        params: params,
      }
    );
  }

  getClinics(text: string) {
    return this.httpClient.get<MrClinicInterface[]>(
      `${environment.apiUrl}/clinics`,
      {
        observe: 'response',
        responseType: 'json',
        params: { SearchTerm: text },
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
