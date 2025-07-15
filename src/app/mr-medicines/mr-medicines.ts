import {
  Component,
  AfterViewInit,
  ViewChild,
  inject,
  OnInit,
} from '@angular/core';
import { MrSearch } from '../mr-search/mr-search';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MrAddMedicine } from '../mr-add-medicine/mr-add-medicine';
import { MatDialog } from '@angular/material/dialog';
import { MrMedicineInterface } from '../interfaces/mr-medicine-interface';
import { MrMedicineService } from '../services/mr-medicine-service';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatIconModule } from '@angular/material/icon';
import { MrEditMedicine } from '../mr-edit-medicine/mr-edit-medicine';
import { DatePipe } from '@angular/common';
import { MrDeleteMedicine } from '../mr-delete-medicine/mr-delete-medicine';
import { MrMedicineStateEnum } from '../enums/mr-medicine-state-enum';
import { MrMedicineStatePipe } from '../pipes/mr-medicine-state-pipe';

@Component({
  selector: 'app-mr-medicines',
  imports: [
    MrSearch,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatSortModule,
    DatePipe,
    MrMedicineStatePipe,
  ],
  templateUrl: './mr-medicines.html',
  styleUrl: './mr-medicines.css',
})
export class MrMedicines implements AfterViewInit, OnInit {
  
  private readonly medicineService = inject(MrMedicineService);
  private _liveAnnouncer = inject(LiveAnnouncer);

  dataSource = new MatTableDataSource<MrMedicineInterface>([]);
  MedicineState = MrMedicineStateEnum.Ok;

  @ViewChild(MatPaginator)
  paginator: MatPaginator = new MatPaginator();
  displayedColumns: string[] = [
    'id',
    'medicineType',
    'description',
    'dosageForm',
    'medicineContainer',
    'state',
    'expireAt',
    'actions',
  ];

  @ViewChild(MatSort)
  sort: MatSort = new MatSort();

  search(text: string) {
    console.log('Search text:', text);
      this.medicineService.getMedicines(text).subscribe({
        next: (data) => {
          this.dataSource.data = data as MrMedicineInterface[];
        },
        error: (error) => {
          console.error('Error fetching medicines:', error);
        },
      });
    }


  edit(medicine: MrMedicineInterface) {
    this.editDialog(medicine);
  }
  delete(medicine: MrMedicineInterface) {
    this.deleteDialog(medicine);
  }

  getMedicines() {
    this.medicineService.getAllMedicines().subscribe((medicines) => {
      this.dataSource.data = medicines;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  ngOnInit() {
    this.medicineService.getAllMedicines().subscribe((medicines) => {
      this.dataSource.data = medicines;
    });
  }
  readonly dialog = inject(MatDialog);

  addDialog(): void {
    const dialogRef = this.dialog.open(MrAddMedicine, {
      data: {
        medicineTypeId: null,
        dosageFormId: null,
        medicineContainerId: null,
        expireAt: new Date(),
        description: '',
        amount: 0,
      },
      maxWidth: '700px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        this.getMedicines();
      }
    });
  }

  editDialog(medicine: MrMedicineInterface): void {
    const dialogRef = this.dialog.open(MrEditMedicine, {
      data: {
        id: medicine.id,
        description: medicine.description,
        amount: medicine.amount,
        dosageFormId: medicine.dosageFormId,
        medicineContainerId: medicine.medicineContainerId,
        medicineTypeId: medicine.medicineTypeId,
        expireAt: medicine.expireAt,
        state: medicine.state,
      },
      maxWidth: '700px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        this.getMedicines();
      }
    });
  }

  deleteDialog(medicine: MrMedicineInterface) {
    const dialogRef = this.dialog.open(MrDeleteMedicine, {
      data: {
        id: medicine.id,
        description: medicine.description,
        amount: medicine.amount,
        dosageFormId: medicine.dosageFormId,
        medicineContainerId: medicine.medicineContainerId,
        medicineTypeId: medicine.medicineTypeId,
        expireAt: medicine.expireAt,
        state: medicine.state,
      },
      maxWidth: '700px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        this.getMedicines();
      }
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
