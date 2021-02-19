import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
import { OrderService } from './order.service';

describe('OrderService', () => {
  let service: OrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(OrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
