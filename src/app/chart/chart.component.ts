import { Component, OnInit } from '@angular/core';
import { ChartService } from './chart.service';
import { County, Chart } from './models/timeline.model';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  providers: [ChartService],
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  counties: County[]
  chart: Chart[]
  view: any[] = [800, 400];
  names: String[]
  initialized = false;

  // selected options
  selectedCounties: string[] = [];
  selectedChart: string;
  selectedRange: string;

  // chart info
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = 'Date';
  showYAxisLabel = true;
  yAxisLabel: string;
  isTimeline = true;

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  autoScale = true;

  constructor(private chartService: ChartService) { }

  async ngOnInit() {
    this.selectedChart = "0";
    this.selectedRange = "30"
    this.selectedCounties.push("Total");
    this.yAxisLabel = 'New Cases Per Day';
    await this.getCounties();
  }

  getCounties(): void {
    this.selectedChart = "0";
    this.chartService.getCountyNames()
      .subscribe(names => {
        this.names = names;
        this.updateChart();
      });
  }

  onCountyChange(county: string) {
    const idx = this.selectedCounties.indexOf(county);
    if (county === "Total" && !this.initialized) {
      this.initialized = true;
    } else if(idx === -1) {
      this.selectedCounties.push(county);
    } else {
      this.selectedCounties.splice(idx, 1);
    }
    this.updateChart();
  }

  onChartChange(event: any) {
    this.selectedChart = event.value;
    this.updateChart();
  }

  onRangeChange(event: any) {
    this.selectedRange = event.value;
    this.updateChart();
  }

  updateChart() : void {
    switch(this.selectedChart) {
      case "0": {
        this.setChartForDailyCases();
        break;
      }
      case "1": {
        this.setChartForCaseCounts();
        break;
      }
    }
  }

  setChartForDailyCases(): void {
    this.yAxisLabel = 'New Cases Per Day';
    this.chartService.getDailyChange(this.selectedCounties, this.selectedRange)
    .subscribe(counties => {
      this.chart = this.chartService.mapCountiesToCharts(counties)
    });  
  }

  setChartForCaseCounts(): void {
    this.yAxisLabel = 'Total Cases';
    this.chartService.getCaseCount(this.selectedCounties, this.selectedRange)
    .subscribe(counties => {
      this.chart = this.chartService.mapCountiesToCharts(counties)
    });  
  }

  compareFn(c1: string, c2: string): boolean {
    return c1.toLowerCase() === c2.toLowerCase();
  }

  formatDate(val: string) {
    let string = val.substring(1,5);
    return string
  }

}
