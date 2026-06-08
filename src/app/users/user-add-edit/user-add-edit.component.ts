import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleSelectComponent } from '../../core/controls/selection/roleselect/role-select-component/role-select-component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UserHttpService } from '../../core/services/UserService/user-service';
import { UserWithRolesModel } from '../../models/UserWithRolesModel';
import { Observable, of } from 'rxjs';
import { RoleSelectedModel } from '../../models/RoleSelectedModel';
import { RoleHttpService } from '../../core/services/roles/roleservice';

@Component({
  selector: 'app-user-add-edit',
  imports: [
    RoleSelectComponent,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule
  ],
  templateUrl: './user-add-edit.component.html',
  styleUrl: './user-add-edit.component.css'
})
export class UserAddEditComponent implements OnInit{

  employeeId : number = -1;
  employeeNumber: string | undefined;
  isAddMode : boolean = false;
  userId : number = -1;
  userFormGroup! : FormGroup;
  loading : boolean = false;

  roles$ : Observable<RoleSelectedModel[]> | undefined
  roles : RoleSelectedModel[] = [];

  @ViewChild('roleSelect') roleSelectComponentRef!: RoleSelectComponent | undefined;

  constructor(private readonly route: ActivatedRoute,
    private readonly formBuilder: FormBuilder,
    private readonly httpUsers: UserHttpService,
    private readonly httpRoles: RoleHttpService,
    private readonly router: Router,
    
  ){}

  ngOnInit(): void {

    this.employeeId = Number(this.route.snapshot.params['id']);
    this.employeeNumber = this.route.snapshot.params['employeeNumber'];
    this.userId = this.route.snapshot.params["userId"];
   
    this.userFormGroup = this.formBuilder.group({

      username: [''],
      password: [''],
      confirmpassword: [''],

    })

    if(this.userId == -1){
      this.isAddMode = true;

      this.httpRoles.getAllRolesNonSelected()?.subscribe({
        next:(data)=>{

          this.roles = data;
          this.roles$ = of(data);

        }
      })
    }else{
      this.isAddMode = false;
      this.httpUsers.getUserDataForEmployee(this.employeeId)?.subscribe({
          next: (data)=>{
           
            this.roles = data.roles;
            this.roles$ = of(data.roles);
            this.userFormGroup.patchValue(data);

          }
        })
      }

    this.userFormGroup.reset();
    
  }
  
  onSubmit(){

    if(this.userFormGroup===undefined || this.userFormGroup.invalid){
      
        alert("The form is invalid.");
        return;
    }

    if(!this.userFormGroup.dirty){
        alert("No changes have been detected");
        return;
    }

    let pwd : string = this.userFormGroup.value.password;
    
    if(pwd !== undefined && pwd !== ""){
      
      let cpwd : string = this.userFormGroup.value.username;
   
      if(pwd !== cpwd){
        alert("Password and confirm password fields must match.");
      }
    }

    this.loading = true;

    if(this.isAddMode){
      this.createUser();
    }else{
      this.updateUser();
    }

  }

  createUser(){

    let pwd : String = this.userFormGroup.value.password;
    let cpwd : String = this.userFormGroup.value.username;
   
    let selectedRoles = this.roleSelectComponentRef?.selectedRoles();
    let userRolesModel : UserWithRolesModel = {

      employeeId: this.employeeId,
      password: this.userFormGroup.value.password,
      username: this.userFormGroup.value.username,
      roles: selectedRoles!,
      id: -1,
    };

    this.httpUsers.createUserDataForEmploye(userRolesModel).subscribe({
      next: (data)=>{
        this.loading = false;
        this.userFormGroup.reset();
        this.router.navigate(['/listemployees']);
      }
    })

  }

  updateUser(){

    let selectedRoles = this.roleSelectComponentRef?.selectedRoles();

    const userWithRoles : UserWithRolesModel = {

      id: this.userId,
      employeeId: this.employeeId,
      roles : selectedRoles!,
      username : this.userFormGroup.value.username,
      password : this.userFormGroup.value.password,
      
    }

    this.httpUsers.updateUserDataForEmploye(userWithRoles).subscribe({
      next: (data=>{
        this.loading = false;
        this.userFormGroup.reset();
        this.router.navigate(['/listemployees']);
      })
    })

  }


}
