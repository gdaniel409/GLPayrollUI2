// Spec file created by Codex.
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { APP_SETTINGS } from '../../app.settings';

import { EmployeeAddEditComponent } from './employee-add-edit.component';
import { provideLocationMocks } from '@angular/common/testing';


describe('EmployeeAddEditComponent', () => {
  let component: EmployeeAddEditComponent ;
  let fixture: ComponentFixture<EmployeeAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeAddEditComponent, HttpClientTestingModule, RouterTestingModule],
      providers: [
        provideLocationMocks(),
        {
          provide: APP_SETTINGS,
          useValue: {
            getString: (value: string) => `http://localhost/${value}`,
          },
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { params: {} },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeAddEditComponent );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
