export interface ICreateEmailForm {
    setEmail(email: string): void;

    getEmails(isValid: boolean): string[];

    replaceEmails(emails: string): void;
}
