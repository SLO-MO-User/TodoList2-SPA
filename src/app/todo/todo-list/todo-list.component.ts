import {
  Component,
  OnInit,
  TemplateRef,
  Output,
  EventEmitter
} from '@angular/core';
import { Todo } from 'src/app/_models/todo';
import { BsModalRef, BsModalService, PageChangedEvent } from 'ngx-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { DataService } from 'src/app/_services/data.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todos;
  changeTodo;
  list;
  selectedTodo: Todo;
  newTodo: string;
  modalRef: BsModalRef;
  @Output() todoEvent = new EventEmitter<Todo>();

  totalTodosCount: number;
  currentPage = 1;
  page: number;
  pageSize = 10;

  constructor(
    private data: DataService,
    private modalService: BsModalService,
    private userService: UserService,
    private alertify: AlertifyService,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    this.getTodoList('tasks', this.currentPage, this.pageSize);
    this.data.currentTodo.subscribe(todo => (this.selectedTodo = todo));
    this.data.currentList.subscribe(list => (this.list = list));
    this.data.currentTodoCount.subscribe(
      count => (this.totalTodosCount = count)
    );
    this.data.currentChange.subscribe(change => {
      if (change) {
        setTimeout(
          () => this.getTodoList(this.list, this.currentPage, this.pageSize),
          100
        );
      }
      this.changeTodo = change;
    });
  }

  pageChanged(event: any): void {
    this.currentPage = event.page;
    this.getTodoList(this.list, this.currentPage, this.pageSize);
  }

  private getTodoList(listName: string, page: number, pageSize: number) {
    this.todos = this.userService.getTodos(
      this.authService.decodedToken.nameid,
      listName,
      page,
      pageSize
    );

    this.userService
      .getListCounts(this.authService.decodedToken.nameid, this.list)
      .subscribe(
        response => {
          this.totalTodosCount = response;
        },
        error => {
          this.alertify.error(error);
        }
      );

    this.data.changeTodoList(this.todos);
    this.data.changeTodoCount(this.totalTodosCount);
    this.data.changeTodos(false);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  passTodo(todo: Todo) {
    this.selectedTodo = todo;
    this.data.changeTodo(todo);
  }

  addTodo() {
    if (this.newTodo) {
      this.userService
        .addTodo(this.authService.decodedToken.nameid, this.newTodo)
        .subscribe(
          () => {
            this.alertify.success('Added');
            this.newTodo = '';
            this.getTodoList(this.list, this.currentPage, this.pageSize);
          },
          error => {
            this.alertify.error(error);
          }
        );
      this.modalRef.hide();
    }
  }

  changeToCompleted(todo: Todo) {
    todo.isComplete = !todo.isComplete;
    this.userService
      .updateTodo(this.authService.decodedToken.nameid, todo.id, todo)
      .subscribe(
        () => {
          this.alertify.success('Updated Complete State');
          this.getTodoList(this.list, this.currentPage, this.pageSize);
        },
        error => {
          this.alertify.error(error);
        }
      );
  }

  changeToImportant(todo: Todo) {
    todo.isImportant = !todo.isImportant;
    this.userService
      .updateTodo(this.authService.decodedToken.nameid, todo.id, todo)
      .subscribe(
        () => {
          this.alertify.success('Updated Important State');
          this.getTodoList(this.list, this.currentPage, this.pageSize);
        },
        error => {
          this.alertify.error(error);
        }
      );
  }
}
