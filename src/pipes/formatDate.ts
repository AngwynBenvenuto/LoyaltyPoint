import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'formatDate',
    pure: false
})
export class FormatDatePipe implements PipeTransform {
    constructor() {
    }

    transform(value: string) {
        if(value == null) 
            return;

        let t: any = value.split(/[- :]/); // regular expression split that creates array with: year, month, day, hour, minutes, seconds values
        var date = new Date(Date.UTC(t[0], t[1] - 1, t[2], t[3], t[4], t[5]));

        var monthNames = [
            "Januari", "Februari", "Maret",
            "April", "Mei", "Juni", "Juli",
            "Agustus", "September", "Oktober",
            "November", "Desember"
        ];
        var day = date.getDate();
        var monthIndex = date.getMonth();
        var year = date.getFullYear();

        if(isNaN(day) || isNaN(monthIndex) || isNaN(year))
            return '';
        return day + ' ' + monthNames[monthIndex] + ' ' + year;
    }
}
