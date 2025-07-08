export interface MrUserUpdateInterface {
  id: number;
  firstName: string;
  lastName: string;
  initials: string;
  email: string;
  password: string;
  newPassword: string;
  confirmPassword: string;
  state: number;
  clinicId: number;
}
