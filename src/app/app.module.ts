import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { NavComponent } from './nav/nav.component';
import { TodoMainComponent } from './todo/todo-main/todo-main.component';
import { TodoMenuLeftComponent } from './todo/todo-menu-left/todo-menu-left.component';
import { TodoMenuRightComponent } from './todo/todo-menu-right/todo-menu-right.component';
import { TodoListComponent } from './todo/todo-list/todo-list.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

import { HttpClientModule } from '@angular/common/http';
import { AlertifyService } from './_services/alertify.service';
import { JwtModule } from '@auth0/angular-jwt';
import {
  BsDropdownModule,
  BsDatepickerModule,
  ModalModule,
  TooltipModule,
  TimepickerModule,
  PaginationModule
} from 'ngx-bootstrap';

import { AuthenticationService } from './_services/authentication.service';
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { UserService } from './_services/user.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserResolver } from './_resolvers/user.resolver';
import { DataService } from './_services/data.service';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { ScrollingModule } from '@angular/cdk/scrolling';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    TodoMainComponent,
    TodoMenuLeftComponent,
    TodoMenuRightComponent,
    TodoListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    PaginationModule.forRoot(),
    TimepickerModule.forRoot(),
    BrowserAnimationsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        whitelistedDomains: ['localhost:8000'],
        blacklistedRoutes: ['localhost:8000/api/auth']
      }
    }),
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    ScrollingModule
  ],
  providers: [
    AlertifyService,
    AuthenticationService,
    UserService,
    DataService,
    UserResolver,
    ErrorInterceptorProvider,
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    // Add an icon to the library for convenient access in other components
    library.add(fas, far);
  }
}
