import {
  AfterViewInit,
  Component,
  inject,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { MrUserService } from '../services/mr-user-service';
import { MrUserRoleInterface } from '../interfaces/mr-user-role-interface';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MrSearch } from '../mr-search/mr-search';
import { MatIconModule } from '@angular/material/icon';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MrActiveTabService } from '../services/mr-active-tab-service';
import { MrEditUserRole } from '../mr-edit-user-role/mr-edit-user-role';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-mr-roles',
  imports: [
    MrSearch,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatSortModule,
  ],
  templateUrl: './mr-roles.html',
  styleUrl: './mr-roles.css',
})
export class MrRoles implements OnInit, AfterViewInit {
  private readonly userService = inject(MrUserService);
  private readonly activeTabService = inject(MrActiveTabService);
  readonly dialog = inject(MatDialog);
  private _liveAnnouncer = inject(LiveAnnouncer);

  dataSource = new MatTableDataSource<MrUserRoleInterface>([]);
  errorMessage = signal('');

  @ViewChild(MatPaginator)
  paginator: MatPaginator = new MatPaginator();
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'roleId',
    'roleName',
    'actions',
  ];

  @ViewChild(MatSort)
  sort: MatSort = new MatSort();

  getUsersRoles(text?: string) {
    this.userService.getUsersRoles(text).subscribe({
      next: (response) => {
        this.dataSource.data = response.body as MrUserRoleInterface[];
      },
      error: (err) => {
        this.errorMessage.set(err.message);
      },
    });
  }

  search(text: string) {
    this.getUsersRoles(text);
  }

  edit(user: MrUserRoleInterface) {
    this.editDialog(user);
  }
 

  editDialog(userRole: MrUserRoleInterface): void {
    const dialogRef = this.dialog.open(MrEditUserRole, {
      data: {
        id: userRole.id,
        firstName: userRole.firstName,
        lastName: userRole.lastName,
        roleId: userRole.roleId,
        roleName: userRole.roleName,
      },
      maxWidth: '700px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        this.getUsersRoles();
      }
    });
  }
  getMedicines() {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    this.activeTabService.setActiveTab('roles');
    this.getUsersRoles();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  sortingDataAccessor = (data: MrUserRoleInterface, sortHeaderId: string) => {
    if (sortHeaderId === 'id') {
      return data.id;
    } else if (sortHeaderId === 'firstName') {
      return data.firstName;
    } else if (sortHeaderId === 'lastName') {
      return data.lastName;
    } else if (sortHeaderId === 'roleId') {
      return data.roleId;
    } else if (sortHeaderId === 'roleName') {
      return data.roleName;
    }
    return '';
  };
}
