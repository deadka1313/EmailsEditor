import './index.sass';
import { ICreateEmailForm } from './ICreateEmailForm';
export default class CreateEmailForm implements ICreateEmailForm {
    private element;
    private setHtmlForm;
    private setFocusInput;
    private onChangeInput;
    constructor(element: HTMLElement);
    setEmail(): string;
    getEmail(): string;
}
