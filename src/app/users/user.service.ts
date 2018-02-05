import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import { User } from './user-model';

import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

interface NewUser {
  address: string;
  firstname: string;
  lastname: string;
  email: string;
  company: string;
  phone: number;
  address: string;
}

@Injectable()
export class UserService {

  usersCollection: AngularFirestoreCollection<User>;
  userDocument:   AngularFirestoreDocument<Node>;

  constructor(private afs: AngularFirestore) {
    this.usersCollection = this.afs.collection('users', (ref) => ref.orderBy('time', 'desc').limit(5));
  }

  getData(): Observable<User[]> {
    return this.usersCollection.valueChanges();
  }

  getSnapshot(): Observable<User[]> {
    // ['added', 'modified', 'removed']
    return this.usersCollection.snapshotChanges().map((actions) => {
      return actions.map((a) => {
        const data = a.payload.doc.data() as User;
        return { id: a.payload.doc.id, firstname:data.firstname, lastname:data.lastname, email:data.email, company:data.company, phone:data.phone, address:data.address};
      });
    });
  }

  getUser(id: string) {
    return this.afs.doc<User>(`users/${id}`);
  }

  create(firstname: string, lastname: string, email: string, company: string, phone: number, address: string) {
    const user = {
      firstname,
      lastname,
      email,
      company,
      phone,
      address,
    };
    return this.usersCollection.add(user);
  }

  updateUser(id: string, data: Partial<User>) {
    return this.getUser(id).update(data);
  }

  deleteUser(id: string) {
    return this.getUser(id).delete();
  }
}
