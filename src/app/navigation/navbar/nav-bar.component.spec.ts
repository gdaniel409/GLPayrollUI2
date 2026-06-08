// Spec file created by Codex.
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { NavBarComponent } from './nav-bar.component';
import { AuthenticationService } from '../../core/services/authentication/authentication.service';

class MockAuthenticationService {
  isInRole(role: string): boolean {
    return false;
  }
}

describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavBarComponent],
      providers: [
        provideHttpClient(),
        provideRouter([]),
        { provide: AuthenticationService, useClass: MockAuthenticationService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should use injected authentication service', () => {
    expect(component.authService).toBeInstanceOf(MockAuthenticationService);
  });
});
