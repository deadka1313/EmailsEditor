import './index.sass';
import { ICreateEmailForm } from './ICreateEmailForm';
export default class CreateEmailForm implements ICreateEmailForm {
    private readonly element;
    private readonly placeholderElement;
    private isPaste;
    private isEdit;
    private emails;
    private updateDom;
    private generateEmailsDom;
    private setFocusInput;
    private onFocusInput;
    private onChangeInput;
    private onBlurInput;
    private checkEnterWord;
    private addEmail;
    private checkValid;
    private removeEmail;
    private checkForMatch;
    private checkValidEmailsStore;
    constructor(element: HTMLElement);
    setEmail(email: string): void;
    getEmail(): string[];
}
