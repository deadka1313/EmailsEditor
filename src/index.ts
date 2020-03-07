import './index.sass';
import { ICreateEmailForm } from './ICreateEmailForm';
import { IEmailIsValid } from './IEmailIsValid';
import { checkEnterLetter, checkForRepeatedEmails, checkValidationEmails, checkValidEmail } from './helpers';

export default class CreateEmailForm implements ICreateEmailForm {
    private readonly element: HTMLElement;
    private readonly placeholderElement: HTMLElement | null = null;

    private isEdit = false;

    private emails: IEmailIsValid[] = [];

    private updateDom = (isRemove = false): void => {
        const wrapperElement = this.element.querySelector('.email-editor_wrapper-emails');
        if (wrapperElement) {
            wrapperElement.innerHTML = this.generateEmailsDom(isRemove);
            const emailElements = this.element.querySelectorAll('.emails-editor_closebtn');
            for (let i = 0; i < emailElements.length; i++) {
                const emailElement = emailElements[i];
                emailElement.addEventListener('click', e => this.removeEmail(e));
            }
        }
    };

    private generateEmailsDom = (isRemove = false): string => {
        let emailDom = '';
        this.emails.map(item => {
            emailDom +=
                `<span class="emails-editor_email emails-editor_email__${item.isValid ? 'valid' : 'invalid'}">` +
                item.name +
                '<span class="emails-editor_closebtn">&times;</span>' +
                '</span>';
        });
        if (!isRemove) {
            const divForm = this.element.querySelector('.emails-editor_form');
            if (divForm) {
                divForm.scrollTop = divForm.scrollHeight;
            }
        }
        return emailDom;
    };

    private setFocusInput = (e: Event | null): void => {
        const div = this.element.querySelector('span.emails-editor_input');
        if (
            e &&
            (e.target as HTMLTextAreaElement).className.indexOf('emails-editor_input') === -1 &&
            (e.target as HTMLTextAreaElement).className.indexOf('emails-editor_closebtn') === -1 &&
            (e.target as HTMLTextAreaElement).className.indexOf('emails-editor_email') === -1 &&
            !this.isEdit &&
            div instanceof HTMLElement
        ) {
            this.isEdit = true;
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

    private onFocus = (): void => {
        if (this.placeholderElement) {
            this.placeholderElement.style.display = 'none';
            this.isEdit = false;
        }
    };

    private onChange = (e: Event | null): void => {
        if (e) {
            const value = (e.target as HTMLTextAreaElement).innerText;
            if (value.length === 1 && checkEnterLetter(value)) {
                const divInput = this.element.querySelector('.emails-editor_input');
                if (divInput) {
                    divInput.innerHTML = '';
                }
            }
            if (value && value.length > 1 && checkEnterLetter(value)) {
                this.addEmail(value);
            }
        }
    };

    private onBlur = (e: Event | null): void => {
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

    private addEmail = (email: string): void => {
        let inputEmails: string = email.replace(/(^\s*)|(\s*)$/g, '');
        inputEmails = inputEmails.replace(/(,\s*)$/g, ',');
        const inputEmailsSplit: string[] = inputEmails.split(/\s|,/).filter(item => item);
        const newEmails: IEmailIsValid[] = inputEmailsSplit.map(item => {
            return {
                name: item,
                isValid: checkValidEmail(item),
            };
        });
        newEmails.map(item => {
            if (!checkForRepeatedEmails(item.name, this.emails)) {
                this.emails.push(item);
            }
        });

        const divInput = this.element.querySelector('.emails-editor_input');
        if (divInput) {
            divInput.innerHTML = '';
        }

        this.updateDom();
    };

    private removeEmail = (e: Event | null): void => {
        if (e) {
            const email = ((e.target as HTMLTextAreaElement).parentElement as HTMLElement).innerHTML.split('<')[0];
            this.emails = this.emails.filter(item => item.name !== email);
            this.updateDom(true);
        }
    };

    constructor(element: HTMLElement) {
        this.element = element;
        this.element.innerHTML =
            '<div class="emails-editor_form">' +
            '<span class="email-editor_wrapper-emails">' +
            this.generateEmailsDom() +
            '</span>' +
            '<span class="emails-editor_input" contenteditable="true">' +
            '</span>' +
            '<span class="emails-editor_placeholder">add more people…</span>' +
            '</div>';

        this.placeholderElement = this.element.querySelector('.emails-editor_placeholder');

        const divForm = this.element.querySelector('.emails-editor_form');
        if (divForm) {
            divForm.addEventListener('click', e => this.setFocusInput(e));
        }

        const divInput = this.element.querySelector('.emails-editor_input');
        if (divInput) {
            // fix IE 11
            const inputEventType = /Trident/.test(navigator.userAgent) ? 'textinput' : 'input';

            divInput.addEventListener(inputEventType, e => this.onChange(e));
            divInput.addEventListener('focus', () => this.onFocus());
            divInput.addEventListener('blur', e => this.onBlur(e));
            divInput.addEventListener('keydown', e => {
                if (
                    (e as KeyboardEvent).key === 'Enter' ||
                    (((e as KeyboardEvent).ctrlKey || (e as KeyboardEvent).metaKey) && (e as KeyboardEvent).key === 'v')
                ) {
                    // for IE 11
                    const divInput = this.element.querySelector('.emails-editor_input');
                    if (divInput) {
                        const inputText = divInput.innerHTML;
                        inputText && this.addEmail(inputText);
                        divInput.innerHTML = '';
                    }
                }
            });
        }
    }

    public setEmail(email: string): void {
        this.addEmail(email);
    }

    public getEmails(): string[] {
        return checkValidationEmails(this.emails).map(item => {
            return item.name;
        });
    }
}
