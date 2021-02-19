import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
import { ErrorDialogService } from './error-dialog.service';

describe('ErrorDialogService', () => {
  let service: ErrorDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ErrorDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
