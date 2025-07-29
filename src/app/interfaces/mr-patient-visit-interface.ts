export interface MrPatientVisitInterface {
  id: number;
  patientId: number;
  numberOfVisit: number;
  dateOfVisit: Date;
  medicineDescription: string;
  medicineId: number;
  clinicId: number;
  userId: number;
}
