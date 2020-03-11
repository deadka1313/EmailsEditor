import './index.sass';
import { ICreateEmailForm } from './core/ICreateEmailForm';
export default class CreateEmailForm implements ICreateEmailForm {
    private formDom;
    private emails;
    private callback;
    private callCallback;
    private onChange;
    private onBlur;
    private enterValuesToStore;
    private addEmail;
    private removeEmail;
    private removeEmails;
    constructor(element: HTMLElement, callback?: () => void);
    setEmail(email: string): void;
    getEmails(isValid?: boolean): string[];
    replaceEmails(emails: string): void;
}
