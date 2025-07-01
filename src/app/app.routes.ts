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
import { M } from '@angular/cdk/keycodes';
import { mrIsAuthenticateGuard } from './mr-is-authenticate-guard';

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
  },
  {
    path: 'medicines',
    component: MrMedicines,
    canActivate: [mrIsAuthenticateGuard],
  },
  {
    path: 'supply',
    component: MrSupply,
  },
  {
    path: 'research',
    component: MrResearch,
  },
  {
    path: 'clinics',
    component: MrClinics,
  },
  {
    path: 'patient',
    component: MrNewPatient,
  },
  {
    path: 'patientinfo',
    component: MrPatientInfo,
  },
];
