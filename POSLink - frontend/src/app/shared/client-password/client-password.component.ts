import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AlertService } from '../alert/alert.service';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../core/auth.service';
import { RouterService } from "../../core/router.service";
import { Router, ActivatedRoute } from '@angular/router'
import { ClientsService } from '../../modules/clients/clients.service';

@Component({
  selector: 'app-client-password',
  templateUrl: './client-password.component.html'
})
export class ClientPasswordComponent implements OnInit {
  passwordForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private alertService: AlertService,
    translate: TranslateService,

    private router: Router,
    private routerService: RouterService,
    private route: ActivatedRoute,
    private clientService: ClientsService) { }

  ngOnInit() {
    this.createForm();
  }

  onSubmit() {
    this.submitted = true;
  }
  registerClient() {
    var token = this.route.snapshot.params.token;
    var formValues = this.passwordForm.value;
    var clientDetails = {
      User_Password: formValues.User_Password
    }
    this.authService.confirmRegisterClient(token, clientDetails).subscribe(data => {
      this.router.navigate(["/login"]);
    }, error => {

    });
  }

  createForm(): void {
    this.passwordForm = this.fb.group(
      {
        User_Password: ['', Validators.required],
        User_Confirm_Password: ['', Validators.required]
      }, { validator: this.validate.bind(this) });
  }

  private validate(form: FormGroup) {
    let User_Password = form.controls['User_Password'].value;
    let User_Confirm_Password = form.controls['User_Confirm_Password'].value;
    if (User_Confirm_Password.length <= 0) {
      return null;
    }
    if (User_Confirm_Password !== User_Password) {
      return { passwordMatch: true };
    }
    return null;
  }
}
