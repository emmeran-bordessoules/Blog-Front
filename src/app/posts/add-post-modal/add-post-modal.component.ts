import {Component, inject, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
// import {Post} from '../../post';
import {PostService} from '../../post.service';

@Component({
  selector: 'app-add-post-modal',
  templateUrl: './add-post-modal.component.html',
  styleUrls: ['./add-post-modal.component.css']
})
export class AddPostModalComponent implements OnInit {
  @Input() id;

  post = {
    title: '',
    content: ''
  };
  loading: boolean;

  constructor(private activeModal: NgbActiveModal,
              private postService: PostService) {
  }

  ngOnInit() {
    if (this.id) {
      this.getPost(this.id);
    }
  }

  save(): void {
    this.startLoading();
    this.postService.postPost(this.post).subscribe(
      () => this.activeModal.close(),
      error => console.log(error)
    ).add(() => this.stopLoading());
  }

  edit(): void {
    this.startLoading();
    this.postService.editPost(this.id, this.post).subscribe(
      () => this.activeModal.close(),
      error => console.log(error)
    ).add(() => this.stopLoading());
  }

  getPost(id): void {
    this.postService.getPost(id).subscribe(
      post => this.post = post,
      error => console.log(error)
    );
  }

  startLoading(): void {
    this.loading = true;
  }

  stopLoading(): void {
    this.loading = false;
  }
}
