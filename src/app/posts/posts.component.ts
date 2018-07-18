import {Component, OnInit} from '@angular/core';
import {Post} from '../post';
import {PostService} from '../post.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AddPostModalComponent} from './add-post-modal/add-post-modal.component';
import * as Constants from '../shared/constants';
import {log} from 'util';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts: Post[];

  constructor(private modalService: NgbModal,
              private postService: PostService) {
  }

  addPost() {
    this.modalService.open(AddPostModalComponent).result.then(
      () => this.getPosts(),
      (reason) => {
        console.log(`Dismissed ${reason}`);
      });
  }

  editPost(id) {
    const modal = this.modalService.open(AddPostModalComponent);
    modal.result.then(
      () => this.getPosts(),
      (reason) => {
        console.log(`Dismissed ${reason}`);
      });
    modal.componentInstance.id = id;
  }

  deletePost(id) {
    this.postService.deletePost(id).subscribe(
      () => this.getPosts(),
      (error) => console.log(error)
    );
  }

  ngOnInit() {
    this.getPosts();
  }

  getPosts(): void {
    this.postService.getPosts().subscribe(
      posts => this.posts = posts,
      error => console.log(error)
    );
  }

  isAdmin(): boolean {
    return sessionStorage.getItem(Constants.SESSION_STORAGE.USER_ROLE) === Constants.ROLES.ADMIN;
  }
}
