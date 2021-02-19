import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';

import { ItemService } from './item.service';

describe('ItemService', () => {
  let service: ItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
