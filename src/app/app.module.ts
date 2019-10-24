import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgxLocalStorageModule} from 'ngx-localstorage';
import {HttpClientModule} from '@angular/common/http';
import {AvatarModule} from 'ngx-avatar';

import {CommentsService} from './shared/comments.service';
import {LocalStorageHelperService} from './shared/local-storage-helper.service';
import {BaseSettingsService} from './shared/base-settings.service';
import {AppMessageGlobalService} from './shared/app.messageglobal.service';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ComponentsModule} from './components/components.module';
import {PipesModule} from './pipes/pipes.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxLocalStorageModule.forRoot(),
    ComponentsModule,
    AvatarModule,
    PipesModule
  ],
  providers: [
    CommentsService,
    LocalStorageHelperService,
    BaseSettingsService,
    AppMessageGlobalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
