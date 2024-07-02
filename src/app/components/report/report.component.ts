import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { AssessmetScoresService } from '../../services/assessmet-scores.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  public chart: any;
  temparrscore: number[] = [];

  constructor(private assessmentscoreservice: AssessmetScoresService, private route: ActivatedRoute,
) {}

  ngOnInit(): void {
    Chart.register(...registerables);
    this.route.params.subscribe((params: Params)=>{
      const assId = params['id']
      this.assessmentscoreservice.getAssessmentScorebyId(assId).subscribe(data => {
        this.temparrscore = data.ScoreArr;
        this.createChart(); 
      });
    })
   
  }

  createChart(): void {
    const labels = this.temparrscore.map((_, index) => (index + 1).toString());

    this.chart = new Chart("MyChart", {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: "Marks",
            data: this.temparrscore,
            backgroundColor: 'blue'
          }
        ]
      },
      options: {
        aspectRatio: 2.5,
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        },
        plugins: {
          legend: {
            position: 'top'
          }
        }
      }
    });
  }
}
