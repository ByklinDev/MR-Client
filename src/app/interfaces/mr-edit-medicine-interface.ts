import { MrMedicineStateEnum } from '../enums/mr-medicine-state-enum';

export interface MrEditMedicineInterface {
  id: number;
  description: string;
  expireAt: string;
  state: MrMedicineStateEnum;
  amount: number;
  medicineTypeId: number;
  medicineContainerId: number;
  dosageFormId: number;
}
