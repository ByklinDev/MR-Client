import { MrPatientGenderEnum } from '../enums/mr-patient-gender-enum';
import { MrPatientStatusEnum } from '../enums/mr-patient-status-enum';

export interface MrPatientExtInterface {
  id: number;
  number: string;
  dateOfBirth: Date;
  clinicId: number;
  sex: MrPatientGenderEnum;
  status: MrPatientStatusEnum;
  medicines: string;
  lastVisitDate: Date;
}
