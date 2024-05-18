import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { OverlayContainer } from '@angular/cdk/overlay';
import { map } from 'rxjs/operators';
import { ComicService } from '../../../dataSource/services/comic.service';
import { Comic } from '../../../dataSource/schema/comic';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../../dataSource/services/account.service';



@Component({
  selector: 'comment-component',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {

  form!: FormGroup;
  @Input()
  comicId!: number;
  @Input()
  lastchapterID!: number;
  listComments!: any;
  replyId: number = -1;
  isLogin!: boolean;
  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private route: ActivatedRoute,
  ) {
    this.form = this.formBuilder.group({
      content: ['', Validators.required],
    });
  }
  ngOnInit(): void {

    this.refreshcomments();
    this.isLogin = this.accountService.isAuthenticated();


  }
  refreshcomments() {
    this.accountService.GetCommentsByComicId(this.comicId).subscribe((res: any) => {
      this.listComments = res.data;
      console.log(this.listComments);

    })
  }
  ngOnChanges() {

  }

  onSubmit(parentCommentId: number) {
    if (!this.form.valid) return;
    this.accountService.AddComment(this.lastchapterID, this.form.value.content, parentCommentId).subscribe((res: any) => {
      if (res.status === 1) {
        this.refreshcomments();
      }
    })
    this.form.reset();
  }
  reply(commentId: number) {
    this.replyId = commentId
  }

}

