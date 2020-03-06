import './index.sass';
import { ICreateEmailForm } from './ICreateEmailForm';
import { IEmailsIsValid } from './IEmailsIsValid';

export default class CreateEmailForm implements ICreateEmailForm {
    private element: HTMLElement;
    private placeholderElement: HTMLElement | null = null;

    private emails: IEmailsIsValid[] = [
        {
            name: 'john@miro.com',
            isValid: true,
        },
        {
            name: 'invalid.email',
            isValid: false,
        },
        {
            name: 'john@miro.com',
            isValid: true,
        },
        {
            name: 'alexander@miro.com',
            isValid: true,
        },
    ];

    private setHtmlForm = (): void => {
        this.element.innerHTML =
            '<div class="emails-editor_form">' +
            this.generateEmailsDom() +
            '<span class="emails-editor_input" contenteditable="true">' +
            '</span>' +
            '<span class="emails-editor_placeholder">add more people…</span>' +
            '</div>';
        const divForm = this.element.querySelector('.emails-editor_form');

        this.placeholderElement = this.element.querySelector('.emails-editor_placeholder');
        if (divForm) {
            divForm.addEventListener('click', e => this.setFocusInput(e));
        }
        const divInput = this.element.querySelector('.emails-editor_input');
        if (divInput) {
            divInput.addEventListener('input', e => this.onChangeInput(e));
            divInput.addEventListener('focus', () => this.onFocusInput());
            divInput.addEventListener('blur', e => this.onBlurInput(e));
        }
    };

    private generateEmailsDom = (): string => {
        let emailDom = '';
        this.emails.map(item => {
            emailDom +=
                `<span class="emails-editor_email emails-editor_email__${item.isValid ? 'valid' : 'invalid'}">` +
                item.name +
                '<span class="emails-editor_closebtn" onclick="this.parentElement.style.display=\'none\';">&times;</span>' +
                '</span>';
        });
        return emailDom;
    };

    private setFocusInput = (e: Event | null): void => {
        const div = this.element.querySelector('span.emails-editor_input');
        if (e && (e.target as HTMLTextAreaElement).className !== 'emails-editor_input' && div instanceof HTMLElement) {
            div.focus();
            const range = document.createRange();
            range.selectNodeContents(div);
            range.collapse(false);
            const sel = window.getSelection();
            if (sel) {
                sel.removeAllRanges();
                sel.addRange(range);
            }
        }
    };

    private onChangeInput = (e: Event | null): void => {
        if (e) {
            const value = (e.target as HTMLTextAreaElement).innerText;
            if (value && value.length > 1 && this.checkEnterWord(value)) {
                console.log('correct', value);
            }
        }
    };

    private onFocusInput = (): void => {
        if (this.placeholderElement) {
            this.placeholderElement.style.display = 'none';
        }
    };

    private onBlurInput = (e: Event | null): void => {
        if (this.placeholderElement) {
            this.placeholderElement.style.display = 'inline-block';
        }
        console.log(e);
    };

    private checkEnterWord = (value: string): boolean => {
        return /[\s,]/g.test(value);
    };

    constructor(element: HTMLElement) {
        this.element = element;
        this.setHtmlForm();
    }

    public setEmail(): string {
        return 'setEmail';
    }

    public getEmail(): IEmailsIsValid[] {
        return this.emails.filter(item => item.isValid);
    }
}
