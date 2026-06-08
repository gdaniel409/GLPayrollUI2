import { inject, Injectable } from '@angular/core';
import { UserModel } from '../../../models/UserModel';
import { HttpClient, HttpContext, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { APP_SETTINGS } from '../../../app.settings';
import { UserWithRolesModel } from '../../../models/UserWithRolesModel';
import { RoleSelectedModel } from '../../../models/RoleSelectedModel';

@Injectable({
  providedIn: 'root'
})
export class UserHttpService {
 
  http = inject(HttpClient);
  appSettings = inject(APP_SETTINGS);

  constructor(){}

  public getList() : Observable<UserModel[]>{

    const userModel : UserModel[] = [];
    return of(userModel);
    
  }

  public getAllRoles() : Observable<RoleSelectedModel> | undefined{

    const urlAddr : string = this.appSettings.getString("userdataforemployee");
    return this.http.get<RoleSelectedModel>(urlAddr);

  }
  
  public getUserDataForEmployee(employeeId : number) : Observable<UserWithRolesModel> | undefined{

    const urlAddr : string = this.appSettings.getString("userdataforemployee");

    let params = new HttpParams()
      .set('id', employeeId);
    
    return this.http.get<UserWithRolesModel>(urlAddr, {params});

  }

  public createUserDataForEmploye(userData : UserWithRolesModel) : Observable<UserWithRolesModel>{

    let urlAddr : string = this.appSettings.getString("saveuser");
    return this.http.post<UserWithRolesModel>(urlAddr,userData);

  }

  public updateUserDataForEmploye(userData : UserWithRolesModel) : Observable<UserWithRolesModel>{

    let urlAddr : string = this.appSettings.getString("updateuser");
    return this.http.post<UserWithRolesModel>(urlAddr,userData);

  }
}
