import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MrActiveTabService {
  activeTab = signal('home');

  setActiveTab(tab: string) {
    this.activeTab.set(tab);
  }

  isActiveTab(tab: string) {
    return this.activeTab() === tab;
  }
  constructor() {}
}
