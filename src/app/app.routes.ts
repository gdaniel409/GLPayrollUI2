
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EmployeeListComponent } from './employees/employee-list/employee-list.component';
import { EmployeeAddEditComponent } from './employees/employee-add-edit/employee-add-edit.component';

import { NotImplementedComponent } from './not-implemented/not-implemented.component';
import { EmployeeDetailComponent } from './employees/eployee-detail/employee-detail.component';
import { DocumentsListComponent } from './documents/documents-list/documents-list';
import { documentlistResolver } from './navigation/resolvers/documentlist-resolver';
import { DocumentCreateComponent } from './documents/document-create/document-create';
import { documentGuard } from './core/guards/document-guard';
import { employeeGuard } from './core/guards/employee-guard';
import { ForbiddenComponent } from './forbidden/forbidden/forbiddencomponent';
import { employeeResolver } from './navigation/resolvers/employee-resolver';
import { UserAddEditComponent } from './users/user-add-edit/user-add-edit.component';
import { userGuard } from './core/guards/user-guard';
import { userResolver } from './navigation/resolvers/user-resolver-resolver';
import { UserListComponent } from './users/user-list/user-list';

export const routes: Routes = [
    
    {
      path: 'home',
      title: 'Home',
      component: HomeComponent
    },
    {
      path: 'notimplemented',
      title: 'Not Implemented',
      component: NotImplementedComponent
    },
    {
      path: 'forbidden',
      title: 'Forbidden',
      component: ForbiddenComponent
    },
    {
      path: 'documents/:id/:employeeNumber',
      title: 'Documents',
      component:DocumentsListComponent,
      canActivate: [documentGuard],
      resolve: {
        documents: documentlistResolver
      }
    },
    {
      path: 'documentsadd/:employeeId/:employeeNumber',
      title: 'Documents',
      component:DocumentCreateComponent,
      canActivate: [documentGuard],
      
    },
    {
      path: 'listemployees',
      title: 'Employees List',
      component: EmployeeListComponent,
      canActivate: [employeeGuard],
      
      resolve: {
        employees: employeeResolver
      }

    },
    {
      path: 'employee-add-edit',
      title: 'Employee Add/Edit',
      component: EmployeeAddEditComponent,
      canActivate: [employeeGuard],
 
    },
    {
      path: 'employee-add-edit/:id',
      title: 'Employee Add/Edit',
      component: EmployeeAddEditComponent,
      canActivate: [employeeGuard],

    },
    {
      path: 'employeedetail/:id',
      title: 'Employee Detail',
      component: EmployeeDetailComponent,
      canActivate: [employeeGuard],

    },
    {
      path: "listusers",
      title: "List Users",
      component: UserListComponent,
      canActivate: [userGuard],
      resolve: {
        users: userResolver
      }
    },
    {
      path: 'user-add-edit/:id/:employeeNumber/:userId',
      title: 'User Add/Edit',
      component: UserAddEditComponent,
      canActivate: [userGuard],

    },
    { path: '', redirectTo: 'home', pathMatch: 'full'},
    { path: '**', redirectTo: 'home' }

  ];