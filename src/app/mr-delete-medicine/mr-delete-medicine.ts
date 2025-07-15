import { Component, inject, model, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MrEditMedicineInterface } from '../interfaces/mr-edit-medicine-interface';
import { MrMedicineSprInterface } from '../interfaces/mr-medicine-spr-interface';
import { MrDosageFormService } from '../services/mr-dosage-form-service';
import { MrMedicineContainerService } from '../services/mr-medicine-container-service';
import { MrMedicineService } from '../services/mr-medicine-service';
import { MrMedicineTypeService } from '../services/mr-medicine-type-service';

@Component({
  selector: 'app-mr-delete-medicine',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDatepickerModule,
    ReactiveFormsModule,
  ],
  templateUrl: './mr-delete-medicine.html',
  styleUrl: './mr-delete-medicine.css',
})
export class MrDeleteMedicine  implements OnInit {
  readonly dialogRef = inject(MatDialogRef<MrDeleteMedicine>);
  readonly data = inject<MrEditMedicineInterface>(MAT_DIALOG_DATA);

  private readonly mediineTypeService = inject(MrMedicineTypeService);
  private readonly dosageFormService = inject(MrDosageFormService);
  private readonly medicineContainerService = inject(
    MrMedicineContainerService
  );

  private readonly medicineService = inject(MrMedicineService);

  readonly id = model(this.data.id);
  readonly description = model(this.data.description);
  readonly dosageFormId = model(this.data.dosageFormId);
  readonly medicineContainerId = model(this.data.medicineContainerId);
  readonly medicineTypeId = model(this.data.medicineTypeId);
  readonly expireAt = model(
    new Date(this.data.expireAt).toISOString().substring(0, 10)
  );
  readonly amount = model(this.data.amount);
  readonly state = model(this.data.state);

  medicineTypes: MrMedicineSprInterface[] = [];
  dosageForms: MrMedicineSprInterface[] = [];
  medicineContainers: MrMedicineSprInterface[] = [];

  delete() {
    this.medicineService.deleteMedicine(this.id()).subscribe({
      next: () => {
        this.dialogRef.close(true);
      },
      error: (error) => {
        console.error('Error deleting medicine:', error);
      },
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }


  ngOnInit(): void {
      this.mediineTypeService.getAllMedicineTypes().subscribe((types) => {
        this.medicineTypes = types;
      });
      this.dosageFormService.getAllDosageForms().subscribe((forms) => {
        this.dosageForms = forms;
      });
      this.medicineContainerService
        .getAllMedicineContainers()
        .subscribe((containers) => {
          this.medicineContainers = containers;
        });
  
      
}
}
