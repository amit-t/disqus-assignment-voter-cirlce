import {Component, OnInit} from '@angular/core';
import {CommentsService} from './shared/comments.service';
import {FileLoggerService} from './shared/file-logger.service';
import {AppMessageGlobalService} from './shared/app.messageglobal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private loading = false;
  private new_comment;
  private comments: any;
  private comments_count = 0;

  constructor(private commentsService: CommentsService, private logger: FileLoggerService, private globalMsgService: AppMessageGlobalService) {
    this.new_comment = commentsService.initComment();
  }

  async ngOnInit() {
    await this.getComments();
    this.globalMsgService.getMessage().subscribe(async (message) => {
      if (message.type === 'COMMENTS' && message.action === 'NEW_COMMENT') {
        await this.getComments();
      }
    });
  }

  async getComments() {
    this.loading = true;
    this.comments = this.commentsService.getComments();
    if (this.comments) {
      this.comments_count = this.comments.length;
    }
    this.logger.info(`Comments at Init - ${JSON.stringify(this.comments)}`);
  }

  onOpenReply(index) {
    this.comments[index].initReply = true;
  }
  onCloseReply(index) {
    this.comments[index].initReply = false;
  }
}
