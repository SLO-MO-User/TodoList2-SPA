import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TodoMainComponent } from './todo/todo-main/todo-main.component';
import { AuthenticationGuard } from './_guards/authentication.guard';
import { UserResolver } from './_resolvers/user.resolver';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthenticationGuard],
    children: [
      {
        path: 'todo',
        component: TodoMainComponent,
        resolve: { user: UserResolver }
      }
    ]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
