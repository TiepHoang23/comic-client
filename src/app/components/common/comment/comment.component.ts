import { AfterViewInit, Component, ElementRef, Inject, Input, OnInit, QueryList, SimpleChanges, ViewChildren, viewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { OverlayContainer } from '@angular/cdk/overlay';
import { map } from 'rxjs/operators';
import { ComicService } from '../../../dataSource/services/comic.service';
import { Comic } from '../../../dataSource/schema/comic';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../../dataSource/services/account.service';
import { animate, keyframes, query, stagger, state, style, transition, trigger } from '@angular/animations';
import { DOCUMENT } from '@angular/common';



@Component({
  selector: 'comment-component',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
  animations: [
    trigger("inOutAnimation", [
      state("in", style({ opacity: 1 })),
      transition(":enter", [
        animate(
          1000,
          keyframes([
            style({ opacity: 0, offset: 0 }),
            style({ opacity: 0.25, offset: 0.25 }),
            style({ opacity: 0.5, offset: 0.5 }),
            style({ opacity: 0.75, offset: 0.75 }),
            style({ opacity: 1, offset: 1 }),
          ])
        )
      ]),
      transition(":leave", [
        animate(
          300,
          keyframes([
            style({ opacity: 1, offset: 0 }),
            style({ opacity: 0.75, offset: 0.25 }),
            style({ opacity: 0.5, offset: 0.5 }),
            style({ opacity: 0.25, offset: 0.75 }),
            style({ opacity: 0, offset: 1 }),
          ])
        )
      ])
    ])
  ]
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

  @ViewChildren('ViewReplyEle') ViewReplyEles!: QueryList<ElementRef>;
  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private route: ActivatedRoute,
    private myElement: ElementRef,
    @Inject(DOCUMENT) private document: Document,
  ) {
    this.form = this.formBuilder.group({
      content: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.isLogin = this.accountService.isAuthenticated();
  }
  WindowScroll = (event: any) => {
    if (this.document?.defaultView?.scrollY || 0 >= this.myElement.nativeElement.offsetTop) {
      this.refreshcomments();
      this.document.removeEventListener('scroll', this.WindowScroll);
    }

  }
  ngAfterViewInit() {

  }
  refreshcomments() {
    this.accountService.GetCommentsByComicId(this.comicId).subscribe((res: any) => {
      this.listComments = res.data;
      console.log(this.listComments);
    })
  }


  onSubmit(parentCommentId: number) {
    if (!this.form.valid) return;
    this.accountService.AddComment(this.lastchapterID, this.form.value.content, parentCommentId).subscribe((res: any) => {
      if (res.status === 1) {
        if (parentCommentId === 0) {
          this.listComments.unshift(res.data);
        }
        else {
          let parentComment = this.listComments.find((comment: any) => comment.id === parentCommentId)
          if (parentComment.replies) parentComment.replies.push(res.data);
          else parentComment.replies = [res.data];
        }
      }
    })
    this.form.reset();
  }
  reply(commentId: number) {
    this.replyId = commentId
    let El = this.ViewReplyEles.find(element => element.nativeElement.getAttribute('reply-block') === commentId.toString())
    El?.nativeElement.classList.remove('h-0');
  }
  ViewReplyCmt(commentId: number) {
    let El = this.ViewReplyEles.find(element => element.nativeElement.getAttribute('reply-block') === commentId.toString())
    El?.nativeElement.classList.toggle('h-0');
  }


  ngOnChanges(change: any) {

    if (this.document?.defaultView?.scrollY || 0 >= this.myElement.nativeElement.offsetTop) {
      this.refreshcomments();
    }
    else {
      this.document.addEventListener('scroll', this.WindowScroll)
    }
  }
}
