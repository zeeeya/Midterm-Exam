import { Component, OnInit } from '@angular/core';

import { UserService } from '../user.service';

import { User } from '../user-model';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {

  users: Observable<User[]>;
  firstname: string;
  lastname: string;
  email: string;
  company: string;
  phone: number;
  address: string;

  constructor(private userService: UserService) { }

  ngOnInit() {
    // this.users = this.userService.getData()
    this.users = this.userService.getSnapshot();
  }

  createUser() {
    this.userService.create(this.firstname, this.lastname, this.email, this.company, this.phone, this.address);
    this.firstname = '';
    this.lastname = '';
    this.email = '';
    this.company = '';
    this.phone = 0;
    this.address = '';
  }

}
