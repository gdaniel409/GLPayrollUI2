// Spec file created by Codex.
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';

import { NameFileComponent } from './name-file-component';


describe('NameFileComponent', () => {
  let component: NameFileComponent;
  let fixture: ComponentFixture<NameFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
      ],
      imports: [NameFileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NameFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
