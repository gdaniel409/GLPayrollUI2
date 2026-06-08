import { Component, inject, Input, OnInit } from '@angular/core';
import { RoleHttpService } from '../../../../services/roles/roleservice';
import { Observable } from 'rxjs';
import { RoleSelectedModel } from '../../../../../models/RoleSelectedModel';
import { AsyncPipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-role-select-component',
  imports: [
    AsyncPipe,
    MatTableModule,
    MatCheckboxModule,
  ],
  templateUrl: './role-select-component.html',
  styleUrl: './role-select-component.css'
})
export class RoleSelectComponent{

 // n : number | undefined;

  @Input() employeeId: number | undefined; 
  @Input() employeeNumber: string | undefined; 
  @Input() userId: number | undefined; 
  @Input() roles$: Observable<RoleSelectedModel[]> | undefined;
  @Input() roles : RoleSelectedModel[] = [];
  
  columnNames = ['select', 'rolename'];

  http = inject(RoleHttpService);
  
//   getNumber()  : number | undefined{
//   return this.n;
//  }
  handleSelectionChange(event : any, id : number){

   let checked = this.roles.find(u=>u.id === id);

   if(checked !== undefined){
    checked.selected = event.checked ?? false;
   }
  
  }

  selectedRoles() : RoleSelectedModel[] | undefined{
 
    return this.roles;

  }

}


