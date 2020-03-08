import './index.sass';
import { ICreateEmailForm } from './core/ICreateEmailForm';
export default class CreateEmailForm implements ICreateEmailForm {
    private formDom;
    private emails;
    private onChange;
    private onBlur;
    private enterValuesToStore;
    private addEmail;
    private removeEmail;
    constructor(element: HTMLElement);
    setEmail(email: string): void;
    getEmails(): string[];
}
