import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { MrAuthService } from '../services/mr-auth-service';

export const mrMedicinesGuard: CanActivateFn = (route, state) => {
  const authService = inject(MrAuthService);
  return authService.isMedicinesActive();
};
