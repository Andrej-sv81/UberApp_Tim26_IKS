import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { ReportService } from '../report.service';
import { error } from '@angular/compiler-cli/src/transformers/util';

Chart.register(...registerables);

@Component({
  selector: 'app-report',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit{

  constructor(private service: ReportService){}
  labels = ['JAN', 'FEB', "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

  data1 = [0,0,0,0,0,0,0,0,0,0,0,0];
  data2 = [0,0,0,0,0,0,0,0,0,0,0,0];

  ngOnInit(): void
  {

    this.service.ReturnMonthlyStats().subscribe({
      next: (result) => {
        this.data1 = result.numberOfRides;
        this.data2 = result.sumOfPrices;

        this.RenderChart1(this.data1);
        this.RenderChart2(this.data2);
      },
      error: (error =>{})
    });

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
