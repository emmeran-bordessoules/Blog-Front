import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {PostsComponent} from './posts/posts.component';
import {PostDetailComponent} from './post-detail/post-detail.component';
import {AddPostModalComponent} from './posts/add-post-modal/add-post-modal.component';
import {EditCommentComponent} from './edit-comment/edit-comment.component';
import {LoginComponent} from './login/login.component';

@NgModule({
  declarations: [
    AddPostModalComponent,
    AppComponent,
    PostsComponent,
    PostDetailComponent,
    EditCommentComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgbModule.forRoot(),
    AppRoutingModule
  ],
  entryComponents: [
    AddPostModalComponent,
    EditCommentComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
