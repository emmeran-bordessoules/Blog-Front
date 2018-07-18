import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {PostService} from '../post.service';
import {CommentService} from '../comment.service';
import {Comment} from '../comment';
import {Post} from '../post';
import {AddPostModalComponent} from '../posts/add-post-modal/add-post-modal.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {EditCommentComponent} from '../edit-comment/edit-comment.component';
import * as Constants from '../shared/constants';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  post: Post;
  comments: Comment[];
  comment = '';
  idPost: number;

  constructor(private commentService: CommentService,
              private postService: PostService,
              private route: ActivatedRoute,
              private modalService: NgbModal,
              private location: Location) {
  }

  ngOnInit() {
    this.idPost = +this.route.snapshot.paramMap.get('id');
    this.getPost(this.idPost);
    this.getComments(this.idPost);
  }

  getPost(id): void {
    this.postService.getPost(id).subscribe(
      post => this.post = post,
      error => console.log(error)
    );
  }

  editPost() {
    const modal = this.modalService.open(AddPostModalComponent);
    modal.result.then(
      () => this.getPost(this.idPost),
      (reason) => {
        console.log(`Dismissed ${reason}`);
      }
    );
    modal.componentInstance.id = this.idPost;
  }

  deletePost() {
    this.postService.deletePost(this.idPost).subscribe(
      () => this.location.back(),
      (error) => console.log(error)
    );
  }

  getComments(id): void {
    this.commentService.getComments(id).subscribe(
      comments => this.comments = comments,
      error => console.log(error)
    );
  }

  sendComment(): void {
    const data = {
      content: this.comment,
      postId: this.idPost
    };
    this.commentService.postComment(data).subscribe(
      () => {
        this.getComments(this.idPost);
        this.comment = '';
      },
      error => console.log(error)
    );
  }

  deleteComment(idComment): void {
    this.commentService.deleteComment(idComment).subscribe(
      () => this.getComments(this.idPost),
      error => console.log(error)
    );
  }

  editComment(id) {
    const modal = this.modalService.open(EditCommentComponent);
    modal.result.then(
      () => this.getComments(this.idPost),
      (reason) => {
        console.log(`Dismissed ${reason}`);
      }
    );
    modal.componentInstance.id = id;
  }

  isConnected(): boolean {
    return !!sessionStorage.getItem(Constants.SESSION_STORAGE.TOKEN_KEY);
  }

  isAdmin(): boolean {
    return sessionStorage.getItem(Constants.SESSION_STORAGE.USER_ROLE) === Constants.ROLES.ADMIN;
  }
}
