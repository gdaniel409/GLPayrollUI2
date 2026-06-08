// Spec file created by Codex.
import { TestBed } from '@angular/core/testing';
import { ContextMenuService } from './ContextMenuService';

describe('ContextMenuService', () => {
  let service: ContextMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContextMenuService],
    });
    service = TestBed.inject(ContextMenuService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('triggerAppEmployeeSelected should emit context menu data', (done) => {
    const payload = { employeeID: 1, employeeNumber: 'E1', documentCount: 2, userId: 3 } as any;

    service.callAppEmployeeSelectedMethod$.subscribe((data) => {
      expect(data).toEqual(payload);
      done();
    });

    service.triggerAppEmployeeSelected(payload);
  });
});
