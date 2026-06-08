// Spec file created by Codex.
import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { RateTypeService } from './rate-type';
import { APP_SETTINGS } from '../../../app.settings';

describe('RateTypeService', () => {
  let service: RateTypeService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj<HttpClient>('HttpClient', ['get']);

    TestBed.configureTestingModule({
      providers: [
        RateTypeService,
        { provide: HttpClient, useValue: httpClientSpy },
        { provide: APP_SETTINGS, useValue: { getString: () => 'http://localhost/ratetypes' } },
      ],
    });
    service = TestBed.inject(RateTypeService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('initializeLookupData should fetch data and cache it', () => {
    httpClientSpy.get.and.returnValue(of([{ id: 1, rateName: 'Hourly' } as any]));

    service.initializeLookupData().subscribe((data) => {
      expect(data).toEqual([{ id: 1, rateName: 'Hourly' } as any]);
      expect(service.downloaded).toBeTrue();
      expect(service.rateTypes.length).toBe(1);
    });

    expect(httpClientSpy.get).toHaveBeenCalledOnceWith('http://localhost/ratetypes');
  });

  it('getRateType should return the selected rate type after download', () => {
    service.rateTypes = [{ id: 1, rateName: 'Hourly' } as any];
    service.downloaded = true;
    expect(service.getRateType(1)).toEqual({ id: 1, rateName: 'Hourly' } as any);
  });
});
