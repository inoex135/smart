import { NgModule } from '@angular/core';
import { HumanizeTimePipe } from './humanize-time/humanize-time';
import { IndonesianDatePipe } from './indonesian-date/indonesian-date';
import { CustomDatePipe } from './custom-date/custom-date';
@NgModule({
	declarations: [HumanizeTimePipe,
    IndonesianDatePipe,
    CustomDatePipe],
	imports: [],
	exports: [HumanizeTimePipe,
    IndonesianDatePipe,
    CustomDatePipe]
})
export class PipesModule {}
