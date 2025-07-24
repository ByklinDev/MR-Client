import { MrPatientStatusEnum } from '../enums/mr-patient-status-enum';

export interface MrUpdatePatientInterface {
  id: number;
  status: MrPatientStatusEnum;
}
