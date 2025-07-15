import { Routes } from '@angular/router';
import { MrHome } from './mr-home/mr-home';
import { MrSignUp } from './mr-sign-up/mr-sign-up';
import { MrLogIn } from './mr-log-in/mr-log-in';
import { MrMyAccount } from './mr-my-account/mr-my-account';
import { MrMedicines } from './mr-medicines/mr-medicines';
import { MrSupply } from './mr-supply/mr-supply';
import { MrResearch } from './mr-research/mr-research';
import { MrClinics } from './mr-clinics/mr-clinics';
import { MrNewPatient } from './mr-new-patient/mr-new-patient';
import { MrPatientInfo } from './mr-patient-info/mr-patient-info';
import { mrIsAuthenticateGuard } from './guards/mr-is-authenticate-guard';

export const routes: Routes = [
  {
    path: '',
    component: MrHome,
  },
  {
    path: 'signup',
    component: MrSignUp,
  },
  {
    path: 'login',
    component: MrLogIn,
  },
  {
    path: 'myaccount',
    component: MrMyAccount,
    canActivate: [mrIsAuthenticateGuard],
  },
  {
    path: 'medicines',
    component: MrMedicines,
    canActivate: [mrIsAuthenticateGuard],
  },
  {
    path: 'supply',
    component: MrSupply,
    canActivate: [mrIsAuthenticateGuard],
  },
  {
    path: 'research',
    component: MrResearch,
    canActivate: [mrIsAuthenticateGuard],
  },
  {
    path: 'clinics',
    component: MrClinics,
    canActivate: [mrIsAuthenticateGuard],
  },
  {
    path: 'patient',
    component: MrNewPatient,
    canActivate: [mrIsAuthenticateGuard],
  },
  {
    path: 'patientinfo',
    component: MrPatientInfo,
    canActivate: [mrIsAuthenticateGuard],
  },
];
