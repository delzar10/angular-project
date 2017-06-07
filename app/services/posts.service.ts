import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Injectable()
export class PostsService {
    private _url: string = "https://jsonplaceholder.typicode.com/users"

    constructor(private _http: Http) {

    }

    getPosts () {
        return this._http.get(this._url).map(result => result.json());
    }
}
