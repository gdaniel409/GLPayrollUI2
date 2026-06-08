// Spec file created by Codex.
import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { EmployeeStatusService } from './employee-status';
import { APP_SETTINGS } from '../../../app.settings';

describe('EmployeeStatusService', () => {
  let service: EmployeeStatusService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj<HttpClient>('HttpClient', ['get']);

    TestBed.configureTestingModule({
      providers: [
        EmployeeStatusService,
        { provide: HttpClient, useValue: httpClientSpy },
        { provide: APP_SETTINGS, useValue: { getString: () => 'http://localhost/employeestatuses' } },
      ],
    });
    service = TestBed.inject(EmployeeStatusService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('initializeLookupData should retrieve statuses and cache them', () => {
    httpClientSpy.get.and.returnValue(of([{ id: 1, statusName: 'Active' } as any]));

    service.initializeLookupData().subscribe((data) => {
      expect(data).toEqual([{ id: 1, statusName: 'Active' } as any]);
      expect(service.downloaded).toBeTrue();
      expect(service.employeeStatuses.length).toBe(1);
    });

    expect(httpClientSpy.get).toHaveBeenCalledOnceWith('http://localhost/employeestatuses');
  });

  it('getEmployeeStatus should return the expected entry after download', () => {
    service.employeeStatuses = [{ id: 1, statusName: 'Active' } as any];
    service.downloaded = true;
    expect(service.getEmployeeStatus(1)).toEqual({ id: 1, statusName: 'Active' } as any);
  });
});
