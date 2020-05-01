import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { County, Chart, Timeline, Series } from './models/timeline.model';


import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable()
export class ChartService {
  BASE_URL = 'https://texas-covid-api.herokuapp.com/api/'

  constructor(
    private http: HttpClient) {
  }

  /** GET county names */
  getCountyNames(): Observable<String[]> {
    return this.http.get<String[]>(this.BASE_URL + 'counties', httpOptions)
      .pipe();
  }

  /** GET daily change information  */
  getDailyChange(counties: string[], range: string): Observable<County[]> {
    let param = this.buildParams(counties, range);
    const options = counties ?
      { params: new HttpParams().set('county', param)
        .set('range', range) } : {};

    return this.http.get<County[]>(this.BASE_URL + 'dailychange', options)
      .pipe(
      );
  }

  /** GET daily change information  */
  getCaseCount(counties: string[], range: string): Observable<County[]> {
    let param = this.buildParams(counties, range);
    const options = counties ?
      { params: new HttpParams().set('county', param).set('range', range)  } : {};

    return this.http.get<County[]>(this.BASE_URL + 'cases', options)
      .pipe(
      );
  }

  buildParams(counties: string[], range: string): string {
    var countyParam = counties.join(',');
    return countyParam;
  }

  mapCountiesToCharts(counties: County[]) : Chart[] {
    return counties.map( c => { return {
      name: c.county, 
      series: this.mapTimelineToSeries(c.timeline)
    }});
  }

  mapTimelineToSeries(timeline: Timeline[]): Series[] {
    return timeline.map( tl => { return {
      value: tl.cases,
      name: tl.date
    }})
  }


}

