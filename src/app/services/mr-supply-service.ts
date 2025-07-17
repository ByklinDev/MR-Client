import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { MrAddToSupplyInterface } from '../interfaces/mr-add-to-supply-interface';
import { MrSupplyInterface } from '../interfaces/mr-supply-interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MrSupplyService {
  private readonly httpClient = inject(HttpClient);
  addToSupply(supply: MrAddToSupplyInterface): Observable<MrSupplyInterface> {
    console.log(supply);
    return this.httpClient.post<MrSupplyInterface>(
      `${environment.apiUrl}/supplies`,
      supply
    );
  }

  getSuppliesByUserId(userId: number): Observable<MrSupplyInterface[]> {
    return this.httpClient.get<MrSupplyInterface[]>(
      `${environment.apiUrl}/supplies/users/${userId}`
    );
  }

  deleteSupply(supplyId: number): Observable<void> {
    return this.httpClient.delete<void>(
      `${environment.apiUrl}/supplies/${supplyId}`
    );
  }

  addSupplies(supplies: MrSupplyInterface[], userId: number) {
    return this.httpClient.patch<MrSupplyInterface[]>(
      `${environment.apiUrl}/supplies/${userId}`,
      supplies
    );
  }

  constructor() {}
}
