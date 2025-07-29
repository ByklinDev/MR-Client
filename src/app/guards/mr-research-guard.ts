import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { MrAuthService } from '../services/mr-auth-service';

export const mrResearchGuard: CanActivateFn = (route, state) => {
  const authService = inject(MrAuthService);
  return authService.isResearchActive();
};
