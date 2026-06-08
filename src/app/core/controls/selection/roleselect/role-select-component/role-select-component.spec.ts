// Spec file created by Codex.
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RoleSelectComponent } from './role-select-component';
import { RoleHttpService } from '../../../../services/roles/roleservice';

class MockRoleHttpService {}

describe('RoleSelectComponent', () => {
  let component: RoleSelectComponent;
  let fixture: ComponentFixture<RoleSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoleSelectComponent],
      providers: [{ provide: RoleHttpService, useClass: MockRoleHttpService }],
    }).compileComponents();

    fixture = TestBed.createComponent(RoleSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('handleSelectionChange should update selected flag', () => {
    component.roles = [{ id: 1, selected: false, roleName: 'Admin' } as any];
    component.handleSelectionChange({ checked: true }, 1);
    expect(component.roles[0].selected).toBeTrue();
  });

  it('selectedRoles should return current roles', () => {
    component.roles = [{ id: 1, selected: true, roleName: 'Admin' } as any];
    expect(component.selectedRoles()).toEqual(component.roles);
  });
});
