import './index.sass';
import { ICreateEmailForm } from './ICreateEmailForm';
export default class CreateEmailForm implements ICreateEmailForm {
    private element;
    private placeholderElement;
    private validEmails;
    private setHtmlForm;
    private setFocusInput;
    private onChangeInput;
    private onFocusInput;
    private onBlurInput;
    constructor(element: HTMLElement);
    setEmail(): string;
    getEmail(): string[];
}
