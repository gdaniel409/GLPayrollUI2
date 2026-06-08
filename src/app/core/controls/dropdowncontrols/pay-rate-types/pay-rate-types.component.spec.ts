// Spec file created by Codex.
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PayRateTypesComponent } from './pay-rate-types.component';
import { RateTypeService } from '../../../services/ratetype/rate-type';
import { of } from 'rxjs';

class MockRateTypeService {
  initializeLookupData() {
    return of([{ id: 1, rateName: 'Hourly' }]);
  }
}

describe('PayRateTypesComponent', () => {
  let component: PayRateTypesComponent;
  let fixture: ComponentFixture<PayRateTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PayRateTypesComponent],
      providers: [{ provide: RateTypeService, useClass: MockRateTypeService }],
    }).compileComponents();

    fixture = TestBed.createComponent(PayRateTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize rateTypes$ on init', () => {
    component.rateTypes$?.subscribe((data) => {
      expect(data.length).toBe(1);
      expect(data[0].id).toBe(1);
    });
  });

  it('compare should return true for equal values', () => {
    expect(component.compare('2', 2)).toBeTrue();
  });
});
