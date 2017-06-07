import {Component, OnInit} from 'angular2/core';
import {PostsService} from '../services/posts.service';

@Component({
    templateUrl: 'app/views/posts.component.html'
})
export class PostsComponent implements OnInit {
    constructor (private _postsService: PostsService){

    }

    ngOnInit() {

    }
}
