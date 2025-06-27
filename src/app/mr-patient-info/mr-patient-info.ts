import { AfterViewInit, Component, signal, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MrPatientVisitInterface } from '../mr-patient-visit-interface';

const ELEMENT_DATA_VISITS: MrPatientVisitInterface[] = [
  {
    visitnumber: 1,
    visitdate: new Date('2025-02-01'),
    medicine: '213548. Aspirin',
  },
  {
    visitnumber: 2,
    visitdate: new Date('2025-02-16'),
    medicine: '546751. Paracetamol',
  },
];

@Component({
  selector: 'app-mr-patient-info',
  imports: [MatPaginatorModule, MatTableModule],
  templateUrl: './mr-patient-info.html',
  styleUrl: './mr-patient-info.css',
})
export class MrPatientInfo implements AfterViewInit {
  patientNumber = signal('001-0001');
  patientStatus = signal('Randomized');
  patientSex = signal('Mail');
  patientMedicineType = signal('A');
  patientDateOfBirth = signal('1991-09-14');
  patientLastVisitDate = signal('2020-09-01');

  @ViewChild(MatPaginator)
  paginator: MatPaginator = new MatPaginator();
  displayedColumns: string[] = ['Number', 'Date', 'Medicine'];
  dataSource = new MatTableDataSource<MrPatientVisitInterface>(
    ELEMENT_DATA_VISITS
  );

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
