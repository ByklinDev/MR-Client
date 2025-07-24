import { Component, inject, OnInit, signal } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterLink } from '@angular/router';
import { MrAuthService } from '../services/mr-auth-service';
import { MrActiveTabService } from '../services/mr-active-tab-service';

@Component({
  selector: 'app-mr-navbar',
  imports: [MatTabsModule, RouterLink],
  templateUrl: './mr-navbar.html',
  styleUrl: './mr-navbar.css',
})
export class MrNavbar implements OnInit {
  private readonly authService = inject(MrAuthService);
  private readonly activeTabService = inject(MrActiveTabService);

  activeTab = signal(this.activeTabService.activeTab());

  showLogin = signal<boolean>(true);
  hideLogin = signal<boolean>(false);

  isActiveTab(tab: string): boolean {
    return this.activeTabService.isActiveTab(tab);
  }

  isClinicsActive = signal<boolean>(this.authService.isClinicsActive());
  isMyAccountActive = signal<boolean>(this.authService.isMyAccountActive());
  isMedicinesActive = signal<boolean>(this.authService.isMedicinesActive());
  isSupplyActive = signal<boolean>(this.authService.isSupplyActive());
  isResearchActive = signal<boolean>(this.authService.isResearchActive());
  isNewPatientActive = signal<boolean>(this.authService.isNewPatientActive());
  isPatientInfoActive = signal<boolean>(this.authService.isPatientInfoActive());

  ngOnInit() {
    this.showLogin = this.authService.showLogin;
    this.hideLogin = this.authService.hideLogin;
    this.activeTab = this.activeTabService.activeTab;

    this.isClinicsActive = this.authService.isClinicsActive;
    this.isMyAccountActive = this.authService.isMyAccountActive;
    this.isMedicinesActive = this.authService.isMedicinesActive;
    this.isSupplyActive = this.authService.isSupplyActive;
    this.isResearchActive = this.authService.isResearchActive;
    this.isNewPatientActive = this.authService.isNewPatientActive;
    this.isPatientInfoActive = this.authService.isPatientInfoActive;
  }
}
