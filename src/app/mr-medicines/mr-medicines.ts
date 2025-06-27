import {
  Component,
  AfterViewInit,
  ViewChild,
  signal,
  model,
  inject,
} from '@angular/core';
import { MrSearch } from '../mr-search/mr-search';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MrAddMedicine } from '../mr-add-medicine/mr-add-medicine';
import { MatDialog } from '@angular/material/dialog';

export interface MedicineElement {
  Id: number;
  Type: string;
  Description: string;
  DosageForm: string;
  Container: string;
  State: string;
  Expired: Date;
}

const ELEMENT_DATA: MedicineElement[] = [
  {
    Id: 1,
    Type: 'A',
    Description: 'Aspirin',
    DosageForm: 'Tablet',
    Container: 'Bottle',
    State: 'Intact',
    Expired: new Date('2025-12-01'),
  },
  {
    Id: 2,
    Type: 'B',
    Description: 'Amoxicillin',
    DosageForm: 'Tablet',
    Container: 'Bottle',
    State: 'Intact',
    Expired: new Date('2026-05-01'),
  },
  {
    Id: 3,
    Type: 'C',
    Description: 'Acetomenophen',
    DosageForm: 'Capsule',
    Container: 'Blister',
    State: 'Intact',
    Expired: new Date('2025-10-01'),
  },
  {
    Id: 4,
    Type: 'C',
    Description: 'Atorvastatin',
    DosageForm: 'Capsule',
    Container: 'Blister',
    State: 'Intact',
    Expired: new Date('2025-09-01'),
  },
  {
    Id: 5,
    Type: 'D',
    Description: 'Omeprazol',
    DosageForm: 'Capsule',
    Container: 'Bottle',
    State: 'Intact',
    Expired: new Date('2026-02-01'),
  },
  {
    Id: 6,
    Type: 'B',
    Description: 'Amlodipin',
    DosageForm: 'Tablet',
    Container: 'Blister',
    State: 'Intact',
    Expired: new Date('2026-04-30'),
  },
  {
    Id: 7,
    Type: 'A',
    Description: 'Clonazepam',
    DosageForm: 'Tablet',
    Container: 'Blister',
    State: 'Intact',
    Expired: new Date('2025-11-26'),
  },
];

@Component({
  selector: 'app-mr-medicines',
  imports: [MrSearch, MatTableModule, MatPaginatorModule],
  templateUrl: './mr-medicines.html',
  styleUrl: './mr-medicines.css',
})
export class MrMedicines implements AfterViewInit {
  @ViewChild(MatPaginator)
  paginator: MatPaginator = new MatPaginator();
  displayedColumns: string[] = [
    'Id',
    'Type',
    'Description',
    'DosageForm',
    'Container',
    'State',
    'Expired',
  ];
  dataSource = new MatTableDataSource<MedicineElement>(ELEMENT_DATA);

  search() {
    console.log('searching medicines');
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  readonly animal = signal('');
  readonly name = model('');
  readonly dialog = inject(MatDialog);

  openDialog(): void {
    const dialogRef = this.dialog.open(MrAddMedicine, {
      data: { name: this.name(), animal: this.animal() },
      maxWidth: '700px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        this.animal.set(result);
      }
    });
  }
}
