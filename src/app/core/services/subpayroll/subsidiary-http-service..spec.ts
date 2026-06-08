// Spec file created by Codex.
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { SubsidiaryHttpService } from './subsidiary-http-service.';
import { APP_SETTINGS } from '../../../app.settings';

@Injectable()
class TestSubsidiaryService extends SubsidiaryHttpService<{ id: number }> {
  apiString = 'test';
  downloaded = false;
}

describe('SubsidiaryHttpService', () => {
  let service: TestSubsidiaryService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj<HttpClient>('HttpClient', ['get']);

    TestBed.configureTestingModule({
      providers: [
        TestSubsidiaryService,
        { provide: HttpClient, useValue: httpClientSpy },
        {
          provide: APP_SETTINGS,
          useValue: {
            getString: (value: string) => `http://localhost/${value}`,
          },
        },
      ],
    });

    service = TestBed.inject(TestSubsidiaryService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('getList should fetch data and update the list', () => {
    httpClientSpy.get.and.returnValue(of([{ id: 1 }]));

    service.getList().subscribe((data) => {
      expect(data).toEqual([{ id: 1 }]);
      expect(service.list.length).toBe(1);
      expect(service.downloaded).toBeTrue();
    });

    expect(httpClientSpy.get).toHaveBeenCalledOnceWith('http://localhost/testlist');
  });

  it('getItem should return item from cached list when downloaded', () => {
    service.list = [{ id: 1 }];
    service.downloaded = true;

    service.getItem(1)?.subscribe((item) => {
      expect(item).toEqual({ id: 1 });
    });
  });
});
