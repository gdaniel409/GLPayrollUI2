
import { RoleSelectedModel } from "./RoleSelectedModel";
import { UserModel } from "./UserModel";

export interface UserWithRolesModel extends UserModel{
 
    employeeId : number;
    roles : RoleSelectedModel[];
  
}