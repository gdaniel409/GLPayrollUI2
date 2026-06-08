import {inject, Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { RoleSelectedModel } from '../../../models/RoleSelectedModel';
import { HttpClient, HttpParams } from '@angular/common/http';
import { APP_SETTINGS } from '../../../app.settings';
import { RoleModel } from '../../../models/RoleModel';

@Injectable({
  providedIn: 'root'
})
export class RoleHttpService {
  
  public apiString: string = "";
    
  roles : RoleSelectedModel[] = [];
  http = inject(HttpClient);
  appSettings = inject(APP_SETTINGS);

  getAllRolesNonSelected() :  Observable<RoleSelectedModel[]> | undefined{

    let urlAddr : string = this.appSettings.getString("rolelistnonselected");

    return this.http.get<RoleModel[]>(urlAddr).pipe(
      map(roles=>{

          let rolesSelected : RoleSelectedModel[] = [];

          for(const role of roles){

              let roleSelected : RoleSelectedModel ={
                selected : false,
                roleName : role.roleName,
                id : role.id,
              }

              rolesSelected.push(roleSelected);

            }

            return rolesSelected;
          })

        )}

  initializeLookupData(userId : number | undefined) : Observable<RoleSelectedModel[]> | undefined{
      
    if(userId == undefined){
      return;
    }

    let urlAddr : string = this.appSettings.getString("rolelistselected");;

    let params = new HttpParams()
      .set('userId', userId);
      
    return this.http.get<RoleSelectedModel[]>(urlAddr, {params}).pipe(
      tap(data => {
        this.roles = data;
       
        })
      );

  }

}
