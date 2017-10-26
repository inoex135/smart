import { NgModule } from '@angular/core';
import { HumanizeTimePipe } from './humanize-time/humanize-time';
import { IndonesianDatePipe } from './indonesian-date/indonesian-date';
@NgModule({
	declarations: [HumanizeTimePipe,
    IndonesianDatePipe],
	imports: [],
	exports: [HumanizeTimePipe,
    IndonesianDatePipe]
})
export class PipesModule {}
