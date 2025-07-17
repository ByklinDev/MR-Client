export interface MrSupplyInterface {
  id: number;
  medicineId: number;
  medicineDescription: string;
  amount: number;
  clinicId: number;
  clinicName: string;
  userId: number;
  isActive: boolean;
  dateArrival: Date;
}
