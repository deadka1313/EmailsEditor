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

    private updateDom = (): void => {
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
            divForm.scrollTop = divForm.scrollHeight;
        }
        const divInput = this.element.querySelector('.emails-editor_input');
        if (divInput) {
            divInput.addEventListener('input', e => this.onChangeInput(e));
            divInput.addEventListener('focus', () => this.onFocusInput());
            divInput.addEventListener('blur', e => this.onBlurInput(e));
        }
        const emailElements = this.element.querySelectorAll('.emails-editor_closebtn');
        for (let i = 0; i < emailElements.length; i++) {
            const emailElement = emailElements[i];
            emailElement.addEventListener('click', e => this.removeEmail(e));
        }
    };

    private generateEmailsDom = (): string => {
        let emailDom = '';
        this.emails.map(item => {
            emailDom +=
                `<span class="emails-editor_email emails-editor_email__${item.isValid ? 'valid' : 'invalid'}">` +
                item.name +
                '<span class="emails-editor_closebtn">&times;</span>' +
                '</span>';
        });
        return emailDom;
    };

    private setFocusInput = (e: Event | null): void => {
        const div = this.element.querySelector('span.emails-editor_input');
        if (
            e &&
            (e.target as HTMLTextAreaElement).className.indexOf('emails-editor_input') === -1 &&
            (e.target as HTMLTextAreaElement).className.indexOf('emails-editor_closebtn') === -1 &&
            (e.target as HTMLTextAreaElement).className.indexOf('emails-editor_email') === -1 &&
            div instanceof HTMLElement
        ) {
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
        if (e) {
            const email = (e.target as HTMLTextAreaElement).innerText.replace(/(^\s*)|(\s*)$/g, '');
            if (email) {
                this.addEmail(email);
            }
        }
    };

    private checkEnterWord = (value: string): boolean => {
        return /[\s,]/g.test(value);
    };

    private addEmail = (email: string): void => {
        const newEmails: IEmailsIsValid[] = [{ name: email, isValid: true }];
        newEmails.map(item => {
            if (!this.checkForMatch(item.name)) {
                this.emails.push(item);
            }
        });
        this.updateDom();
    };

    private removeEmail = (e: Event | null): void => {
        if (e) {
            const email = ((e.target as HTMLTextAreaElement).parentElement as HTMLElement).innerHTML.split('<')[0];
            this.emails = this.emails.filter(item => item.name !== email);
            this.updateDom();
        }
    };

    private checkForMatch = (email: string): boolean => {
        for (let i = 0; i < this.emails.length; i++) {
            if (this.emails[i].name === email) {
                return true;
            }
        }
        return false;
    };

    private checkValidEmailsStore = (): IEmailsIsValid[] => {
        return this.emails.filter(item => item.isValid);
    };

    constructor(element: HTMLElement) {
        this.element = element;
        this.updateDom();
    }

    public setEmail(email: string): void {
        this.addEmail(email);
    }

    public getEmail(): string[] {
        const returnValidEmails: string[] = this.checkValidEmailsStore().map(item => {
            return item.name;
        });
        return returnValidEmails;
    }
}
