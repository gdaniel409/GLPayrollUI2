// Spec file created by Codex.
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployeeStatusesComponent } from './employee-statuses.component';
import { EmployeeStatusService } from '../../../services/employeestatus/employee-status';
import { of } from 'rxjs';

class MockEmployeeStatusService {
  initializeLookupData() {
    return of([{ id: 1, employeeStatus: 'Active' }]);
  }
}

describe('EmployeeStatusesComponent', () => {
  let component: EmployeeStatusesComponent;
  let fixture: ComponentFixture<EmployeeStatusesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeStatusesComponent],
      providers: [{ provide: EmployeeStatusService, useClass: MockEmployeeStatusService }],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeStatusesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize employeeStatuses$ on init', () => {
    component.employeeStatuses$?.subscribe((data) => {
      expect(data.length).toBe(1);
      expect(data[0].id).toBe(1);
    });
  });

  it('compare should return true when values match', () => {
    expect(component.compare('1', 1)).toBeTrue();
  });
});
