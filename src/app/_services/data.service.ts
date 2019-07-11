import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Todo } from '../_models/todo';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  listChangeValue = false;
  listName: string;
  listCounts = [0, 0, 0, 0, 0];
  todoCount = 0;

  todo: Todo = {
    id: -1,
    userId: -1,
    taskName: '',
    isComplete: false,
    isImportant: false,
    isInTodayView: false,
    note: '',
    remindMeDateTime: new Date(Date.now()),
    taskLastDateTime: new Date(Date.now()),
    createdAtDateTime: new Date(Date.now()),
    lastUpdatedAtDateTime: new Date(Date.now())
  };

  todoList: Todo[];

  private todoSource = new BehaviorSubject(this.todo);
  currentTodo = this.todoSource.asObservable();

  private changeSource = new BehaviorSubject(this.listChangeValue);
  currentChange = this.changeSource.asObservable();

  private listSource = new BehaviorSubject(this.listName);
  currentList = this.listSource.asObservable();

  private todoListSource = new BehaviorSubject(this.todoList);
  currentTodoList = this.todoListSource.asObservable();

  private listCountSource = new BehaviorSubject(this.listCounts);
  currentListCount = this.todoListSource.asObservable();

  private todoCountSource = new BehaviorSubject(this.todoCount);
  currentTodoCount = this.todoCountSource.asObservable();

  constructor() {}

  changeTodoList(todoList: Todo[]) {
    this.todoListSource.next(todoList);
  }

  changeTodo(todo: Todo) {
    this.todoSource.next(todo);
  }

  changeList(list: string) {
    this.listSource.next(list);
  }

  changeTodos(change: boolean) {
    this.changeSource.next(change);
  }

  changeListCounts(counts: number[]) {
    this.listCountSource.next(counts);
  }

  changeTodoCount(count: number) {
    this.todoCountSource.next(count);
  }
}
