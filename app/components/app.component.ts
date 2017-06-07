import {Component} from 'angular2/core';
import {NavBarComponent} from './navbar.component';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import {HomeComponent}  from './home.component';
import {UsersComponent} from './users.component';
import {UserFormComponent}  from './user-form.component';
import {PostsComponent} from './posts.component';

@RouteConfig([
    { path: '/',               name: 'Home' ,    component: HomeComponent, useAsDefault: true },
    { path: '/users',          name: 'Users',    component: UsersComponent },
    { path: '/users/edit/:id', name: 'EditUser', component: UsersComponent },
    { path: '/users/new',      name: 'AddUser',  component: UserFormComponent},
    { path: '/posts',          name: 'Posts',    component: PostsComponent },
    { path: '/*other',         name: 'Other',    redirectTo: ['Home'] }
])
@Component({
    selector: 'app',
    templateUrl: 'app/views/app.component.html',
    directives: [NavBarComponent, ROUTER_DIRECTIVES]
})
export class AppComponent {

}
