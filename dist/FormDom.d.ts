import { IEmailIsValid } from './core/IEmailIsValid';
export default class FormDom {
    private readonly element;
    private readonly placeholderElement;
    private readonly wrapperForm;
    private readonly hideElementWidthForInput;
    private setFocusInput;
    private onInput;
    private getTextWidth;
    constructor(elem: HTMLElement);
    readonly inputElement: HTMLTextAreaElement;
    readonly wrapperEmails: HTMLElement;
    addEmailDOM: (email: IEmailIsValid) => void;
    removeEmailDOM: (name: string) => void;
    removeEmailsDOM: () => void;
    resetInput: () => void;
}
