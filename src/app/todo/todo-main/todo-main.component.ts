import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user';
import { Todo } from 'src/app/_models/todo';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { UserService } from 'src/app/_services/user.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { NbSidebarService } from '@nebular/theme';
import { DataService } from 'src/app/_services/data.service';

@Component({
  selector: 'app-todo-main',
  templateUrl: './todo-main.component.html',
  styleUrls: ['./todo-main.component.css']
})
export class TodoMainComponent implements OnInit {
  user: User;
  todos: Todo[];
  todo: Todo;

  constructor(
    private route: ActivatedRoute,
    private alertify: AlertifyService,
    private userService: UserService,
    private authService: AuthenticationService,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data.user;
      this.todos = this.user.todos;
      console.log(this.user);
      console.log(this.todos);
    });
    this.dataService.currentChange.subscribe(change => {
      if (change) {
        this.toggle();
      } else {
        this.toggle();
      }
    });
  }

  toggle() {}

  updateUser() {
    this.userService.updateUser(this.authService.decodedToken.nameid).subscribe(
      next => {
        this.alertify.success('Profile Updated.');
        this.getUser();
      },
      error => {
        this.alertify.error('error is' + error);
      }
    );
  }

  private getUser() {
    this.userService.getUser(this.authService.decodedToken.nameid).subscribe(
      response => {
        this.user = response;
        this.todos = this.user.todos;
        console.log(this.user);
      },
      error => {
        this.alertify.error(error);
      }
    );
  }
}
