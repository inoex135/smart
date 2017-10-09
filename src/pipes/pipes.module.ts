import { NgModule } from '@angular/core';
import { HumanizeTimePipe } from './humanize-time/humanize-time';
@NgModule({
	declarations: [HumanizeTimePipe],
	imports: [],
	exports: [HumanizeTimePipe]
})
export class PipesModule {}
