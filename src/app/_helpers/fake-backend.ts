import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { ITEM_PAYLOAD } from '@app/mock-items';
import { Item } from '@app/_models/item';
import { ItemPayload } from '@app/_models/itemPayload';

const users = [{ id: 1, username: 'test', password: 'test', firstName: 'Test', lastName: 'User', token:"", role:"admin" }];
const itemPayload:ItemPayload = ITEM_PAYLOAD;

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;

        // wrap in delayed observable to simulate server api call
        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
            .pipe(delay(500))
            .pipe(dematerialize());

        function handleRoute() {
            switch (true) {
                case url.endsWith('/users/authenticate') && method === 'POST':
                    return authenticate();
                case url.endsWith('/users') && method === 'GET':
                    return getUsers();
                case url.endsWith('/users') && method === 'GET':
                    return getUsers();
                case url.endsWith('/items') && method === 'GET':
                    return getItems();
                case url.endsWith('/items/1') && method === 'GET':
                    return getItem();
                case url.endsWith('/') && method === 'GET':
                    return getItems();
                default:
                // pass through any requests not handled above
                    return next.handle(request);
            }    
        }

        // route functions

        function authenticate() {
            const { username, password } = body;
            const user = users.find(x => x.username === username && x.password === password);
            if (!user) return error('Username or password is incorrect');
            return ok([{
                id: user.id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                token: 'fake-jwt-token',
                password: "",
                role:"guest"
            }])
        }

        function getUsers() {
            if (!isLoggedIn()) return unauthorized();
            return ok(users);
        }

        function getItems() {
            return okItems(itemPayload);
        }

        function getItem() {
            return okItem(        {
                id: 1,    
                name: "aaaa",
                price: 12.75,
                category: "shoes",
                description: "eee"
            },);
        }        
        // helper functions

        function okItems(body?: ItemPayload) {
            return of(new HttpResponse({ status: 200, body }))
        }

        function okItem(body?: Item) {
            return of(new HttpResponse({ status: 200, body }))
        }

        function ok(body?: { id: number; username: string; password:string, firstName: string; lastName: string; token:string; role:string; }[]) {
            return of(new HttpResponse({ status: 200, body }))
        }

        function error(message: string) {
            return throwError({ error: { message } });
        }

        function unauthorized() {
            return throwError({ status: 401, error: { message: 'Unauthorised' } });
        }

        function isLoggedIn() {
            return headers.get('Authorization') === 'Bearer fake-jwt-token';
        }
    }
}

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};