import './index.sass';
import { ICreateEmailForm } from './ICreateEmailForm';

export default class CreateEmailForm implements ICreateEmailForm {
    private element: HTMLElement;

    private setHtmlForm = (): void => {
        this.element.innerHTML =
            '<div class="emails-editor_form">' +
            '<div class="emails-editor_input" contenteditable="true">' +
            '</div>' +
            '<span class="emails-editor_placeholder">add more people…</span>' +
            '</div>';
        const divForm = this.element.querySelector('.emails-editor_form');
        if (divForm) {
            divForm.addEventListener('click', this.setFocusInput);
        }
        const divInput = this.element.querySelector('.emails-editor_input');
        if (divInput) {
            divInput.addEventListener('input', e => this.onChangeInput(e));
        }
    };

    private setFocusInput = (): void => {
        const div = this.element.querySelector('div.emails-editor_input');
        if (div instanceof HTMLElement) {
            div.focus();
        }
    };

    private onChangeInput = (e: Event | null): void => {
        console.log(e && (e.target as HTMLTextAreaElement).innerText);
    };

    constructor(element: HTMLElement) {
        this.element = element;
        this.setHtmlForm();
    }

    public setEmail(): string {
        return 'setEmail';
    }

    public getEmail(): string {
        return 'getEmail';
    }
}
