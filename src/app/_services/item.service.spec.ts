import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HttpClient, HttpClientModule, HttpResponse} from '@angular/common/http';

import { ItemService } from './item.service';
import { Item } from '@app/_models/item';
import { ItemPayload } from '@app/_models/itemPayload';
import { Filter } from '@app/_models/filter';

interface Data {
  name: string;
}

const testUrl = '/data';

describe('ItemService', () => {
  let service: ItemService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ItemService);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  describe("get items", () => {
    let expectedItemPayload: ItemPayload;

    beforeEach(() => {
      service = TestBed.inject(ItemService);
      expectedItemPayload = {
        items: [
          {id: 1, name: "aa", price: 11, category: "shoes", description: "xxxxx"},
          {id: 2, name: "bb", price: 11, category: "clothes", description: "xxxxx"}
        ],
        count: 2
      };      
    });

    it("should return items", () => {
      service.getItems(new Filter("", []), 1, 3)
          .subscribe(
            itemPayload => {expect(itemPayload).toEqual(expectedItemPayload) },
            fail
          );
      const req = httpTestingController.expectOne(service.itemsUrl + "?name=&pageNumber=1&pageSize=3&category=");
      expect(req.request.method).toEqual('GET');

      // Respond with the mock Items
      req.flush(expectedItemPayload);
    
    });

    it("should be ok returning no items", () => {
      service.getItems(new Filter("", []), 1, 3)
          .subscribe(
            itemPayload => {
                expect(itemPayload.count).toEqual(0);
                expect(itemPayload.items).toEqual([]);
            },
            fail
          );
      const req = httpTestingController.expectOne(service.itemsUrl + "?name=&pageNumber=1&pageSize=3&category=");
      expect(req.request.method).toEqual('GET');

      // Respond with the mock Items
      req.flush({items:[], count:0});   
    });


    // This service reports the error but finds a way to let the app keep going.
    it('should turn 404 into an empty Items result', () => {

      service.getItems(new Filter("", []), 1, 3).subscribe(
        itemsPayload => {
          expect(itemsPayload.items.length).toEqual(0, 'should return empty items array');
          expect(itemsPayload.count).toEqual(0, 'should return count=0');
        },
        fail
      );

      const req = httpTestingController.expectOne(service.itemsUrl + "?name=&pageNumber=1&pageSize=3&category=");

      // respond with a 404 and the error message in the body
      const msg = 'deliberate 404 error';
      req.flush(msg, {status: 404, statusText: 'Not Found'});
    });

    it('should return expected items (called multiple times)', () => {

      service.getItems(new Filter("", []), 1, 3).subscribe();
      service.getItems(new Filter("", []), 1, 3).subscribe();
      service.getItems(new Filter("", []), 1, 3).subscribe(
        itemP => expect(itemP).toEqual(expectedItemPayload, 'should return expected Items'),
        fail
      );

      const requests = httpTestingController.match(service.itemsUrl+ "?name=&pageNumber=1&pageSize=3&category=");
      expect(requests.length).toEqual(3, 'calls to getItems()');

      // Respond to each request with different mock item results
      requests[0].flush([]);
      requests[1].flush([{id: 1, name: 'bob'}]);
      requests[2].flush(expectedItemPayload);
    });

  });

  describe('#updateItem', () => {
    // Expecting the query form of URL so should not 404 when id not found
    const makeUrl = (id: number) => `${service.itemsUrl}/?id=${id}`;

    it('should update an item and return it', () => {

      const updateItem: Item = { id: 5, name: 'A', price:1, category:"", description:"bb" };

      service.updateItem(updateItem).subscribe(
        data => expect(data).toEqual(updateItem, 'should return the item'),
        fail
      );

      // service should have made one request to PUT item
      const req = httpTestingController.expectOne(service.itemsUrl + '/5');
      expect(req.request.method).toEqual('PUT');
      expect(req.request.body).toEqual(updateItem);

      // Expect server to return the item after PUT
      const expectedResponse = new HttpResponse(
        { status: 200, statusText: 'OK', body: updateItem });
      req.event(expectedResponse);
    });

    // This service reports the error but finds a way to let the app keep going.
    it('should turn 404 error into return of the update item', () => {
      const updateItem: Item = { id: 5, name: 'A', price:1, category:"", description:"bb" };

      service.updateItem(updateItem).subscribe(
        data => expect(data).toEqual(updateItem, 'should return the update item'),
        fail
      );

      const req = httpTestingController.expectOne(service.itemsUrl + '/5');

      // respond with a 404 and the error message in the body
      const msg = 'deliberate 404 error';
      req.flush(msg, {status: 404, statusText: 'Not Found'});
    });
  });

});


