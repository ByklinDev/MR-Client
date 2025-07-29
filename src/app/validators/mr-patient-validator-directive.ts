import { Directive, inject, Injectable, forwardRef } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  NG_ASYNC_VALIDATORS,
  ValidationErrors,
} from '@angular/forms';
import { MrClinicInterface } from '../interfaces/mr-clinic-interface';
import { MrClinicService } from '../services/mr-clinic-service';
import { MrPatientService } from '../services/mr-patient-service';
import { MrPatientInterface } from '../interfaces/mr-patient-interface';
import { Observable } from 'rxjs';
import { MrQueryInterface } from '../interfaces/mr-query-interface';

@Injectable({ providedIn: 'root' })
export class PatientNumberValidator implements AsyncValidator {
  private clinicService = inject(MrClinicService);
  private patientService = inject(MrPatientService);
  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const value = control.value;
    const clinicId = Number(value.split('-')[0]);
    const patientNumber = value.split('-')[1];
    if (!clinicId || !patientNumber) {
      return this.createInvalidFormatError();
    }
    if (isNaN(clinicId) || isNaN(Number(patientNumber))) {
      return this.createInvalidFormatError();
    }
    if (value.length !== 8) {
      return this.createInvalidFormatError();
    }

    if (clinicId <= 0 || Number(patientNumber) <= 0) {
      return this.createInvalidFormatError();
    }
    return new Observable((observer) => {
      this.clinicService
        .getAllClinics()
        .subscribe((clinics) => {
          const clinicExists = clinics.body?.some((clinic) => clinic.id === clinicId);
          if (!clinicExists) {
            observer.next({ invalidClinic: true });
            observer.complete();
            return;
          }

          this.patientService
            .getAllPatients()
            .subscribe((patients: MrPatientInterface[]) => {
              const patientExists = patients.some(
                (patient) => patient.number === value
              );
              if (patientExists) {
                observer.next({ patientExists: true });
              } else {
                observer.next(null);
              }
              observer.complete();
            });
        });
    });
  }

  createInvalidFormatError(): Observable<ValidationErrors | null> {
    return new Observable((observer) => {
      observer.next({ invalidFormat: true });
      observer.complete();
    });
  }
}

@Directive({
  selector: '[appMrPatientValidatorDirective]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: forwardRef(() => MrPatientValidatorDirective),
      multi: true,
    },
  ],
})
export class MrPatientValidatorDirective implements AsyncValidator {
  private readonly validator = inject(PatientNumberValidator);

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.validator.validate(control);
  }
}
