import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppMessageGlobalService} from '../shared/app.messageglobal.service';

import {AddCommentComponent} from './add-comment/add-comment.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    AddCommentComponent
  ],
  exports: [
    AddCommentComponent
  ],
  providers: []
})

export class ComponentsModule {
}
