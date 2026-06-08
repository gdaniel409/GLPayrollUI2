// Spec file created by Codex.
import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { RoleHttpService } from './roleservice';
import { APP_SETTINGS } from '../../../app.settings';

describe('RoleHttpService', () => {
  let service: RoleHttpService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj<HttpClient>('HttpClient', ['get']);

    TestBed.configureTestingModule({
      providers: [
        RoleHttpService,
        { provide: HttpClient, useValue: httpClientSpy },
        {
          provide: APP_SETTINGS,
          useValue: {
            getString: (value: string) => `http://localhost/${value}`,
          },
        },
      ],
    });

    service = TestBed.inject(RoleHttpService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('getAllRolesNonSelected should map roles to RoleSelectedModel', () => {
    httpClientSpy.get.and.returnValue(of([{ id: 1, roleName: 'Admin' }]));

    service.getAllRolesNonSelected()?.subscribe((data) => {
      expect(data[0].id).toBe(1);
      expect(data[0].roleName).toBe('Admin');
      expect(data[0].selected).toBeFalse();
    });

    expect(httpClientSpy.get).toHaveBeenCalledOnceWith('http://localhost/rolelistnonselected');
  });

  it('initializeLookupData should return undefined when userId is undefined', () => {
    expect(service.initializeLookupData(undefined)).toBeUndefined();
  });
});
