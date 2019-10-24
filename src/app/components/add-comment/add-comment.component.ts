import {Component, Input, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import {FileLoggerService} from '../../shared/file-logger.service';
import {CommentsService} from '../../shared/comments.service';
import {AppMessageGlobalService} from '../../shared/app.messageglobal.service';
import * as moment from 'moment';
import * as uuid from 'uuid';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss']
})

export class AddCommentComponent implements OnInit {
  @Input() tenancy: string;
  @Input() commentId: string;
  commentForm: FormGroup;
  comments: any;

  constructor(private formBuilder: FormBuilder, private logger: FileLoggerService, private commentsService: CommentsService, private globalMsgService: AppMessageGlobalService) {
  }

  ngOnInit() {
    this.initForm();
    this.getComments();
  }

  initForm() {
    this.commentForm = this.formBuilder.group({
      commentText: new FormControl('', Validators.compose([
        Validators.required
      ])),
      author: new FormControl(environment.defaultLogin.username, Validators.compose([
        Validators.required
      ])),
      datetime: new FormControl(moment().valueOf(), Validators.compose([
        Validators.required
      ])),
      likes: new FormControl(0, Validators.compose([
        Validators.required
      ])),
      dislikes: new FormControl(0, Validators.compose([
        Validators.required
      ])),
      replies: new FormControl([], Validators.compose([])),
      id: new FormControl(uuid.v4(), Validators.compose([
        Validators.required
      ])),
    });
  }

  onSubmit() {
    if (!this.commentForm.valid) {
      // TODO: Throw a toast error or validation message
      return;
    }
    this.logger.debug('New Comment', this.commentForm.value);
    switch (this.tenancy) {
      case 'comment':
        this.addComment(this.comments, this.commentForm.value);
        break;
      case 'reply':
        this.addReply(this.comments, this.commentId, this.commentForm.value);
        break;
    }
  }

  getComments() {
    this.comments = this.commentsService.getComments();
    if (!this.comments) {
      this.comments = [];
    }
    this.logger.debug('Current Comments', this.comments);
  }

  addComment(comments, newComment) {
    comments.push(newComment);
    this.commentsService.addComment(comments);
    this.globalMsgService.sendMessage({type: 'COMMENTS', action: 'NEW_COMMENT'});
    this.initForm();
  }

  addReply(comments, commentId, reply) {
    const current_comment = this.comments.find((element) => {
      return element.id === commentId;
    });
    const current_comment_index = this.comments.indexOf(current_comment);
    current_comment.replies.push(reply);
    this.comments[current_comment_index] = current_comment;
    this.commentsService.addComment(this.comments);
    this.logger.debug(`Found comment`, current_comment);
    this.logger.debug(`Found comment Index`, current_comment_index);
    this.globalMsgService.sendMessage({type: 'COMMENTS', action: 'NEW_COMMENT'});
    this.initForm();

  }
}
