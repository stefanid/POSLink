import { Component, OnInit } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-notfound404',
  templateUrl: './notfound404.component.html'
})
export class Notfound404Component implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

}
