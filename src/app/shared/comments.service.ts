import {Injectable} from '@angular/core';
import {LocalStorageHelperService} from './local-storage-helper.service';
import {BaseSettingsService} from './base-settings.service';

import {Comment} from '../interfaces/comment';

// @ts-ignore
@Injectable({
  providedIn: 'root'
})

export class CommentsService {

  constructor(private localStorage: LocalStorageHelperService, private baseSettings: BaseSettingsService) {
  }

  initComment() {
    return new Comment();
  }

  getComments() {
    return this.localStorage.get(this.baseSettings.commentKey);
  }

  addComment(comments: [Comment]) {
    return this.localStorage.set(this.baseSettings.commentKey, comments)

  }

}
