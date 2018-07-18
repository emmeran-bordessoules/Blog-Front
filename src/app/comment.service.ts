import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/index';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Comment} from './comment';
import * as Constants from './shared/constants';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  token = Constants.getToken();

  constructor(private http: HttpClient) { }

  getComments(id): Observable<Comment[]> {
    return this.http.get<Comment[]>(Constants.baseUrl + `/api/posts/${id}/comments`, this.token);
  }

  getComment(id): Observable<Comment> {
    return this.http.get<Comment>(Constants.baseUrl + `/api/comments/${id}`, this.token);
  }

  deleteComment(id): Observable<any> {
    return this.http.delete(Constants.baseUrl + `/api/comments/${id}`, this.token);
  }

  postComment(data): Observable<any> {
    return this.http.post(Constants.baseUrl + '/api/comments', data, this.token);
  }

  editComment(id, data): Observable<any> {
    return this.http.put(Constants.baseUrl + `/api/comments/${id}`, data, this.token);
  }
}
