import { User } from '@app/_models/user';
import { of } from 'rxjs';

export class UserServiceStub {

    getAddressByUserId(userId: number) {
        return of([]);
    }       

}