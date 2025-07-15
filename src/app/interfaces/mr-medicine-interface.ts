import { MrMedicineStateEnum } from '../enums/mr-medicine-state-enum';
import { MrMedicineSprInterface } from './mr-medicine-spr-interface';

export interface MrMedicineInterface {
  id: number;
  description: string;
  expireAt: Date;
  createdAt: Date;
  state: MrMedicineStateEnum;
  amount: number;
  medicineTypeId: number;
  medicineType: MrMedicineSprInterface;
  medicineContainerId: number;
  medicineContainer: MrMedicineSprInterface;
  dosageFormId: number;
  dosageForm: MrMedicineSprInterface;
}
