import { checkregularEmail } from './constants';
import { IEmailIsValid } from './core/IEmailIsValid';

export const checkValidEmail = (email: string): boolean => {
    const pattern = new RegExp(checkregularEmail);
    return pattern.test(email);
};

export const checkEnterLetter = (word: string): boolean => {
    return /[\s,]/g.test(word);
};

export const checkIsValidationEmails = (isValid: boolean, emails: IEmailIsValid[]): IEmailIsValid[] => {
    return emails.filter(item => isValid === item.isValid);
};

export const checkForRepeatedEmails = (email: string, emails: IEmailIsValid[]): boolean => {
    for (let i = 0; i < emails.length; i++) {
        if (emails[i].name === email) {
            return true;
        }
    }
    return false;
};

export const notEmpty = <T>(item: T): T => {
    if (item) {
        return item;
    } else {
        throw new Error(`Empty property`);
    }
};
