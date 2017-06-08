import {Component, OnInit} from 'angular2/core';
import {UsersService} from '../services/users.service';
import {Observable} from 'rxjs/Observable';
import {HTTP_PROVIDERS} from 'angular2/http';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {User} from './user';

@Component({
    templateUrl: 'app/views/users.component.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [UsersService, HTTP_PROVIDERS]
})
export class UsersComponent implements OnInit {
    isLoading: boolean = true;
    users: any[];

    constructor(private _usersService: UsersService) {

    }

    ngOnInit() {
       this._usersService.getUsers().subscribe(users => {
            this.isLoading = false;
            this.users = users;
        });
    }

    deleteUser(user: User) {
        if (confirm('Estás seguro de eliminar al usuario?')){
            var index = this.users.indexOf(user)

            this.users.splice(index, 1);

           this._usersService.deleteUser(user.id).subscribe(null, err => {
                alert('Could not delete the user');

                this.users.splice(index, 0, user);
           });
        }
    }
}
