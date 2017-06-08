System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var UserValidators;
    return {
        setters:[],
        execute: function() {
            // import {UsersService} from '../services/users.service';
            UserValidators = (function () {
                function UserValidators() {
                }
                UserValidators.shouldBeUnique = function (control) {
                    return new Promise(function (resolve, reject) {
                        setTimeout(function (_) {
                            if (control.value === '1234')
                                resolve({
                                    shouldBeUnique: {
                                        error: 'Name is already taken.'
                                    }
                                });
                            else
                                resolve(null);
                        }, 1000);
                    });
                };
                UserValidators.email = function (control) {
                    var regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    var valid = regEx.test(control.value);
                    return valid ? null : { email: true };
                };
                UserValidators.cannotContainSpace = function (control) {
                    if (!control.value)
                        return null;
                    if (control.value.indexOf(' ') >= 0)
                        return { cannotContainSpace: {
                                error: "Cannot Contain Spaces"
                            } };
                    return null;
                };
                return UserValidators;
            }());
            exports_1("UserValidators", UserValidators);
        }
    }
});
//# sourceMappingURL=user.validators.js.map