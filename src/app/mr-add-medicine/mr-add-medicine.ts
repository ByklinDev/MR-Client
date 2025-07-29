import {
  afterNextRender,
  Component,
  inject,
  Injector,
  model,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { MrMedicineTypeService } from '../services/mr-medicine-type-service';
import { MrMedicineSprInterface } from '../interfaces/mr-medicine-spr-interface';
import { MatSelectModule } from '@angular/material/select';
import { MrAddMedicineInterface } from '../interfaces/mr-add-medicine-interface';
import { MrDosageFormService } from '../services/mr-dosage-form-service';
import { MrMedicineContainerService } from '../services/mr-medicine-container-service';
import { MrMedicineService } from '../services/mr-medicine-service';

@Component({
  selector: 'app-mr-add-medicine',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
  ],
  templateUrl: './mr-add-medicine.html',
  styleUrl: './mr-add-medicine.css',
})
export class MrAddMedicine implements OnInit {
  private readonly mediineTypeService = inject(MrMedicineTypeService);
  private readonly dosageFormService = inject(MrDosageFormService);
  private readonly medicineContainerService = inject(
    MrMedicineContainerService
  );
  private readonly medicineService = inject(MrMedicineService);

  readonly dialogRef = inject(MatDialogRef<MrAddMedicine>);
  readonly data = inject<MrAddMedicineInterface>(MAT_DIALOG_DATA);

  medicineTypes: MrMedicineSprInterface[] = [];
  dosageForms: MrMedicineSprInterface[] = [];
  medicineContainers: MrMedicineSprInterface[] = [];

  readonly medicineTypeId = model(this.data.medicineTypeId);
  readonly dosageFormId = model(this.data.dosageFormId);
  readonly medicineContainerId = model(this.data.medicineContainerId);
  readonly expireAt = model<Date>(this.data.expireAt);
  readonly description = model(this.data.description);
  readonly amount = model(this.data.amount);

  add(): void {
    const medicineData: MrAddMedicineInterface = {
      description: this.description(),
      dosageFormId: this.dosageFormId(),
      medicineContainerId: this.medicineContainerId(),
      medicineTypeId: this.medicineTypeId(),
      amount: this.amount(),
      expireAt: this.expireAt(),
    };
    console.log(`Start for adding ${medicineData}`);
    this.medicineService.addMedicine(medicineData).subscribe({
      next: (response) => {
        this.dialogRef.close(response);
      },
      error: (error) => {
        console.error('Error adding medicine:', error);
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

  private _injector = inject(Injector);

  @ViewChild('autosize')
  autosize!: CdkTextareaAutosize;

  triggerResize() {
    // Wait for content to render, then trigger textarea resize.
    afterNextRender(
      () => {
        this.autosize.resizeToFitContent(true);
      },
      {
        injector: this._injector,
      }
    );
  }
}
