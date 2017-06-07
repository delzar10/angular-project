import {Control} from 'angular2/common';
// import {UsersService} from '../services/users.service';

export class UserValidators {

    static shouldBeUnique(control: Control) {
        return new Promise((resolve, reject) => {
            setTimeout( _ => {
                if (control.value === '1234')
                    resolve({
                      shouldBeUnique: {
                          error: 'Name is already taken.'
                      }
                    });
                else
                    resolve(null);
            }, 1000)
        });
    }

    static cannotContainSpace(control: Control) {
        if (control.value.indexOf(' ') >= 0)
            return { cannotContainSpace: {
                error: "Cannot Contain Spaces";
            }};

        return null;
    }
}
