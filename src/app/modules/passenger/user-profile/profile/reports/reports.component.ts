import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { ReportService } from '../report.service';

Chart.register(...registerables);

@Component({
  selector: 'app-report',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit{

  constructor(private service: ReportService){}
  labels = ['JAN', 'FEB', "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  ngOnInit(): void
  {
    const data1 = this.service.ReturnMonthlyRides();
    const data2 = this.service.ReturnMonthlyEarnings();

    this.RenderChart1(data1);
    this.RenderChart2(data2);
  }



  RenderChart1(data1: number[]){
    const data = {
      labels: this.labels,
      datasets: [{
        axis: 'x',
        label: 'Number of Rides',
        data: data1,
        fill: false,
        backgroundColor: [
          'rgba(0, 0, 0, 0.8)',
        ],
        borderColor: [
          'rgb(255, 99, 132)',
        ],
        borderWidth: 1
      }]
    };

 
    const mychart = new Chart("chart", {
      type: 'bar',
      data,
      options: {
        indexAxis: 'x',
      }});
  }

  RenderChart2(data2: number[]){
    
    const data = {
      labels: this.labels,
      datasets: [{
        axis: 'x',
        label: 'Monthly Earnings',
        data: data2,
        fill: false,
        backgroundColor: [
          'rgba(0, 120, 255, 0.8)',
        ],
        borderColor: [
          'rgb(255, 99, 132)',
        ],
        borderWidth: 1
      }]
    };

 
    const mychart = new Chart("chart2", {
      type: 'bar',
      data,
      options: {
        indexAxis: 'x',
      }});
  }

}
