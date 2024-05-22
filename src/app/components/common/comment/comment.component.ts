import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Inject,
  Input,
  OnInit,
  QueryList,
  SimpleChanges,
  ViewChildren,
  viewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { OverlayContainer } from '@angular/cdk/overlay';
import { map } from 'rxjs/operators';
import { ComicService } from '../../../dataSource/services/comic.service';
import { Comic } from '../../../dataSource/schema/comic';
import { Comment } from '../../../dataSource/schema/Comment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../../dataSource/services/account.service';
import {
  animate,
  keyframes,
  query,
  stagger,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'comment-component',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
  animations: [
    trigger('inOutAnimation', [
      state('in', style({ opacity: 1 })),
      transition(':enter', [
        animate(
          1000,
          keyframes([
            style({ opacity: 0, offset: 0 }),
            style({ opacity: 0.25, offset: 0.25 }),
            style({ opacity: 0.5, offset: 0.5 }),
            style({ opacity: 0.75, offset: 0.75 }),
            style({ opacity: 1, offset: 1 }),
          ])
        ),
      ]),

    ]),
  ],
})
export class CommentComponent implements OnInit {
  form!: FormGroup;
  @Input()
  comicId!: number;
  @Input()
  lastchapterID!: number;
  listComments: Comment[] = [];
  replyId: number = -1;
  isLogin!: boolean;
  BeginState: boolean = true;

  currentPage: number = 1;
  totalpage: number = 2;

  @ViewChildren('ViewReplyEle') ViewReplyEles!: QueryList<ElementRef>;

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private route: ActivatedRoute,
    private myElement: ElementRef,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.form = this.formBuilder.group({
      content: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.isLogin = this.accountService.isAuthenticated();
  }
  WindowScroll = (event: any) => {
    console.log(this.myElement.nativeElement.offsetTop);

    let ScreenBottomOffset =
      (this.document?.defaultView?.scrollY || 0) +
      (this.document?.defaultView?.innerHeight || 0);

    if (
      ScreenBottomOffset >= this.myElement.nativeElement.offsetTop &&
      this.BeginState
    ) {
      this.BeginState = false;
      this.refreshcomments();
      this.document.removeEventListener('scroll', this.WindowScroll);
    }
  };
  ngAfterViewInit() { }
  ngAfterContentInit() { }
  refreshcomments() {
    this.accountService
      .GetCommentsByComicId(this.comicId)
      .subscribe((res: any) => {
        this.listComments = res.data;
      });
  }

  onSubmit(parentCommentId: number) {
    if (!this.form.valid) return;
    this.accountService
      .AddComment(this.lastchapterID, this.form.value.content, parentCommentId)
      .subscribe((res: any) => {
        if (res.status === 1) {
          if (parentCommentId === 0) {
            this.listComments.unshift(res.data);
          } else {
            let parentComment = this.listComments.find(
              (comment: any) => comment.id === parentCommentId
            );
            if (parentComment) {

              if (parentComment.replies) parentComment.replies.push(res.data);
              else parentComment.replies = [res.data];
            }
          }
        }
      });
    this.form.reset();
  }
  replyCmt(commentId: number) {
    this.replyId = commentId;
    let El = this.ViewReplyEles.find(
      (element) =>
        element.nativeElement.getAttribute('reply-block') === commentId.toString()
    );
    El?.nativeElement.classList.remove('h-0');
  }
  ViewReplyCmt(commentId: number) {
    let El = this.ViewReplyEles.find(
      (element) =>
        element.nativeElement.getAttribute('reply-block') === commentId.toString()
    );
    El?.nativeElement.classList.toggle('h-0');
  }
  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: Event) {
    if ((event.target as Document).defaultView?.scrollY === 0) {
      this.BeginState = true;
    }
  }

  ngOnChanges(change: any) {
    this.document.removeEventListener('scroll', this.WindowScroll);
    this.document.addEventListener('scroll', this.WindowScroll);
  }
}
