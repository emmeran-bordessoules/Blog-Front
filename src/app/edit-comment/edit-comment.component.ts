import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {CommentService} from '../comment.service';

@Component({
  selector: 'app-edit-comment',
  templateUrl: './edit-comment.component.html',
  styleUrls: ['./edit-comment.component.css']
})
export class EditCommentComponent implements OnInit {
  @Input() id;

  comment = {
    content: ''
  };

  constructor(private activeModal: NgbActiveModal,
              private commentService: CommentService) {
  }

  ngOnInit() {
    this.getComment();
  }

  edit(): void {
    this.commentService.editComment(this.id, this.comment).subscribe(
      () => this.activeModal.close(),
      error => console.log(error)
    );
  }

  getComment(): void {
    this.commentService.getComment(this.id).subscribe(
      comment => this.comment = comment,
      error => console.log(error)
    );
  }
}
