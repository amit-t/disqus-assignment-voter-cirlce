import {Injectable} from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Comment} from '../interfaces/comment';

import {LocalStorageHelperService} from './local-storage-helper.service';
import {BaseSettingsService} from './base-settings.service';

// @ts-ignore
@Injectable({
  providedIn: 'root'
})

export class CommentsService {

  constructor(private localStorage: LocalStorageHelperService, private baseSettings: BaseSettingsService, private http: HttpClient) {
  }

  initComment() {
    return new Comment();
  }

  getComments() {
    return this.localStorage.get(this.baseSettings.commentKey);
  }

  addComment(comments: [Comment]) {
    return this.localStorage.set(this.baseSettings.commentKey, comments);
  }

  seedComments(): Observable<any> {
    return this.http.get('./assets/data/comments.json');
  }

}
