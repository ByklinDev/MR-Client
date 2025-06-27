import { Component } from '@angular/core';
import { MrSearch } from '../mr-search/mr-search';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MrResearchesInterface } from '../mr-researches-interface';

const ELEMENT_DATA_RESEARCHES: MrResearchesInterface[] = [
  {
    PatientNumber: '001-0005',
    DateOfBirth: new Date('2001-02-01'),
    LastVisitDate: new Date('2025-06-02'),
    Medicines: '213429. Amitriptiyline',
  },
  {
    PatientNumber: '001-0006',
    DateOfBirth: new Date('1989-05-10'),
    LastVisitDate: new Date('2025-04-02'),
    Medicines: '105324. Naproxen, 124845. Meloxicam',
  },
];

@Component({
  selector: 'app-mr-research',
  imports: [MrSearch, MatTableModule],
  templateUrl: './mr-research.html',
  styleUrl: './mr-research.css',
})
export class MrResearch {
  displayedColumns: string[] = [
    'PatientNumber',
    'DateOfBirth',
    'LastVisitDate',
    'Medicines',
  ];
  dataSource = new MatTableDataSource<MrResearchesInterface>(
    ELEMENT_DATA_RESEARCHES
  );
}
