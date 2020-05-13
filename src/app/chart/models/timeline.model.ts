export class County {
    county: string;
    population: number;
    count: number;
    timeline: Timeline[]
}

export class Timeline {
    date: string;
    amount: number;
}

export class Chart {
    name: string;
    series: Series[]
}

export class Series {
    name: string;
    value: number;
}

export class ChartType {
    label: string;
    type: string;
    data: string;
}