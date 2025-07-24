import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgIf } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { PatientNumberValidator } from '../validators/mr-patient-validator-directive';
import { MrClinicService } from '../services/mr-clinic-service';
import { MrPatientService } from '../services/mr-patient-service';
import { MrClinicInterface } from '../interfaces/mr-clinic-interface';
import { MrPatientInterface } from '../interfaces/mr-patient-interface';
import { MrAddPatientInterface } from '../interfaces/mr-add-patient-interface';
import { MrPatientGenderEnum } from '../enums/mr-patient-gender-enum';
import { M } from '@angular/cdk/keycodes';
import { MrActiveTabService } from '../services/mr-active-tab-service';

@Component({
  selector: 'app-mr-new-patient',
  imports: [
    MatRadioModule,
    MatInputModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCheckboxModule,
  ],
  templateUrl: './mr-new-patient.html',
  styleUrl: './mr-new-patient.css',
})
export class MrNewPatient implements OnInit {
  private readonly clinicsService = inject(MrClinicService);
  private readonly patientsService = inject(MrPatientService);
  private readonly patientNumberValidator = inject(PatientNumberValidator);
  private readonly activeTabService = inject(MrActiveTabService);

  clinics: MrClinicInterface[] = [];
  patients: MrPatientInterface[] = [];

  patientForm = new FormGroup({
    patientNumber: new FormControl(
      '',
      [Validators.required],
      (asyncValidators) => this.patientNumberValidator.validate(asyncValidators)
    ),
    dateOfBirth: new FormControl(
      new Date('1900-01-01').toISOString().substring(0, 10),
      [Validators.required]
    ),
    gender: new FormControl(MrPatientGenderEnum.Male),
  });

  get patientNumber() {
    return this.patientForm.get('patientNumber');
  }

  addPatient() {
    if (this.patientForm.valid) {
      const sex = this.patientForm.value.gender === 'Male' ? 1 : 2;

      const patient: MrAddPatientInterface = {
        number: this.patientForm.value.patientNumber!,
        dateOfBirth: this.patientForm.value.dateOfBirth!,
        sex: sex,
      };
      this.patientsService.addPatient(patient).subscribe({
        next: (response) => {
          this.patientForm.reset({
            patientNumber: '',
            dateOfBirth: new Date('1960-01-01').toISOString().substring(0, 10),
            gender: MrPatientGenderEnum.Male,
          });
        },
        error: (error) => {
          console.error('Error adding patient:', error);
        },
      });
    }
  }

  ngOnInit() {
    this.activeTabService.setActiveTab('newpatient');

    this.clinicsService.getAllClinics().subscribe((clinics) => {
      this.clinics = clinics;
    });

    this.patientsService.getAllPatients().subscribe((patients) => {
      this.patients = patients;
    });
  }
}
