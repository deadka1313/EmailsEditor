import './index.sass';
import { ICreateEmailForm } from './ICreateEmailForm';
import { IEmailIsValid } from './IEmailIsValid';
import { checkEnterLetter, checkForRepeatedEmails, checkValidationEmails, checkValidEmail } from './helpers';
import FormDom from './FormDom';

export default class CreateEmailForm implements ICreateEmailForm {
    private formDom: FormDom;

    private emails: IEmailIsValid[] = [];

    private onChange = (e: Event | null): void => {
        if (e) {
            const value = (e.target as HTMLTextAreaElement).innerText;
            if (value.length === 1 && checkEnterLetter(value)) {
                this.formDom.resetInput();
            }
            if (value && value.length > 1 && checkEnterLetter(value)) {
                this.addEmail(value);
            }
        }
    };

    private onBlur = (e: Event | null): void => {
        if (e) {
            const email = (e.target as HTMLTextAreaElement).innerText.replace(/(^\s*)|(\s*)$/g, '');
            if (email) {
                this.addEmail(email);
            }
        }
    };

    private enterValuesToStore = (): void => {
        if (this.formDom.inputElement) {
            const inputText = this.formDom.inputElement.innerHTML;
            this.addEmail(inputText);
            this.formDom.resetInput();
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
                this.formDom.addEmailDOM(item);
                const itemDOM = this.formDom.wrapperEmails.querySelector(`[data-email-name="${item.name}"]`);
                itemDOM?.addEventListener('click', e => this.removeEmail(e));
            }
        });

        this.formDom.resetInput();
    };

    private removeEmail = (e: Event | null): void => {
        if (e) {
            const email = ((e.target as HTMLTextAreaElement).parentElement as HTMLElement).dataset.emailName as string;
            this.emails = this.emails.filter(item => item.name !== email);
            this.formDom.removeEmailDOM(email);
        }
    };

    constructor(element: HTMLElement) {
        this.formDom = new FormDom(element);

        if (this.formDom.inputElement) {
            // fix IE 11
            const inputEventType = /Trident/.test(navigator.userAgent) ? 'textinput' : 'input';

            this.formDom.inputElement.addEventListener(inputEventType, e => this.onChange(e));
            this.formDom.inputElement.addEventListener('blur', e => this.onBlur(e));
            this.formDom.inputElement.addEventListener('paste', () => {
                this.enterValuesToStore();
            });
            this.formDom.inputElement.addEventListener('keydown', e => {
                if ((e as KeyboardEvent).key === 'Enter') {
                    this.enterValuesToStore();
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
