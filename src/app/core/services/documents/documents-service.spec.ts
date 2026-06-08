// Spec file created by Codex.
import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { DocumentsHttpService } from './documents-service';
import { APP_SETTINGS } from '../../../app.settings';

describe('DocumentsHttpService', () => {
  let service: DocumentsHttpService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj<HttpClient>('HttpClient', ['get']);

    TestBed.configureTestingModule({
      providers: [
        DocumentsHttpService,
        { provide: HttpClient, useValue: httpClientSpy },
        {
          provide: APP_SETTINGS,
          useValue: { getString: () => 'http://localhost/documents' },
        },
      ],
    });

    service = TestBed.inject(DocumentsHttpService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('getList should return documents and update list', () => {
    httpClientSpy.get.and.returnValue(of([{ id: 1 } as any]));

    service.getList(5).subscribe((data) => {
      expect(data).toEqual([{ id: 1 } as any]);
      expect(service.list).toEqual([{ id: 1 } as any]);
    });

    expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
    const [url, options] = httpClientSpy.get.calls.mostRecent().args as [string, any];
    expect(url).toBe('http://localhost/documents');
    expect(options?.params?.get('employeeId')).toBe('5');
  });

  it('getDocument should call GET with blob responseType', () => {
    const blob = new Blob();
    httpClientSpy.get.and.returnValue(of(blob));

    service.getDocument('http://localhost/file').subscribe();

    expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
    const [url, options] = httpClientSpy.get.calls.mostRecent().args as [string, any];
    expect(url).toBe('http://localhost/file');
    expect(options?.responseType).toBe('blob');
  });
});
