import { NgModule } from '@angular/core';
import { FormatTranslate } from './formatTranslate';
import { FormatDatePipe } from './formatDate';
import { FormatCurrency } from './formatCurrency';
import { FormatNumber } from './formatNumber';

const pipes = [
   FormatTranslate,
   FormatDatePipe,
   FormatCurrency,
   FormatNumber
];

@NgModule({
   declarations: [
      pipes
   ],
   imports: [],
   exports: [
      pipes			
   ]
})
export class PipesModule {}
