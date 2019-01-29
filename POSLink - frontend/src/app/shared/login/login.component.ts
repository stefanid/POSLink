import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AlertService } from '../alert/alert.service';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../core/auth.service';
import { RouterService } from "../../core/router.service";
import {Router} from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  submitted = false;
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private alertService: AlertService, translate: TranslateService,private route:Router, private routerService: RouterService)
  {

  }
  ngOnInit()
  {
  
    this.loginForm = this.fb.group(
      {
      User_Email: ['pkj@it-service.nu', Validators.required],
      User_Password: ['123', Validators.required]
    });
  }
  onSubmit()
  {
    this.submitted = true;
  }
  navRegister()
  {
    this.route.navigate(['register']);
  }
  onlogin(): void
  {
    let stringifiedObj = JSON.stringify(this.loginForm.value);
    this.authService.userLogin(stringifiedObj)
    .subscribe(
      (data) =>
      {
        this.authService.isAuthenticated();
        this.routerService.navigateToHomePage();

      },
      error =>
      {
        this.alertService.error(error);
      }
    );
  }
}
