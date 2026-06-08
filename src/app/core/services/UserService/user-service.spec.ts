// Spec file created by Codex.
import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { UserHttpService } from './user-service';
import { APP_SETTINGS } from '../../../app.settings';

describe('UserHttpService', () => {
  let service: UserHttpService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj<HttpClient>('HttpClient', ['get', 'post']);

    TestBed.configureTestingModule({
      providers: [
        UserHttpService,
        { provide: HttpClient, useValue: httpClientSpy },
        {
          provide: APP_SETTINGS,
          useValue: {
            getString: (value: string) => `http://localhost/${value}`,
          },
        },
      ],
    });

    service = TestBed.inject(UserHttpService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('getList should return an empty array', () => {
    service.getList().subscribe((data) => {
      expect(data).toEqual([]);
    });
  });

  it('createUserDataForEmploye should post user data to saveuser', () => {
    const user = { id: 1, username: 'test', password: 'pass', roles: [] } as any;
    httpClientSpy.post.and.returnValue(of(user));

    service.createUserDataForEmploye(user).subscribe((data) => {
      expect(data).toEqual({ id: 1, username: 'test', password: 'pass', roles: [] } as any);
    });

    expect(httpClientSpy.post).toHaveBeenCalledOnceWith('http://localhost/saveuser', user);
  });
});
