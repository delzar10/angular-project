import {Component, OnInit}  from 'angular2/core'
import {FormBuilder, ControlGroup, Validators} from 'angular2/common'
import {Router, CanDeactivate, RouteParams} from 'angular2/router';
import {UsersService} from '../services/users.service';
import {HTTP_PROVIDERS} from 'angular2/http';
import {UserValidators} from '../validators/user.validators';
import {User} from './user';

@Component({
    templateUrl: 'app/views/user-form.component.html',
    providers: [UsersService, HTTP_PROVIDERS]
})
export class UserFormComponent implements CanDeactivate {
    form: ControlGroup;
    title: string;
    user: User = new User();

    constructor(
      formBuilder: FormBuilder,
      private _router: Router,
      private _routeParams: RouteParams,
      private _userService: UsersService
    ) {
        this.form = formBuilder.group({
            name: ['', Validators.compose([
                Validators.required,
                UserValidators.cannotContainSpace
            ]), UserValidators.shouldBeUnique],
            email: ['', Validators.compose([
                Validators.required,
                UserValidators.email,
                UserValidators.cannotContainSpace
            ]), UserValidators.shouldBeUnique],
            phone: ['', Validators.compose([
                Validators.required,
                Validators.minLength(10)]
            )],
            address: formBuilder.group({
                street:  ['', Validators.required],
                suite:   ['', Validators.required],
                city:    ['', Validators.required],
                zipcode: ['', Validators.required],
            })
        });
    }

    ngOnInit() {
        var id = this._routeParams.get("id");
        this.title = id ? "Edit User" : "New User";

        if (id)
            this._userService.getUser(id);

        this._userService.getUser(id).subscribe(
            user => this.user = user,
            response => {
              if (response.status == 404) {
                  this._router.navigate(['Other']);
              }
        });
    }

    onSubmit() {

    }

    routerCanDeactivate(nextInstruction, prevInstruction): any {
        if (this.form.dirty)
            return confirm('Estas seguro de cambiar de pagina?');

        return true;
    };

    save() {
        var result;

        if (this.user.id)
          result = this._userService.updateUser(this.user)
        else
          result = this._userService.addUser(this.user);


        result.subscribe(x => {
          // Ideally, here we'd want:
          // this.form.markAsPristine();
          this._router.navigate(['Users']);
        });
    }
}
