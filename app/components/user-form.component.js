System.register(['angular2/core', 'angular2/common', 'angular2/router', '../services/users.service', 'angular2/http', '../validators/user.validators', './user'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, common_1, router_1, users_service_1, http_1, user_validators_1, user_1;
    var UserFormComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (users_service_1_1) {
                users_service_1 = users_service_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (user_validators_1_1) {
                user_validators_1 = user_validators_1_1;
            },
            function (user_1_1) {
                user_1 = user_1_1;
            }],
        execute: function() {
            UserFormComponent = (function () {
                function UserFormComponent(formBuilder, _router, _routeParams, _userService) {
                    this._router = _router;
                    this._routeParams = _routeParams;
                    this._userService = _userService;
                    this.user = new user_1.User();
                    this.form = formBuilder.group({
                        name: ['', common_1.Validators.compose([
                                common_1.Validators.required,
                                user_validators_1.UserValidators.cannotContainSpace
                            ]), user_validators_1.UserValidators.shouldBeUnique],
                        email: ['', common_1.Validators.compose([
                                common_1.Validators.required,
                                user_validators_1.UserValidators.email,
                                user_validators_1.UserValidators.cannotContainSpace
                            ]), user_validators_1.UserValidators.shouldBeUnique],
                        phone: ['', common_1.Validators.compose([
                                common_1.Validators.required,
                                common_1.Validators.minLength(10)])],
                        address: formBuilder.group({
                            street: ['', common_1.Validators.required],
                            suite: ['', common_1.Validators.required],
                            city: ['', common_1.Validators.required],
                            zipcode: ['', common_1.Validators.required],
                        })
                    });
                }
                UserFormComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    var id = this._routeParams.get("id");
                    this.title = id ? "Edit User" : "New User";
                    if (id)
                        this._userService.getUser(id);
                    this._userService.getUser(id).subscribe(function (user) { return _this.user = user; }, function (response) {
                        if (response.status == 404) {
                            _this._router.navigate(['Other']);
                        }
                    });
                };
                UserFormComponent.prototype.onSubmit = function () {
                };
                UserFormComponent.prototype.routerCanDeactivate = function (nextInstruction, prevInstruction) {
                    if (this.form.dirty)
                        return confirm('Estas seguro de cambiar de pagina?');
                    return true;
                };
                ;
                UserFormComponent.prototype.save = function () {
                    var _this = this;
                    var result;
                    if (this.user.id)
                        result = this._userService.updateUser(this.user);
                    else
                        result = this._userService.addUser(this.user);
                    result.subscribe(function (x) {
                        // Ideally, here we'd want:
                        // this.form.markAsPristine();
                        _this._router.navigate(['Users']);
                    });
                };
                UserFormComponent = __decorate([
                    core_1.Component({
                        templateUrl: 'app/views/user-form.component.html',
                        providers: [users_service_1.UsersService, http_1.HTTP_PROVIDERS]
                    }), 
                    __metadata('design:paramtypes', [common_1.FormBuilder, router_1.Router, router_1.RouteParams, users_service_1.UsersService])
                ], UserFormComponent);
                return UserFormComponent;
            }());
            exports_1("UserFormComponent", UserFormComponent);
        }
    }
});
//# sourceMappingURL=user-form.component.js.map