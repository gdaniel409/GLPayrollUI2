// Spec file created by Codex.
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserAddEditComponent } from './user-add-edit.component';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserHttpService } from '../../core/services/UserService/user-service';
import { RoleHttpService } from '../../core/services/roles/roleservice';
import { of } from 'rxjs';

class MockUserHttpService {
  createUserDataForEmploye() {
    return of({});
  }
  updateUserDataForEmploye() {
    return of({});
  }
  getUserDataForEmployee() {
    return of({ roles: [], username: '', password: '' });
  }
}

class MockRoleHttpService {
  getAllRolesNonSelected() {
    return of([{ id: 1, roleName: 'Admin', selected: false }]);
  }
}

class MockRouter {
  navigate = jasmine.createSpy('navigate');
}

describe('UserAddEditComponent', () => {
  let component: UserAddEditComponent;
  let fixture: ComponentFixture<UserAddEditComponent>;
  let router: MockRouter;

  beforeEach(async () => {
    router = new MockRouter();

    await TestBed.configureTestingModule({
      imports: [UserAddEditComponent, ReactiveFormsModule, FormsModule],
      providers: [
        FormBuilder,
        { provide: ActivatedRoute, useValue: { snapshot: { params: { id: '1', employeeNumber: 'E1', userId: '-1' } } } },
        { provide: Router, useValue: router },
        { provide: UserHttpService, useClass: MockUserHttpService },
        { provide: RoleHttpService, useClass: MockRoleHttpService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set add mode on init', () => {
    expect(component.isAddMode).toBeTrue();
    expect(component.roles?.length).toBe(1);
  });

  it('onSubmit should show no changes alert when form is pristine', () => {
    spyOn(window, 'alert');
    component.onSubmit();
    expect(window.alert).toHaveBeenCalledWith('No changes have been detected');
  });
});
