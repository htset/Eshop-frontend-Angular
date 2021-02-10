import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '@environments/environment';
import { User } from '@app/_models/user';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Address } from '@app/_models/address';

@Injectable({ providedIn: 'root' })
export class UserService {
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
      
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/users`);
    }

    getUser(id:number) {
        return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
    }

    addUser(user:User){
        return this.http.post<User>(`${environment.apiUrl}/users`, user, this.httpOptions);
        //.pipe(
        //    catchError(this.handleError<User>('addUser'))
        //  );
    }
/*    
    handleError<T>(operation = 'operation', result?: T) {
        return (error: any) : Observable<T> => {
            console.error(error);
            return of(result as T);
        }
    }
*/   
    getAddressByUserId(userId: number) {
        return this.http.get<Address[]>(`${environment.apiUrl}/address`);
    }       

    saveAddress(address: Address) {
        return this.http.post<Address>(`${environment.apiUrl}/address`, address);
    }       

    deleteAddress(addressId?: number) {
        return this.http.delete<number>(`${environment.apiUrl}/address/${addressId}`);
    }       

}