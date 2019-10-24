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

  constructor(
    private commentsService: CommentsService,
    private logger: FileLoggerService,
    private globalMsgService: AppMessageGlobalService
  ) {
    this.new_comment = commentsService.initComment();
    this.globalMsgService.getMessage().subscribe(async (message) => {
      if (message.type === 'COMMENTS' && message.action === 'NEW_COMMENT') {
        await this.getComments();
      }
    });
  }

  async ngOnInit() {
    await this.getComments();
  }

  async getComments() {
    this.loading = true;
    this.comments = this.commentsService.getComments();
    if (this.comments) {
      this.comments_count = this.comments.length;
    }
    this.logger.info(`Comments at Init - ${this.comments.length}`);
  }

  /**
   * Method to open the reply box for a comment
   *
   * @param index [number]
   */
  onOpenReply(index) {
    this.comments[index].initReply = true;
  }

  /**
   * Method to close the reply box for a comment
   *
   * @param index [number]
   */
  onCloseReply(index) {
    this.comments[index].initReply = false;
  }

  /**
   * Method to register a like/dislike for a comment or a reply
   * TODO: When functionality for likes and dislikes increase this can be moved to it's own component
   *
   * @param type [like, dislike]
   * @param tenancy [comment, reply]
   * @param index [number]
   * @param sub_index [number]
   */
  onActivity(type, tenancy, index, sub_index = null) {
    switch (tenancy) {
      case 'comment':
        if (type === 'like') {
          this.comments[index].likes += 1;
        }
        if (type === 'dislike') {
          this.comments[index].dislikes += 1;
        }
        this.commentsService.addComment(this.comments);
        break;
      case 'reply':
        this.logger.info(sub_index);
        if (sub_index !== false && type === 'like') {
          this.comments[index].replies[sub_index].likes += 1;
        }
        if (sub_index !== false && type === 'dislike') {
          this.comments[index].replies[sub_index].dislikes += 1;
        }
        if (sub_index === false) {
          this.logger.info('sub_index is needed when liking a reply');
        }
        this.commentsService.addComment(this.comments);
        break;
    }
  }

  /**
   * Method to seed localstorage with comments data from comments.json
   */
  onSeedComments() {
    this.commentsService.seedComments().subscribe((data) => {
      this.comments = data;
      this.comments_count = this.comments.length;
      this.commentsService.addComment(this.comments);
    });
  }
}
