import {NgModule} from '@angular/core';
import {TimeFromNowPipe} from './time-from-now.pipe';

@NgModule({
  imports: [],
  declarations: [TimeFromNowPipe],
  providers: [],
  exports: [
    TimeFromNowPipe
  ],
  bootstrap: []
})
export class PipesModule {
}
