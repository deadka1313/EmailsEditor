import './index.sass';
import { ICreateEmailForm } from './ICreateEmailForm';

export default class CreateEmailForm implements ICreateEmailForm {
    private element: HTMLElement;
    private placeholderElement: HTMLElement | null = null;

    private validEmails: string[] = ['john@miro.com', 'mike@miro.com', 'alexander@miro.com'];
    // private invalidEmails: string[] = ['invalid.email'];

    private setHtmlForm = (): void => {
        this.element.innerHTML =
            '<div class="emails-editor_form">' +
            '<span class="emails-editor_email emails-editor_email__valid">' +
            'john@miro.com' +
            '<span class="emails-editor_closebtn" onclick="this.parentElement.style.display=\'none\';">&times;</span>' +
            '</span>' +
            '<span class="emails-editor_email emails-editor_email__invalid">' +
            'invalid.email' +
            '<span class="emails-editor_closebtn" onclick="this.parentElement.style.display=\'none\';">&times;</span>' +
            '</span>' +
            '<span class="emails-editor_email emails-editor_email__valid">' +
            'mike@miro.com' +
            '<span class="emails-editor_closebtn" onclick="this.parentElement.style.display=\'none\';">&times;</span>' +
            '</span>' +
            '<span class="emails-editor_email emails-editor_email__valid">' +
            'alexander@miro.com' +
            '<span class="emails-editor_closebtn" onclick="this.parentElement.style.display=\'none\';">&times;</span>' +
            '</span>' +
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

    private checkEnterWord = (value: string) => {
        return /[\s,]/g.test(value);
    };

    constructor(element: HTMLElement) {
        this.element = element;
        this.setHtmlForm();
    }

    public setEmail(): string {
        return 'setEmail';
    }

    public getEmail(): string[] {
        return this.validEmails;
    }
}
