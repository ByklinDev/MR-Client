import {
  AfterViewInit,
  Component,
  inject,
  model,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MrClinicInterface } from '../interfaces/mr-clinic-interface';
import { MrClinicStockMedicineInterface } from '../mr-clinic-stock-medicine-interface';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MrClinicService } from '../services/mr-clinic-service';
import { MrMedicineInterface } from '../interfaces/mr-medicine-interface';
import { MrMedicineService } from '../services/mr-medicine-service';
import { MrMedicineStateEnum } from '../enums/mr-medicine-state-enum';
import { MrAddToSupplyInterface } from '../interfaces/mr-add-to-supply-interface';
import { MrSupplyInterface } from '../interfaces/mr-supply-interface';
import { MrSupplyService } from '../services/mr-supply-service';
import { MrAuthService } from '../services/mr-auth-service';
import { MatIconModule } from '@angular/material/icon';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-mr-supply',
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    MatTableModule,
    MatIconModule,
    MatSortModule,
  ],
  templateUrl: './mr-supply.html',
  styleUrl: './mr-supply.css',
})
export class MrSupply implements AfterViewInit, OnInit {
  private readonly clinicsService = inject(MrClinicService);
  private readonly medicineService = inject(MrMedicineService);
  private readonly supplyService = inject(MrSupplyService);
  private readonly authService = inject(MrAuthService);
  private readonly userId = this.authService.getUserId();
  private _liveAnnouncer = inject(LiveAnnouncer);

  clinicId = model<number>(0);
  medicineId = model<number>(0);
  amount = model<number>(0);

  clinics: MrClinicInterface[] = [];
  medicines: MrMedicineInterface[] = [];

  filteredClinics: MrClinicInterface[] = [];
  filteredMedicines: MrMedicineInterface[] = [];

  displayedColumns: string[] = [
    'clinicName',
    'medicineDescription',
    'amount',
    'actions',
  ];
  dataSource = new MatTableDataSource<MrSupplyInterface>();

  @ViewChild(MatSort)
  sort: MatSort = new MatSort();

  minus(): void {
    if (this.amount() > 0) {
      this.amount.set(this.amount() - 1);
    }
  }
  plus(): void {
    this.amount.set(this.amount() + 1);
  }

  addToSupply(): void {
    const supply: MrAddToSupplyInterface = {
      clinicId: this.clinicId(),
      medicineId: this.medicineId(),
      amount: this.amount(),
      userId: this.userId,
    };

    this.supplyService.addToSupply(supply).subscribe({
      next: (data) => {
        this.getSuppliesByUserId(this.userId);
      },
      error: (error) => {
        console.error('Error adding supply:', error);
      },
    });
  }

  addSupplies() {
    this.supplyService
      .addSupplies(this.dataSource.data, this.userId)
      .subscribe({
        next: (data) => {
          this.getSuppliesByUserId(this.userId);
        },
      });
  }

  onKeyClinic(event: any): void {
    const eventValue = event.target.value.toLowerCase();
    console.log('Search text:', eventValue);
    if (eventValue) {
      this.filteredClinics = this.clinics.filter((clinic) =>
        clinic.name.toLowerCase().includes(eventValue.toLowerCase())
      );
    } else {
      this.filteredClinics = this.clinics;
    }
  }

  onKeyMed(event: any): void {
    const eventValue = event.target.value.toLowerCase();
    console.log('Search text:', eventValue);
    if (eventValue) {
      this.filteredMedicines = this.medicines.filter((medicine) =>
        medicine.description.toLowerCase().includes(eventValue.toLowerCase())
      );
    } else {
      this.filteredMedicines = this.medicines;
    }
  }

  delete(medicine: MrSupplyInterface) {
    this.supplyService.deleteSupply(medicine.id).subscribe({
      next: () => {
        console.log('Supply deleted successfully');
        this.getSuppliesByUserId(this.userId);
      },
      error: (error) => {
        console.error('Error deleting supply:', error);
      },
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.clinicsService.getAllClinics().subscribe({
      next: (data) => {
        this.clinics = data as MrClinicInterface[];
        this.filteredClinics = this.clinics;
      },
      error: (error) => {
        console.error('Error fetching clinics:', error);
      },
    });

    this.medicineService.getAllMedicines().subscribe({
      next: (data) => {
        this.medicines = (data as MrMedicineInterface[]).filter(
          (medicine) =>
            medicine.state === MrMedicineStateEnum.Ok && medicine.amount > 0
        );
        this.filteredMedicines = this.medicines;
      },
      error: (error) => {
        console.error('Error fetching medicines:', error);
      },
    });

    this.getSuppliesByUserId(this.userId);
  }

  getSuppliesByUserId(userId: number): void {
    this.supplyService.getSuppliesByUserId(userId).subscribe({
      next: (data) => {
        this.dataSource.data = data as MrSupplyInterface[];
      },
      error: (error) => {
        console.error('Error fetching supplies:', error);
      },
    });
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
