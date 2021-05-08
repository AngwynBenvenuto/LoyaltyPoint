import { Pipe, PipeTransform } from '@angular/core';
import { LPUtils } from '../providers/LPUtils';

@Pipe({
    name: 'formatNumber',
    pure: false
})
export class FormatNumber implements PipeTransform {
    constructor(public utils:LPUtils) {
        
    }

    transform(value: string) {
        if(value == null)
            return;
            
        return this.utils.formatCurrency(value);
    }
}
