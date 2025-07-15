import {
  AfterViewInit,
  Component,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MrSearch } from '../mr-search/mr-search';
import { MrClinicInterface } from '../interfaces/mr-clinic-interface';
import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MrAddClinic } from '../mr-add-clinic/mr-add-clinic';
import { MrClinicService } from '../services/mr-clinic-service';
import { MatIconModule } from '@angular/material/icon';
import { MrEditClinic } from '../mr-edit-clinic/mr-edit-clinic';
import { MatSortModule, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-mr-clinics',
  imports: [
    MrSearch,
    MatPaginatorModule,
    MatTableModule,
    MatIconModule,
    MatSortModule,
  ],
  templateUrl: './mr-clinics.html',
  styleUrl: './mr-clinics.css',
})
export class MrClinics implements AfterViewInit, OnInit {

  private readonly clinicService = inject(MrClinicService);
  private _liveAnnouncer = inject(LiveAnnouncer);

  dataSource = new MatTableDataSource<MrClinicInterface>();

  @ViewChild(MatPaginator)
  paginator: MatPaginator = new MatPaginator();
  displayedColumns: string[] = [
    'id',
    'name',
    'city',
    'addressOne',
    'addressTwo',
    'phone',
    'actions',
  ];

  @ViewChild(MatSort)
  sort: MatSort = new MatSort();

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getClinics() {
    this.clinicService.getAllClinics().subscribe({
      next: (data) => {
        this.dataSource.data = data as MrClinicInterface[];
      },
    });
  }
  edit(clinic: MrClinicInterface) {
    this.editDialog(clinic);
  }
  ngOnInit(): void {
    this.clinicService.getAllClinics().subscribe({
      next: (data) => {
        this.dataSource.data = data as MrClinicInterface[];
      },
      error: (error) => {
        console.error('Error fetching clinics:', error);
      },
    });
  }
  readonly dialog = inject(MatDialog);

  addDialog(): void {
    const dialogRef = this.dialog.open(MrAddClinic, {
      data: { name: '', city: '', phone: '', addressone: '', addresstwo: '' },
      maxWidth: '700px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        this.getClinics();
      }
    });
  }

  editDialog(clinic: MrClinicInterface): void {
    const dialogRef = this.dialog.open(MrEditClinic, {
      data: {
        id: clinic.id,
        name: clinic.name,
        city: clinic.city,
        phone: clinic.phone,
        addressOne: clinic.addressOne,
        addressTwo: clinic.addressTwo,
      },
      maxWidth: '700px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        this.getClinics();
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

  search(text: string) {
    this.clinicService.getClinics(text).subscribe({
      next: (data) => {
        this.dataSource.data = data as MrClinicInterface[];
      },
      error: (error) => {
        console.error('Error fetching clinics:', error);
      },
    });
  }
}
