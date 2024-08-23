import { TestBed } from '@angular/core/testing';

import { WorkToExcelFileService } from './work-to-excel-file.service';

describe('WorkToExcelFileService', () => {
  let service: WorkToExcelFileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkToExcelFileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
