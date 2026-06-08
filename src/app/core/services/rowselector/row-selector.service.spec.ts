// Spec file created by Codex.
import { TestBed } from '@angular/core/testing';
import { RowSelectorService } from './row-selector.service';

describe('RowSelectorService', () => {
  let service: RowSelectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RowSelectorService],
    });
    service = TestBed.inject(RowSelectorService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize default pagination values', () => {
    expect(service.rowIndex).toBe(-1);
    expect(service.pageIndex).toBe(0);
    expect(service.pageSize).toBe(5);
  });
});
