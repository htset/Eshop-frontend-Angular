import { User } from '@app/_models/user';
import { BehaviorSubject, of } from 'rxjs';

let testUser:User = 
{
    id: 1,
    username: 'htset',
    password: '',
    firstName: 'Haris',
    lastName: 'Tse',
    token: '',
    role: 'admin',
    email: 'haris@tse.gr'
};

export class AuthenticationServiceStub {

    public get currentUserValue(): User {
        let currentUserSubject: BehaviorSubject<User> = new BehaviorSubject<User>(testUser);
        return currentUserSubject.value;
    }

}