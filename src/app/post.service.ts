import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/index';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Post} from './post';
import * as Constants from './shared/constants';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  token = Constants.getToken();

  constructor(private http: HttpClient) {
  }

  deletePost(id): Observable<any> {
    return this.http.delete(Constants.baseUrl + `/api/posts/${id}`, this.token);
  }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(Constants.baseUrl + '/api/posts', this.token);
  }

  getPost(id): Observable<Post> {
    return this.http.get<Post>(Constants.baseUrl + `/api/posts/${id}`, this.token);
  }

  postPost(data): Observable<any> {
    return this.http.post(Constants.baseUrl + '/api/posts', data, this.token);
  }

  editPost(id, data): Observable<any> {
    return this.http.put(Constants.baseUrl + `/api/posts/${id}`, data, this.token);
  }
}
