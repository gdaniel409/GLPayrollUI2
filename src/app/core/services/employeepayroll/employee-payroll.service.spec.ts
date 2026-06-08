// Spec file created by Codex.
import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { EmployeePayrollHttpService } from './employee-payroll.service';
import { APP_SETTINGS } from '../../../app.settings';

describe('EmployeePayrollHttpService', () => {
  let service: EmployeePayrollHttpService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj<HttpClient>('HttpClient', ['get']);

    TestBed.configureTestingModule({
      providers: [
        EmployeePayrollHttpService,
        { provide: HttpClient, useValue: httpClientSpy },
        {
          provide: APP_SETTINGS,
          useValue: {
            getString: (value: string) => `http://localhost/${value}`,
          },
        },
      ],
    });

    service = TestBed.inject(EmployeePayrollHttpService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should request the payroll list when getList is called', () => {
    httpClientSpy.get.and.returnValue(of([{ id: 1, ssn: '123456789' } as any]));

    service.getList().subscribe((items) => {
      expect(items.length).toBe(1);
      expect(items[0].id).toBe(1);
      expect(service.list.length).toBe(1);
    });

    expect(httpClientSpy.get).toHaveBeenCalledOnceWith('http://localhost/employeemodellist');
  });
});
