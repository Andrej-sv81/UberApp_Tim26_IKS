import { Component, OnInit } from '@angular/core';
import {Chart, registerables} from 'node_modules/chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit{


  ngOnInit(): void
  {
   this.RenderChart1();
   this.RenderChart2();
  }



  RenderChart1(){
    const labels = ['JAN', 'FEB', "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]
    const data = {
      labels: labels,
      datasets: [{
        axis: 'x',
        label: 'Number of Rides',
        data: [65, 59, 80, 81, 56, 55, 40, 23, 2, 100, 57, 87],
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

  RenderChart2(){
    const labels = ['JAN', 'FEB', "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]
    const data = {
      labels: labels,
      datasets: [{
        axis: 'x',
        label: 'Monthly Earnings',
        data: [456, 259, 180, 281, 356, 585, 450, 233, 211, 1020, 537, 87],
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
