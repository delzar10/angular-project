import {Component, OnInit} from 'angular2/core';
import {PostsService} from '../services/posts.service';
import {UsersService} from '../services/users.service';
import {SpinnerComponent} from './spinner.component';
import {PaginationComponent} from './pagination.component';

@Component({
    templateUrl: 'app/views/posts.component.html',
    providers: [PostsService, UsersService],
    directives: [SpinnerComponent, PaginationComponent],
    styles: [`
        .posts li { cursor: default; }
        .posts li:hover { background: #ecf0f1; }
        .list-group-item.active,
        .list-group-item.active:hover,
        .list-group-item.active:focus {
            background-color: #ecf0f1;
            border-color: #ecf0f1;
            color: #2c3e50;
        }
    `]
})
export class PostsComponent implements OnInit {
    posts: any[];
    users: any[];
    pagedPosts;
    currentPost: any;
    postsLoading: boolean = true;
    commentsLoading: boolean = true;
    pageSize = 10;

    constructor (
        private _postsService: PostsService,
        private _usersService: UsersService){
    }

    ngOnInit() {
        this.loadUsers();
        this.loadPosts();
    }

    select(post) {
        this.currentPost = post;
        this.commentsLoading = true;
        this._postsService
            .getComments(post.id)
            .subscribe(
                comments => this.currentPost.comments = comments,
                err => console.log(err),
                () => this.commentsLoading = false //finally
            );
    }

    reloadPosts(filter) {
        this.currentPost = null;
        this.loadPosts(filter);
    }

    private loadPosts(filter?){
        this._postsService
            .getPosts(filter)
            .subscribe(
                posts => {
                    this.posts = posts;
                    this.pagedPosts = this.getPostsInPage(1);
                },
                error => console.log(error),
                () => this.postsLoading = false
            );
    }

    private loadUsers(){
        this._usersService
            .getUsers()
            .subscribe( users => {
               this.users = users;
            })
    }


    onPageChange(page){
        this.pagedPosts = this.getPostsInPage(page);
    }

    private getPostsInPage(page) {
        var result = [];
        var startingIndex = (page - 1) * this.pageSize;
        var endIndex = Math.min(startingIndex + this.pageSize, this.posts.length)

        for (var i = startingIndex; i < endIndex; i++)
          result.push(this.posts[i]);

        return result;
    }
}
