// Spec file created by Codex.
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { APP_SETTINGS } from '../../app.settings';
import { DocumentsListComponent } from './documents-list';
import { provideLocationMocks } from '@angular/common/testing';



describe('DocumentsList', () => {
  let component: DocumentsListComponent;
  let fixture: ComponentFixture<DocumentsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentsListComponent],
      providers: [
        provideHttpClient(),
        provideRouter([]),
        provideLocationMocks(),
        {
          provide: APP_SETTINGS,
          useValue: {
            getString: (value: string) => `http://localhost/${value}`,
          },
        },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
