// Spec file created by Codex.
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { APP_SETTINGS } from '../../app.settings';

import { ContextMenuComponent } from './context-menu-component';

describe('ContextMenuComponent', () => {
  let component: ContextMenuComponent;
  let fixture: ComponentFixture<ContextMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContextMenuComponent],
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
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContextMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
