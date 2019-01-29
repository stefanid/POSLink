import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../core/auth.service";

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html'
})
export class TopbarComponent implements OnInit {

  constructor(private auth:AuthService) { }

  ngOnInit() 
  {
  }

  public logOut()
  {
    this.auth.logOut();
  }

}
