import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Injectable()
export class PostsService {
    private _url: string = "http://jsonplaceholder.typicode.com/posts"

    constructor(private _http: Http) {

    }

    getPosts(filter?) {
        var url = this._url;

        if (filter && filter.userId)
          url += '?userId=' + filter.userId;

        return this._http.get(url).map(result => result.json());
    }

       getComments(postId){
           return this._http.get(this._url + "/" + postId + "/comments")
               .map(res => res.json());
       }
}
