import { MrPatientGenderEnum } from '../enums/mr-patient-gender-enum';
import { MrPatientStatusEnum } from '../enums/mr-patient-status-enum';

export interface MrPatientInterface {
  id: number;
  number: string;
  dateOfBirth: Date;
  clinicId: number;
  sex: number;
  status: MrPatientStatusEnum;
  medicines: string;
  lastVisitDate: Date;
}
