import { IID } from "./IID";

export interface UserModel extends IID{
 
    username : string | undefined;
    password : string | undefined;
   
  
}