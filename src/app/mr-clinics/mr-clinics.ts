import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { MrSearch } from '../mr-search/mr-search';
import { MrClinicInterface } from '../mr-clinic-interface';
import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MrAddClinic } from '../mr-add-clinic/mr-add-clinic';

const ELEMENT_DATA_CLINICS: MrClinicInterface[] = [
  {
    id: 1,
    name: 'Clinic 1',
    city: 'Minsk',
    address: 'Lenina, 25',
    address2: 'Masherova, 10',
    phone: '+3751755266569',
  },
  {
    id: 2,
    name: 'Clinic 2',
    city: 'Mogilev',
    address: 'Lenina, 20',
    address2: 'Masherova, 16',
    phone: '+3751555266569',
  },
  {
    id: 3,
    name: 'Clinic 3',
    city: 'Grodno',
    address: 'Lenina, 15',
    address2: 'Masherova, 69',
    phone: '+3751655266569',
  },
];

@Component({
  selector: 'app-mr-clinics',
  imports: [MrSearch, MatPaginatorModule, MatTableModule],
  templateUrl: './mr-clinics.html',
  styleUrl: './mr-clinics.css',
})
export class MrClinics implements AfterViewInit {
  @ViewChild(MatPaginator)
  paginator: MatPaginator = new MatPaginator();
  displayedColumns: string[] = [
    'Id',
    'Name',
    'City',
    'Address',
    'Address2',
    'Phone',
  ];
  dataSource = new MatTableDataSource<MrClinicInterface>(ELEMENT_DATA_CLINICS);

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  readonly dialog = inject(MatDialog);

  openDialog(): void {
    const dialogRef = this.dialog.open(MrAddClinic, {
      data: { name: '', city: '', phone: '', address: '', address2: '' }, maxWidth: '700px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      if (result !== undefined) {
      }
    });
  }
}
