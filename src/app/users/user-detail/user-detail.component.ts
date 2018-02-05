import { Component, Input } from '@angular/core';

import { UserService } from '../user.service';

import { User } from '../user-model';

@Component({
  selector: 'user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent {

  @Input()
  user: User;

  constructor(private userService: UserService) { }


  deleteUser(id: string) {
    this.userService.deleteUser(id);
  }

}
