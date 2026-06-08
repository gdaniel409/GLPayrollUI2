import { ResolveFn } from '@angular/router';
import { UserHttpService } from '../../core/services/UserService/user-service';
import { inject } from '@angular/core';
import { UserModel } from '../../models/UserModel';

export const userResolver: ResolveFn<UserModel[]> = (route, state) => {
  try
  {
    const http = inject(UserHttpService)
    return http.getList();
  }
  catch (error)
  {
    console.error('Error fetching employee data:', error);
    return [];
  }

};
