// Spec file created by Codex.
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { APP_SETTINGS } from '../../app.settings';
import { EmployeePayrollHttpService } from '../../core/services/employeepayroll/employee-payroll.service';
import { EmployeeDetailComponent } from './employee-detail.component';

describe('EmployeeDetailComponent', () => {
  let component: EmployeeDetailComponent;
  let fixture: ComponentFixture<EmployeeDetailComponent>;

  class MockEmployeePayrollHttpService {
    getItem(id: number) {
      return of({
        id,
        employeeNumber: 'E1',
        firstName: 'First',
        lastName: 'Last',
        middleName: '',
        email: 'test@example.com',
        dateHired: '',
        dateTerminated: '',
        ssn: '1234',
        telephoneLandline: '',
        telephoneCell: '',
        rate: '',
        employeeStatus: { id: 1, status: 'Active' },
        rateType: { id: 1, type: 'Hourly' },
        companyID: 1,
        documentCount: 0,
        userId: 0,
      } as any);
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeDetailComponent],
      providers: [
        provideHttpClient(),
        provideRouter([]),
        {
          provide: APP_SETTINGS,
          useValue: {
            getString: (value: string) => `http://localhost/${value}`,
          },
        },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { params: { id: '1' } } },
        },
        {
          provide: EmployeePayrollHttpService,
          useClass: MockEmployeePayrollHttpService,
        },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
