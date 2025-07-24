import {
  AfterViewInit,
  Component,
  inject,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { MrSearch } from '../mr-search/mr-search';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router, RouterLink } from '@angular/router';
import { MrPatientService } from '../services/mr-patient-service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MrPatientGenderEnum } from '../enums/mr-patient-gender-enum';
import { MrPatientExtInterface } from '../interfaces/mr-patient-ext-interface';
import { MatIconModule } from '@angular/material/icon';
import { MrPatientStatusEnum } from '../enums/mr-patient-status-enum';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MrPatientInterface } from '../interfaces/mr-patient-interface';
import { DatePipe } from '@angular/common';
import { MrActiveTabService } from '../services/mr-active-tab-service';
import { MrAuthService } from '../services/mr-auth-service';
import { sign } from 'crypto';

@Component({
  selector: 'app-mr-research',
  imports: [
    MrSearch,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatSortModule,
    MatFormFieldModule,
    FormsModule,
    DatePipe,
    RouterLink,
  ],
  templateUrl: './mr-research.html',
  styleUrl: './mr-research.css',
})
export class MrResearch implements OnInit, AfterViewInit {
  private readonly router = inject(Router);
  private readonly authService = inject(MrAuthService);
  private readonly patientsService = inject(MrPatientService);
  private readonly activeTabService = inject(MrActiveTabService);
  private _liveAnnouncer = inject(LiveAnnouncer);

  @ViewChild(MatPaginator)
  paginator: MatPaginator = new MatPaginator();
  displayedColumns: string[] = [
    'patientNumber',
    'dateOfBirth',
    'lastVisitDate',
    'medicines',
  ];
  dataSource = new MatTableDataSource<MrPatientInterface>();

  @ViewChild(MatSort)
  sort: MatSort = new MatSort();

  isAddActive = signal<boolean>(false);

  getAllPatients() {
    this.patientsService.getAllPatients().subscribe({
      next: (patients) => {
        this.dataSource.data = patients as MrPatientInterface[];
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  addPatient(): void {
    // Logic to add a new patient
    this.router.navigate(['/patient']);
  }

  search(text: string) {
    this.patientsService.getPatients(text).subscribe({
      next: (data) => {
        this.dataSource.data = data as MrPatientInterface[];
      },
      error: (error) => {
        console.error('Error fetching patients:', error);
      },
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.isAddActive.set(this.authService.isRoleActive('Admin') || this.authService.isRoleActive('Researcher'))
    this.activeTabService.setActiveTab('research');
    this.getAllPatients();
  }
}
