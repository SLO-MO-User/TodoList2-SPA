import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../_models/user';
import { Observable } from 'rxjs';
import { Todo } from '../_models/todo';

const httpOptions = {
  headers: new HttpHeaders({
    Authorization: 'Bearer ' + localStorage.getItem('token')
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getUser(id): Observable<User> {
    return this.http.get<User>(this.baseUrl + 'users/' + id, httpOptions);
  }

  updateUser(id: number) {
    return this.http.put(this.baseUrl + 'users/' + id, {});
  }

  getTodos(userId: number, list: string, page: number, pageSize: number): Observable<Todo[]> {
    return this.http.get<Todo[]>(
      this.baseUrl + 'users/' + userId + '/todos/lists/' + list + '/pages/' + page + '/' + pageSize,
      httpOptions
    );
  }

  getTodo(userId: number, id: number): Observable<Todo> {
    return this.http.get<Todo>(
      this.baseUrl + 'users/' + userId + '/todos/' + id,
      {}
    );
  }

  addTodo(userId: number, todo: string) {
    return this.http.post(this.baseUrl + 'users/' + userId + '/todos/', {
      taskName: todo
    });
  }

  updateTodo(userId: number, id: number, todo: Todo) {
    return this.http.put(
      this.baseUrl + 'users/' + userId + '/todos/' + id,
      todo
    );
  }

  deleteTodo(userId: number, id: number) {
    return this.http.delete(this.baseUrl + 'users/' + userId + '/todos/' + id);
  }

  getListCounts(userId: number, list: string): Observable<number> {
    return this.http.get<number>(
      this.baseUrl + 'users/' + userId + '/todos/lists/' + list + '/count',
      httpOptions
    );
  }
}
