// Spec file created by Codex.
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app.component';
import { ContextMenuComponent } from './navigation/context-menu-component/context-menu-component';
import { NavBarComponent } from './navigation/navbar/nav-bar.component';
import { APP_SETTINGS } from './app.settings';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, NavBarComponent, ContextMenuComponent],
      providers: [
        provideHttpClient(),
        provideRouter([]),
        {
          provide: APP_SETTINGS,
          useValue: {
            getString: (value: string) => `http://localhost/${value}`,
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('menuClose should set hideMenu', () => {
    component.hideMenu = false;
    component.menuClose(true);
    expect(component.hideMenu).toBeTrue();
  });

  it('employeeSelected should update contextMenuRef and hideMenu', () => {
    component.contextMenuRef = {
      employeeID: 0,
      employeeNumber: '',
      documentCount: 0,
      userId: 0,
    } as any;

    const result = component.employeeSelected(1, 'E1', 2, 3);

    expect(component.hideMenu).toBeFalse();
    expect(component.contextMenuRef.employeeID).toBe(1);
    expect(component.contextMenuRef.employeeNumber).toBe('E1');
    expect(result).toBeFalse();
  });
});
