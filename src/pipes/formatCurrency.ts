import { Pipe, PipeTransform } from '@angular/core';
import { LPUtils } from '../providers/LPUtils';

@Pipe({
    name: 'formatCurrency',
    pure: false
})
export class FormatCurrency implements PipeTransform {
    constructor(public utils:LPUtils) {
        
    }

    transform(value: string) {
        if(value == null)
            return;
            
        return 'Rp ' + this.utils.formatCurrency(value);
    }
}
