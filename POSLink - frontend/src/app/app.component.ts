import { Component, OnInit } from '@angular/core';
import { LanguageService } from './core/language.service';
import { AuthService } from "./core/auth.service";
import { RouterService } from "./core/router.service";
import { Router, NavigationStart } from "@angular/router";
import { UserService } from './core/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})

export class AppComponent implements OnInit {
  isAuthenticated;
  constructor(translate: LanguageService, private auth:AuthService, private router: Router, private user: UserService) {
  }

  ngOnInit() {
    //this.auth.isAuthenticated();
    this.auth.isLoggedIn.subscribe((value) => {
    this.isAuthenticated = value;
  });

  }
}
