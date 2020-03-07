import { notEmpty } from './helpers';
import { IEmailIsValid } from './IEmailIsValid';

export default class FormDom {
    private setFocusInput = (e: Event | null): void => {
        if (
            e &&
            this.inputElement &&
            (e.target as HTMLTextAreaElement).className.indexOf('emails-editor_input') === -1 &&
            (e.target as HTMLTextAreaElement).className.indexOf('emails-editor_closebtn') === -1 &&
            (e.target as HTMLTextAreaElement).className.indexOf('emails-editor_email') === -1
        ) {
            this.inputElement.focus();
            const range = document.createRange();
            range.selectNodeContents(this.inputElement);
            range.collapse(false);
            const sel = window.getSelection();
            sel?.removeAllRanges();
            sel?.addRange(range);
        }
    };

    private onFocus = (): void => {
        if (this.placeholderElement) {
            this.placeholderElement.style.display = 'none';
        }
    };

    private onBlur = (): void => {
        if (this.placeholderElement) {
            this.placeholderElement.style.display = 'inline-block';
        }
    };

    constructor(elem: HTMLElement) {
        this.element = elem;

        this.element.innerHTML =
            '<div class="emails-editor_form">' +
            '<span class="email-editor_wrapper-emails">' +
            '</span>' +
            '<span class="emails-editor_input" contenteditable="true">' +
            '</span>' +
            '<span class="emails-editor_placeholder">add more people…</span>' +
            '</div>';

        this.placeholderElement = notEmpty(this.element.querySelector('.emails-editor_placeholder') as HTMLElement);
        this.wrapperForm = notEmpty(this.element.querySelector('.emails-editor_form') as HTMLElement);
        this.inputElement = notEmpty(this.element.querySelector('.emails-editor_input') as HTMLElement);
        this.wrapperEmails = notEmpty(this.element.querySelector('.email-editor_wrapper-emails') as HTMLElement);

        this.wrapperForm.addEventListener('click', e => this.setFocusInput(e));
        this.inputElement.addEventListener('focus', () => this.onFocus());
        this.inputElement.addEventListener('blur', () => this.onBlur());
    }

    readonly element: HTMLElement;
    readonly placeholderElement: HTMLElement;
    readonly wrapperForm: HTMLElement;
    readonly inputElement: HTMLElement;
    readonly wrapperEmails: HTMLElement;

    addEmailDOM = (email: IEmailIsValid): void => {
        if (this.wrapperForm) {
            this.wrapperForm.scrollTop = this.wrapperForm.scrollHeight;
        }
        const newElement = document.createElement('span');
        newElement.innerHTML = email.name;
        newElement.className = `emails-editor_email emails-editor_email__${email.isValid ? 'valid' : 'invalid'}`;
        newElement.dataset.emailName = email.name;

        const newDeleteItemElement = document.createElement('span');
        newDeleteItemElement.innerHTML = '&times;';
        newDeleteItemElement.className = 'emails-editor_closebtn';
        newElement.appendChild(newDeleteItemElement);

        this.wrapperEmails.appendChild(newElement);
    };

    removeEmailDOM = (name: string): void => {
        const item = this.wrapperEmails.querySelector(`[data-email-name="${name}"]`);
        item?.parentNode?.removeChild(item);
    };

    resetInput = (): void => {
        this.inputElement.innerHTML = '';
    };
}
