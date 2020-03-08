import { notEmpty } from './helpers';
import { IEmailIsValid } from './core/IEmailIsValid';

export default class FormDom {
    private readonly element: HTMLElement;
    private readonly placeholderElement: HTMLElement;
    private readonly wrapperForm: HTMLElement;

    private readonly hideElementWidthForInput: HTMLElement;

    private setFocusInput = (e: Event | null): void => {
        if (
            e &&
            this.inputElement &&
            (e.target as HTMLTextAreaElement).className.indexOf('emails-editor_input') === -1 &&
            (e.target as HTMLTextAreaElement).className.indexOf('emails-editor_closebtn') === -1 &&
            (e.target as HTMLTextAreaElement).className.indexOf('emails-editor_email') === -1
        ) {
            this.inputElement.focus();
        }
    };

    private onInput = (e: Event): void => {
        const value = (e.target as HTMLTextAreaElement)?.value;
        this.inputElement.style.width = 2 + this.getTextWidth(value) + 'px';
        if (value) {
            this.placeholderElement.style.display = 'none';
        } else if (this.placeholderElement.style.display === 'none') {
            this.placeholderElement.style.display = 'inline-block';
        }
    };

    private getTextWidth = (value = ''): number => {
        this.hideElementWidthForInput.innerHTML = value;
        return this.hideElementWidthForInput.offsetWidth;
    };

    constructor(elem: HTMLElement) {
        this.element = elem;

        this.element.innerHTML =
            '<div class="emails-editor_form">' +
            '<span class="email-editor_wrapper-emails">' +
            '</span>' +
            '<input class="emails-editor_input" />' +
            '<span class="emails-editor_fake-span">' +
            '</span>' +
            '<span class="emails-editor_placeholder">add more people…</span>' +
            '</div>';

        this.placeholderElement = notEmpty(this.element.querySelector('.emails-editor_placeholder') as HTMLElement);
        this.wrapperForm = notEmpty(this.element.querySelector('.emails-editor_form') as HTMLElement);
        this.inputElement = notEmpty(this.element.querySelector('.emails-editor_input') as HTMLTextAreaElement);
        this.wrapperEmails = notEmpty(this.element.querySelector('.email-editor_wrapper-emails') as HTMLElement);
        this.hideElementWidthForInput = notEmpty(this.element.querySelector('.emails-editor_fake-span') as HTMLElement);

        this.wrapperForm.addEventListener('click', e => this.setFocusInput(e));
        this.inputElement.addEventListener('input', e => this.onInput(e));
    }

    readonly inputElement: HTMLTextAreaElement;
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
        this.inputElement.value = '';
        this.inputElement.style.width = this.getTextWidth() + 'px';
        this.placeholderElement.style.display = 'inline-block';
    };
}
