import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { DataService } from 'src/app/_services/data.service';
import { UserService } from 'src/app/_services/user.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-todo-menu-left',
  templateUrl: './todo-menu-left.component.html',
  styleUrls: ['./todo-menu-left.component.css']
})
export class TodoMenuLeftComponent implements OnInit {
  lists = ['tasks', 'completed', 'planned', 'important', 'today'];
  badgeCount = [0, 0, 0, 0, 0];
  selectedList: string;
  todos;
  modalRef: BsModalRef;
  count = 0;
  textValue = '';

  constructor(
    private modalService: BsModalService,
    private authService: AuthenticationService,
    private data: DataService,
    private userService: UserService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.data.currentList.subscribe(list => (this.selectedList = list));
    this.data.currentTodoList.subscribe(todos => {
      this.todos = todos;
      this.getListCounts();
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  passList(list: string) {
    this.data.changeList(list);
    this.data.changeTodos(true);
  }

  getListCounts() {
    let list = '';
    for (let index = 0; index < 5; index++) {
      list = this.lists[index];
      this.userService
        .getListCounts(this.authService.decodedToken.nameid, list)
        .subscribe(
          response => {
            this.badgeCount[index] = response;
          },
          error => {
            this.alertify.error(error);
          }
        );
    }
  }
}
