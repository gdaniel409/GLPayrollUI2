// Spec file created by Codex.
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AncillaryHttpService } from './ancilliray.service';
import { APP_SETTINGS } from '../../../app.settings';
import { of } from 'rxjs';

@Injectable()
class TestAncillaryService extends AncillaryHttpService<{ id: number }> {
  apiString = 'test';
}

describe('AncillaryHttpService', () => {
  let service: TestAncillaryService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj<HttpClient>('HttpClient', ['get', 'post']);

    TestBed.configureTestingModule({
      providers: [
        TestAncillaryService,
        { provide: HttpClient, useValue: httpClientSpy },
        {
          provide: APP_SETTINGS,
          useValue: {
            getString: (value: string) => `http://localhost/${value}`,
          },
        },
      ],
    });

    service = TestBed.inject(TestAncillaryService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('refresh should fetch ancillary data and cache list', () => {
    httpClientSpy.get.and.returnValue(of([{ id: 1 }]));

    service.refresh(1).subscribe((data) => {
      expect(data).toEqual([{ id: 1 }]);
      expect(service.list).toEqual([{ id: 1 }]);
    });

    expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
    const [url, options] = httpClientSpy.get.calls.mostRecent().args as [string, any];
    expect(url).toBe('http://localhost/testgetancillary');
    expect(options?.params?.get('employeeId')).toBe('1');
  });

  it('postAncillary should return empty data without HTTP when array is empty', () => {
    service.postAncillary([], 1).subscribe((data) => {
      expect(data).toEqual([]);
    });
  });
});
