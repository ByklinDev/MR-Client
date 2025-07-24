import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { MrAddPatientInterface } from '../interfaces/mr-add-patient-interface';
import { MrPatientInterface } from '../interfaces/mr-patient-interface';
import { MrPatientExtInterface } from '../interfaces/mr-patient-ext-interface';
import { MrUpdatePatientInterface } from '../interfaces/mr-update-patient-interface';

@Injectable({
  providedIn: 'root',
})
export class MrPatientService {
  private readonly httpClient = inject(HttpClient);
  addPatient(patient: MrAddPatientInterface) {
    return this.httpClient.post<MrPatientInterface>(
      `${environment.apiUrl}/patients`,
      patient,
      {
        responseType: 'json',
      }
    );
  }

  getAllPatients() {
    return this.httpClient.get<MrPatientInterface[]>(
      `${environment.apiUrl}/patients`,
      {
        responseType: 'json',
      }
    );
  }

  getPatients(text: string) {
    return this.httpClient.get<MrPatientInterface[]>(
      `${environment.apiUrl}/patients`,
      {
        responseType: 'json',
        params: { SearchTerm: text },
      }
    );
  }

  getPatient(patientId: number) {
    return this.httpClient.get<MrPatientInterface>(
      `${environment.apiUrl}/patients/${patientId}`
    );
  }

  endPatient(patient: MrUpdatePatientInterface) {
    return this.httpClient.put<MrPatientInterface>(
      `${environment.apiUrl}/patients/${patient.id}`,
      patient
    );
  }

  constructor() {}
}
