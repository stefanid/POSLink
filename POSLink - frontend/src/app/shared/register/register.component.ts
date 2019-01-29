import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AlertService } from '../alert/alert.service';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../core/auth.service';
import { RouterService } from "../../core/router.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
  submitted = false;
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private alertService: AlertService, translate: TranslateService, private routerService: RouterService) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      User_Username: ['', Validators.required],
      User_Email: ['', Validators.required],
      User_Password: ['', Validators.required],
      User_Name: ['', Validators.required],
      User_Phone: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;
  }

  onRegister(): void {
    let registerObj = JSON.stringify(this.registerForm.value);
    this.authService.userRegister(registerObj)
      .subscribe((data) => {
        if (data) {
          this.alertService.success('Success');
          setTimeout(() => {
            this.routerService.navigateToLoginPage();
          }, 1000);
          
        }
      }),
      error => {
        this.alertService.error(error);
      };
  }

}
