// Spec file created by Codex.
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DocumentViewComponent } from './document-viewer';
import { DocumentsHttpService } from '../../core/services/documents/documents-service';
import { ActivatedRoute, Router } from '@angular/router';
import { APP_SETTINGS } from '../../app.settings';
import { of } from 'rxjs';

class MockDocumentsHttpService {
  getDocument(url: string) {
    return of(new Blob(['test'], { type: 'application/pdf' }));
  }
}

class MockRouter {
  navigate = jasmine.createSpy('navigate');
}

describe('DocumentViewComponent', () => {
  let component: DocumentViewComponent;
  let fixture: ComponentFixture<DocumentViewComponent>;
  let router: MockRouter;

  beforeEach(async () => {
    spyOn(window, 'open').and.returnValue({} as Window);

    router = new MockRouter();

    await TestBed.configureTestingModule({
      imports: [DocumentViewComponent],
      providers: [
        { provide: DocumentsHttpService, useClass: MockDocumentsHttpService },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: {
                documentId: '5',
                inline: 'true',
                contentType: 'application/pdf',
                employeeId: '42',
                employeeNumber: 'E42',
              },
            },
          },
        },
        { provide: Router, useValue: router },
        { provide: APP_SETTINGS, useValue: { getString: () => 'http://localhost/test' } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DocumentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit should initialize route params and call viewDocumentInNewTab', () => {
    expect(component.documentId).toBe(5);
    expect(component.inline).toBeTrue();
    expect(component.contentType).toBe('application/pdf');
    expect(component.employeeId).toBe(42);
    expect(component.employeeNumber).toBe('E42');
    expect(router.navigate).toHaveBeenCalledWith(['documents', 42, 'E42']);
  });
});
