import { Component, OnInit, Input } from '@angular/core';
import App from '../../../models/app';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  @Input() apps: App[] = [];
  constructor() { }

  ngOnInit(): void {
  }

}
