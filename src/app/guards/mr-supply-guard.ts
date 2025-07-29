import { CanActivateFn } from '@angular/router';
import { MrAuthService } from '../services/mr-auth-service';
import { inject } from '@angular/core';

export const mrSupplyGuard: CanActivateFn = (route, state) => {
  const authService = inject(MrAuthService);
  return authService.isMedicinesActive();
};
