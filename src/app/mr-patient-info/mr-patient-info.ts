import {
  AfterViewInit,
  Component,
  computed,
  inject,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MrPatientVisitInterface } from '../interfaces/mr-patient-visit-interface';
import { ActivatedRoute } from '@angular/router';
import { MrPatientService } from '../services/mr-patient-service';
import { DatePipe } from '@angular/common';
import { MrPatientStatusPipe } from '../pipes/mr-patient-status-pipe';
import { MrPatientSexPipe } from '../pipes/mr-patient-sex-pipe';
import { MrVisitService } from '../services/mr-visit-service';
import { MrAddVisitInterface } from '../interfaces/mr-add-visit-interface';
import { MrMedicineService } from '../services/mr-medicine-service';
import { MrAuthService } from '../services/mr-auth-service';
import { MrActiveTabService } from '../services/mr-active-tab-service';
import { MrUpdatePatientInterface } from '../interfaces/mr-update-patient-interface';
import { MrPatientStatusEnum } from '../enums/mr-patient-status-enum';
import { Console } from 'console';

@Component({
  selector: 'app-mr-patient-info',
  imports: [
    MatPaginatorModule,
    MatTableModule,
    MrPatientStatusPipe,
    MrPatientSexPipe,
    DatePipe,
  ],
  templateUrl: './mr-patient-info.html',
  styleUrl: './mr-patient-info.css',
})
export class MrPatientInfo implements AfterViewInit, OnInit {
  private route = inject(ActivatedRoute);
  private readonly patientService = inject(MrPatientService);
  private readonly visitService = inject(MrVisitService);
  private readonly medicineService = inject(MrMedicineService);
  private readonly authService = inject(MrAuthService);
  private readonly activeTabService = inject(MrActiveTabService);

  patientNumber = signal('');
  patientStatus = signal('');
  patientSex = signal('');
  patientMedicineType = signal('');
  patientDateOfBirth = signal('');
  patientLastVisitDate = signal('');
  patientClinicId = computed(() => Number(this.patientNumber().split('-')[0]));

  patientId = signal('');
  medicineTypeId = signal<number>(0);
  medicineId = signal<number>(0);
  userId = signal<number>(0);

  tempMedicineId = signal<number>(0);
  isDisabled = signal<boolean>(false);
  errorMessage = signal('');

  @ViewChild(MatPaginator)
  paginator: MatPaginator = new MatPaginator();

  displayedColumns: string[] = ['Number', 'Date', 'Medicine'];
  dataSource = new MatTableDataSource<MrPatientVisitInterface>();

  getAllUserVisits(patientId: number) {
    this.visitService.getAllVisits(patientId).subscribe({
      next: (data) => {
        this.dataSource.data = data as MrPatientVisitInterface[];
      },
      error: (err) => {
        this.errorMessage.set(err.message);
      },
    });
  }

  isStatusFinished(): boolean {
    return (
      this.patientStatus().toString() === '3' ||
      this.patientStatus().toString() === '4'
    );
  }

  addVisit() {
    console.log('Start visiting...');
    this.errorMessage.set('');
    this.visitService
      .getRandomMedicineStock(this.patientClinicId(), this.medicineTypeId())
      .subscribe({
        next: (response) => {
          this.medicineId.set(response.medicineId);

          const visit: MrAddVisitInterface = {
            patientId: Number(this.patientId()),
            medicineId: this.medicineId(),
            clinicId: this.patientClinicId(),
            userId: this.userId(),
          };
          this.visitService.addVisit(visit).subscribe({
            next: (data) => {
              this.getAllUserVisits(visit.patientId);
              this.patientService
                .getPatient(Number(this.patientId()))
                .subscribe({
                  next: (response) => {
                    this.patientStatus.set(response.status.toString());
                    this.patientLastVisitDate.set(
                      new Date(response.lastVisitDate)
                        .toLocaleDateString()
                        .substring(0, 10)
                    );
                  },
                  error: (err) => {
                    this.errorMessage.set(err.message);
                  },
                });
            },
            error: (err) => {
              this.errorMessage.set(err.message);
            },
          });
        },
        error: (err) => {
          this.errorMessage.set(err.message);
        },
      });
  }

  endParticipation() {
    const patient: MrUpdatePatientInterface = {
      id: Number(this.patientId()),
      status: MrPatientStatusEnum.Finished,
    };
    this.patientService.endPatient(patient).subscribe({
      next: (data) => {
        this.patientStatus.set(data.status.toString());

        this.patientLastVisitDate.set(
          new Date(data.lastVisitDate).toLocaleDateString().substring(0, 10)
        );
        this.isDisabled.set(this.isStatusFinished());
      },
      error: (err) => {
        this.errorMessage.set(err.message);
      },
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.errorMessage.set('');
    this.activeTabService.setActiveTab('patientinfo');
    this.patientId.set(this.route.snapshot.paramMap.get('id') ?? '01');
    this.userId = this.authService.userId;
    this.patientService.getPatient(Number(this.patientId())).subscribe({
      next: (data) => {
        this.patientNumber.set(data.number);
        this.patientStatus.set(data.status.toString());
        this.isDisabled.set(this.isStatusFinished());

        this.patientSex.set(data.sex.toString());
        this.patientDateOfBirth.set(
          new Date(data.dateOfBirth).toLocaleDateString().substring(0, 10)
        );
        if (
          new Date(data.lastVisitDate).toISOString() ===
          new Date('0001-01-01T00:00:00').toISOString()
        ) {
          this.patientLastVisitDate.set('');
        } else {
          this.patientLastVisitDate.set(
            new Date(data.lastVisitDate).toLocaleDateString().substring(0, 10)
          );
        }
      },
      error: (err) => {
        this.errorMessage.set(err.message);
      },
    });

    if (this.patientMedicineType().length === 0) {
      this.visitService.getRandomMedicineType().subscribe({
        next: (data) => {
          this.medicineTypeId.set(data.id);
          this.patientMedicineType.set(data.name);
        },
        error: (err) => {
          this.errorMessage.set(err.message);
        },
      });
    }

    this.visitService.getAllVisits(Number(this.patientId())).subscribe({
      next: (data) => {
        this.dataSource.data = data as MrPatientVisitInterface[];
        if (data.length > 0) {
          this.tempMedicineId.set(data[0].medicineId);
        }
        if (this.tempMedicineId() !== 0) {
          this.medicineService.getMedicine(this.tempMedicineId()).subscribe({
            next: (response) => {
              this.medicineTypeId.set(response.medicineTypeId);
              this.patientMedicineType.set(response.medicineType.name);
            },
            error: (err) => {
              this.errorMessage.set(err.message);
            },
          });
        }
      },
      error: (err) => {
        this.errorMessage.set(err.message);
      },
    });
  }

  constructor() {}
}
