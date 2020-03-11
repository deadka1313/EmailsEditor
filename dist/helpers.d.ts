import { IEmailIsValid } from './core/IEmailIsValid';
export declare const checkValidEmail: (email: string) => boolean;
export declare const checkEnterLetter: (word: string) => boolean;
export declare const checkIsValidationEmails: (isValid: boolean, emails: IEmailIsValid[]) => IEmailIsValid[];
export declare const checkForRepeatedEmails: (email: string, emails: IEmailIsValid[]) => boolean;
export declare const notEmpty: <T>(item: T) => T;
