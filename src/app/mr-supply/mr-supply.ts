import { Component, model, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MrClinicInterface } from '../interfaces/mr-clinic-interface';
import { MrClinicStockMedicineInterface } from '../mr-clinic-stock-medicine-interface';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

const ELEMENT_DATA_SUPPLY: MrClinicStockMedicineInterface[] = [
  {
    MedicineId: 1,
    Description: 'Aspirin',
    Amount: 10,
    ClinicId: 1,
    ClinicName: 'Clinic 1',
  },
  {
    MedicineId: 2,
    Description: 'Clonazepam',
    Amount: 5,
    ClinicId: 1,
    ClinicName: 'Clinic 1',
  },
];

@Component({
  selector: 'app-mr-supply',
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    MatTableModule,
  ],
  templateUrl: './mr-supply.html',
  styleUrl: './mr-supply.css',
})
export class MrSupply {
  amount = model(1);
  clinics: MrClinicInterface[] = [
    {
      id: 1,
      name: 'Clinic 1',
      city: 'Minsk',
      addressOne: 'Lenina, 25',
      addressTwo: 'Masherova, 10',
      phone: '+3751755266569',
    },
    {
      id: 2,
      name: 'Clinic 2',
      city: 'Mogilev',
      addressOne: 'Lenina, 20',
      addressTwo: 'Masherova, 16',
      phone: '+3751555266569',
    },
    {
      id: 3,
      name: 'Clinic 3',
      city: 'Grodno',
      addressOne: 'Lenina, 15',
      addressTwo: 'Masherova, 69',
      phone: '+3751655266569',
    },
  ];

  stockMedicines: MrClinicStockMedicineInterface[] = [
    {
      MedicineId: 1,
      Description: 'Aspirin',
      Amount: 10,
      ClinicId: 1,
      ClinicName: 'Clinic 1',
    },
    {
      MedicineId: 2,
      Description: 'Clonazepam',
      Amount: 5,
      ClinicId: 1,
      ClinicName: 'Clinic 1',
    },
  ];

  displayedColumns: string[] = [
    'MedicineId',
    'Description',
    'Amount',
    'ClinicId',
    'ClinicName',
  ];
  dataSource = new MatTableDataSource<MrClinicStockMedicineInterface>(
    this.stockMedicines
  );
}
