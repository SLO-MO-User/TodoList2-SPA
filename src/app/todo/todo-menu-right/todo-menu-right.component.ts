import {
  Component,
  OnInit,
  ViewEncapsulation,
  Output,
  EventEmitter
} from '@angular/core';
import { Todo } from 'src/app/_models/todo';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { DataService } from 'src/app/_services/data.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { enGbLocale } from 'ngx-bootstrap/locale';
import { trLocale } from 'ngx-bootstrap/locale';
import { BsLocaleService, defineLocale } from 'ngx-bootstrap';
import localeTr from '@angular/common/locales/tr';

@Component({
  selector: 'app-todo-menu-right',
  templateUrl: './todo-menu-right.component.html',
  styleUrls: ['./todo-menu-right.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TodoMenuRightComponent implements OnInit {
  todo: Todo;
  todos;
  listChange;

  constructor(
    private userService: UserService,
    private alertify: AlertifyService,
    private authService: AuthenticationService,
    private data: DataService,
    private localeService: BsLocaleService
  ) {
    trLocale.invalidDate = 'Custom label';
    defineLocale('tr', trLocale);
    this.localeService.use('tr');
  }

  ngOnInit() {
    this.data.currentTodo.subscribe(todo => {
      this.todo = todo;
    });
    this.data.currentChange.subscribe(change => (this.listChange = change));
  }

  update(id: number, todo: Todo) {
    this.userService
      .updateTodo(this.authService.decodedToken.nameid, id, todo)
      .subscribe(
        () => {
          this.alertify.success('Updated');
          this.data.changeTodos(true);
        },
        error => {
          this.alertify.error(error);
        }
      );
  }

  delete(id: number) {
    this.userService
      .deleteTodo(this.authService.decodedToken.nameid, id)
      .subscribe(
        () => {
          this.alertify.warning('Deleted');
        },
        error => {
          this.alertify.error(error);
        }
      );
    this.data.changeTodos(true);
  }

  changeToTodayView(todo: Todo) {
    todo.isInTodayView = !todo.isInTodayView;
    this.userService
      .updateTodo(this.authService.decodedToken.nameid, todo.id, todo)
      .subscribe(
        () => {
          this.alertify.success('Updated Today View State');
          this.data.changeTodos(true);
        },
        error => {
          this.alertify.error(error);
        }
      );
  }
}
