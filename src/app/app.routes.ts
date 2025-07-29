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
import { mrAddPatientGuard } from './guards/mr-add-patient-guard';
import { mrPatientInfoGuard } from './guards/mr-patient-info-guard';
import { mrClinicsGuard } from './guards/mr-clinics-guard';
import { mrSupplyGuard } from './guards/mr-supply-guard';
import { mrMedicinesGuard } from './guards/mr-medicines-guard';
import { mrResearchGuard } from './guards/mr-research-guard';
import { MrRoles } from './mr-roles/mr-roles';
import { mrRolesGuard } from './guards/mr-roles-guard';

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
    canActivate: [mrMedicinesGuard],
  },
  {
    path: 'supply',
    component: MrSupply,
    canActivate: [mrSupplyGuard],
  },
  {
    path: 'research',
    component: MrResearch,
    canActivate: [mrResearchGuard],
  },
  {
    path: 'clinics',
    component: MrClinics,
    canActivate: [mrClinicsGuard],
  },
  {
    path: 'patient',
    component: MrNewPatient,
    canActivate: [mrAddPatientGuard],
  },
  {
    path: 'patientinfo/:id',
    component: MrPatientInfo,
    canActivate: [mrPatientInfoGuard],
  },
  {
    path: 'roles',
    component: MrRoles,
    canActivate: [mrRolesGuard],
  },
];
