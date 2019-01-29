import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, retry, catchError } from 'rxjs/operators';
import { Routes, RouterModule, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AlertService } from '../alert/alert.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html'
})
export class NavComponent implements OnInit {

  constructor(private  http:HttpClient,translate: TranslateService, private alertService: AlertService, private router: Router) { }



  urls=
    {
      "getProcess":environment.apiUrl+"caseprocesses/total/"
    }


  arrayOfHardcodedProcesses=
  [
    {
      "name":"Opret sag",
      "processID":100,
      "number":0,
      "route":"/opret-sag"
    },
    {
      "name":"Screening",
      "processID":102,
      "number":0,
      "route":"/screening"
    },
    {
      "name":"Reservedels bestilling",
      "processID":104,
      "number":0,
      "route":"/reservedels-bestilling"
    },
    {
      "name":"Indlevering",
      "processID":106,
      "number":0,
      "route":"/indlevering"
    },
    {
      "name":"Dispatch",
      "processID":108,
      "number":0,
      "route":"/dispatch"
    },
    {
      "name":"Udførelse",
      "processID":110,
      "number":0,
      "route":"/udforelse"
    },
    // {
    //   "name":"Sag uden part",
    //   "processID":112,
    //   "number":0,
    //   "route":"/sag-uden-part"
    // },
    {
      "name":"Efterbehandling",
      "processID":114,
      "number":0,
      "route":"/efterbehandling"
    }
    // {
    //   "name":"Lukket",
    //   "processID":116,
    //   "number":0,
    //   "route":"/lukket"
    // }
  ]

  ngOnInit()
  {
   /*  for(let i=0;i<this.arrayOfHardcodedProcesses.length;i+=1)
    {
      this.http.get(this.urls["getProcess"]+this.arrayOfHardcodedProcesses[i].processID).subscribe(
        (response:any)=>
        {
          this.arrayOfHardcodedProcesses[i].number=response.total;
        }
      )
    } */

  }

   navpreventClose(event)
   {
    let element = event.target;

    if (window.innerWidth >= 993)
    {
      while (element.tagName !== 'LI')
      {
        element = element.parentElement;
      }
      element.dataset.toggle = null;
    } else {
      while (element.tagName !== 'LI')
      {
        element = element.parentElement;
      }
      element.dataset.toggle = 'collapse';
    }
   }
}
