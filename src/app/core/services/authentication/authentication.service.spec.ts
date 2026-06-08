// Spec file created by Codex.
import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { APP_SETTINGS } from '../../../app.settings';
import { JwtHelperService } from '@auth0/angular-jwt';

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    spyOn(JwtHelperService.prototype, 'decodeToken').and.returnValue({ roles: ['Admin'] });
    spyOn(JwtHelperService.prototype as any, 'isTokenExpired').and.returnValue(false);
    httpClientSpy = jasmine.createSpyObj<HttpClient>('HttpClient', ['post']);

    TestBed.configureTestingModule({
      providers: [
        AuthenticationService,
        { provide: HttpClient, useValue: httpClientSpy },
        { provide: APP_SETTINGS, useValue: { getString: () => 'http://localhost/authenticate' } },
      ],
    });

    service = TestBed.inject(AuthenticationService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('logout should clear authResponse and userRoles', () => {
    service.authResponse = { token: 'abc' } as any;
    service.userRoles = ['Admin'];
    service.logout();
    expect(service.authResponse).toBeNull();
    expect(service.userRoles).toEqual([]);
  });

  it('login should populate userRoles from decoded token', () => {
    httpClientSpy.post.and.returnValue(of({ token: 'abc' }));

    service.login('user', 'pass').subscribe();

    expect(httpClientSpy.post).toHaveBeenCalledOnceWith('http://localhost/authenticate', {
      username: 'user',
      password: 'pass',
    });
    expect(service.userRoles).toEqual(['Admin']);
  });

  it('isAuthenticated should return false when no authResponse', () => {
    service.authResponse = null;
    expect(service.isAuthenticated()).toBeFalse();
  });

  it('isInRole should return true for matching role', () => {
    service.userRoles = ['Admin'];
    expect(service.isInRole('Admin')).toBeTrue();
  });
});
