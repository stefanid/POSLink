import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-style-overview',
  templateUrl: './style-overview.component.html',
  styleUrls: ['./style-overview.component.less']
})
export class StyleOverviewComponent implements OnInit {
  // Chart Types
  // PieChart, LineChart, ColumChart, Table, Barchart


  pieChartData =  {
    chartType: 'PieChart',
    dataTable: [
      ['Task', 'Hours per Day'],
      ['Work',     11],
      ['Eat',      2],
      ['Commute',  2],
      ['Watch TV', 2],
      ['Sleep',    7]
    ],
    options: {
      'title': 'Tasks',
      'colors': ['#FF9A16', '#D6001C', '#0E8691', '#4FC9A4', '#D8D8D8'],
      'fontName': 'Roboto'
    },
  };

  columchartData =  {
    chartType: 'ColumnChart',
    dataTable: [['Germany', 'USA', 'Brazil', 'Canada', 'France', 'RU'],
    [700, 300, 400, 500, 600, 800]],
    options: {'title': 'Countries', 'colors': ['#FF9A16', '#D6001C', '#0E8691', '#4FC9A4', '#D8D8D8'], 'fontName': 'Roboto'}
  };

  donutchartData =  {
    chartType: 'PieChart',
    dataTable: [
      ['Task', 'Hours per Day'],
      ['Work',     11],
      ['Eat',      2],
      ['Commute',  2],
      ['Watch TV', 2],
      ['Sleep',    7]
    ],
    options: {'title': 'Tasks', 'pieHole': 0.3, 'colors': ['#FF9A16', '#D6001C', '#0E8691', '#4FC9A4', '#D8D8D8'], 'fontName': 'Roboto'},
  };

  constructor() { }

  ngOnInit() {
  }

  addSection() {
    console.warn('add a section - open modal with data that you selected thuis area');
  }

}
