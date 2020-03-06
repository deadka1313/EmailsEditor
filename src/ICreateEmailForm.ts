import { IEmailsIsValid } from './IEmailsIsValid';

export interface ICreateEmailForm {
    setEmail(): string;

    getEmail(): IEmailsIsValid[];
}
