import {
  AfterViewInit,
  Component,
  inject,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { MrSearch } from '../mr-search/mr-search';
import { MrClinicInterface } from '../interfaces/mr-clinic-interface';
import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MrAddClinic } from '../mr-add-clinic/mr-add-clinic';
import { MrClinicService } from '../services/mr-clinic-service';
import { MatIconModule } from '@angular/material/icon';
import { MrEditClinic } from '../mr-edit-clinic/mr-edit-clinic';
import { MatSortModule, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort } from '@angular/material/sort';
import { MrActiveTabService } from '../services/mr-active-tab-service';
import { MrPaginatorInterface } from '../interfaces/mr-paginator-interface';
import { sign } from 'crypto';
import { MrQueryInterface } from '../interfaces/mr-query-interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mr-clinics',
  imports: [
    MrSearch,
    MatPaginatorModule,
    MatTableModule,
    MatIconModule,
    MatSortModule,
    FormsModule,
  ],
  templateUrl: './mr-clinics.html',
  styleUrl: './mr-clinics.css',
})
export class MrClinics implements AfterViewInit, OnInit {
  private readonly clinicService = inject(MrClinicService);
  private readonly activeTabService = inject(MrActiveTabService);

  private _liveAnnouncer = inject(LiveAnnouncer);

  dataSource = new MatTableDataSource<MrClinicInterface>();

  totalPages = signal(0);
  currentPage = signal(1);
  pageSize = signal(5);
  totalCount = signal(0);
  hasNext = signal<boolean>(false);
  hasPrevious = signal<boolean>(false);
  
  isAscending = signal<boolean>(false);
  searchTerm = signal('');
  sortColumn = signal('');

//  @ViewChild(MatPaginator)
//  paginator: MatPaginator = new MatPaginator();
  displayedColumns: string[] = [
    'id',
    'name',
    'city',
    'addressOne',
    'addressTwo',
    'phone',
    'actions',
  ];

  @ViewChild(MatSort)
  sort: MatSort = new MatSort();

  pageSizeOptions: number[] = [5, 7, 8, 10];
  ngAfterViewInit() {
  //  this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getClinics() {
    const query: MrQueryInterface = {
      take: this.pageSize(),
      skip: this.currentPage(),
      isAscending: this.isAscending(),
      searchTerm: this.searchTerm(),
      sortColumn: this.sortColumn(),
    };
    this.clinicService.getAllClinics(query).subscribe({
      next: (data) => {
        this.dataSource.data = data.body as MrClinicInterface[];
        const xpaginator = data.headers.get('X-Pagination');
        if (xpaginator) {
          const paginator = this.convertStringToJson(xpaginator);
          if (paginator !== undefined) {
            this.totalCount.set(paginator.TotalCount);
            this.pageSize.set(paginator.PageSize);
            this.currentPage.set(paginator.CurrentPage);
            this.hasNext.set(paginator.HasNext);
            this.hasPrevious.set(paginator.HasPrevious);
            this.totalPages.set(paginator.TotalPages);
          }
        }
      },
      error: (err) => {
        console.error('Error fetching clinics:', err);
      },
    });
  }
  edit(clinic: MrClinicInterface) {
    this.editDialog(clinic);
  }
  ngOnInit(): void {
    this.getClinics();

    this.activeTabService.setActiveTab('clinic');
  }
  readonly dialog = inject(MatDialog);

  addDialog(): void {
    const dialogRef = this.dialog.open(MrAddClinic, {
      data: { name: '', city: '', phone: '', addressone: '', addresstwo: '' },
      maxWidth: '700px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        this.getClinics();
      }
    });
  }

  editDialog(clinic: MrClinicInterface): void {
    const dialogRef = this.dialog.open(MrEditClinic, {
      data: {
        id: clinic.id,
        name: clinic.name,
        city: clinic.city,
        phone: clinic.phone,
        addressOne: clinic.addressOne,
        addressTwo: clinic.addressTwo,
      },
      maxWidth: '700px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        this.getClinics();
      }
    });
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  search(text: string) {
    this.clinicService.getClinics(text).subscribe({
      next: (data) => {
        this.dataSource.data = data.body as MrClinicInterface[];
      },
      error: (error) => {
        console.error('Error fetching clinics:', error);
      },
    });
  }

  convertStringToJson(jsonString: string): MrPaginatorInterface | undefined {
    try {
      return JSON.parse(jsonString) as MrPaginatorInterface;
    } catch (error) {
      console.error('Invalid JSON string:', error);
      return undefined;
    }
  }



  nextPage() {
    if (this.currentPage() <= this.totalPages() - 1) {
      this.currentPage.set(this.currentPage() + 1 );
      this.getClinics();
    }
  }

  previousPage() {
    if (this.currentPage() > 1) {
      this.currentPage.set(this.currentPage() - 1);
      this.getClinics();
    }
  }


   onPageSizeChange() {
    this.currentPage.set(1); // Reset to the first page
    this.getClinics();
  }

}
