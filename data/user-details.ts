import {User} from "../types/user.types";

export const firstUser: User = {
    first_name: 'Mary',
    last_name: 'Lie',
    email: 'mary.lie@example.com',
    password: '123423@@',
    confirm_password: '123423@@'
}
export const firstUserAvatar: string = './images/avatar-character.jpeg';
export const secondUserAvatar: string = './images/avatar-icon.png';
export const thirdUserAvatar: string = './images/avatar.gif';

export const UserWithMismatchedPasswords: User = {
    first_name: 'Mary',
    last_name: 'Lie',
    email: 'mary.lie@example.com',
    password: '123423@test',
    confirm_password: '123423@'
}

export const UserWithInvalidEmail: User = {
    first_name: 'Mary',
    last_name: 'Lie',
    email: '33',
    password: '123423@test',
    confirm_password: '123423@'
}

export const UserWithInvalidFields: User = {
    first_name: 'Mary',
    last_name: '',
    email: '',
    password: '123423@test',
    confirm_password: '123423@'
}

