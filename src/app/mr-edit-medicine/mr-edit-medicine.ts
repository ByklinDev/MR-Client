import {
  afterNextRender,
  Component,
  inject,
  Injector,
  model,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { MrMedicineService } from '../services/mr-medicine-service';
import { MrMedicineTypeService } from '../services/mr-medicine-type-service';
import { MrDosageFormService } from '../services/mr-dosage-form-service';
import { MrMedicineContainerService } from '../services/mr-medicine-container-service';
import { MrMedicineSprInterface } from '../interfaces/mr-medicine-spr-interface';
import { MrEditMedicineInterface } from '../interfaces/mr-edit-medicine-interface';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MrMedicineStateEnum } from '../enums/mr-medicine-state-enum';
import { MrMedicineStatePipe } from '../pipes/mr-medicine-state-pipe';

@Component({
  selector: 'app-mr-edit-medicine',
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
    MrMedicineStatePipe,
  ],
  templateUrl: './mr-edit-medicine.html',
  styleUrl: './mr-edit-medicine.css',
})
export class MrEditMedicine implements OnInit {
  readonly dialogRef = inject(MatDialogRef<MrEditMedicine>);
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
  states = Object.values(MrMedicineStateEnum);

  edit(): void {
    const medicineData: MrEditMedicineInterface = {
      id: this.id(),
      description: this.description(),
      dosageFormId: this.dosageFormId(),
      medicineContainerId: this.medicineContainerId(),
      medicineTypeId: this.medicineTypeId(),
      amount: this.amount(),
      expireAt: this.expireAt(),
      state: this.state(),
    };

    this.medicineService.editMedicine(medicineData).subscribe({
      next: (response) => {
        this.dialogRef.close(response);
      },
      error: (error) => {
        console.error('Error editing medicine:', error);
      },
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
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

    this.states = Object.values(MrMedicineStateEnum).filter(
      (value) => typeof value === 'number'
    ) as MrMedicineStateEnum[];
  }
}
