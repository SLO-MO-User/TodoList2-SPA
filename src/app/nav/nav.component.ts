import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';
import { Router } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  options: FormGroup;
  model: any = {};

  constructor(
    public authService: AuthenticationService,
    private router: Router,
    private alertify: AlertifyService,
    fb: FormBuilder
  ) {
    this.options = fb.group({
      hideRequired: true,
      floatLabel: 'auto'
    });
  }

  ngOnInit() {}

  login() {
    this.authService.login(this.model).subscribe(
      next => {
        this.alertify.success('Logged in succesfully');
      },
      error => {
        this.alertify.error(error);
      },
      () => {
        this.router.navigate(['/todo']);
      }
    );
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    this.model = {};
    this.alertify.message('Logged out');
    this.router.navigate(['/home']);
  }
}
