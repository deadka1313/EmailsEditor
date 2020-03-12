import './index.sass';
import { ICreateEmailForm } from './core/ICreateEmailForm';
import { IEmailIsValid } from './core/IEmailIsValid';
import { checkEnterLetter, checkForRepeatedEmails, checkIsValidationEmails, checkValidEmail } from './helpers';
import FormDom from './FormDom';

export default class CreateEmailForm implements ICreateEmailForm {
    private formDom: FormDom;

    private emails: IEmailIsValid[] = [];

    private callback: () => void;

    private callCallback = (): void => {
        this.callback();
    };

    private onChange = (e: Event | null): void => {
        if (e) {
            const value = (e.target as HTMLTextAreaElement).value;
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
            const email = (e.target as HTMLTextAreaElement).value.replace(/(^\s*)|(\s*)$/g, '');
            if (email) {
                this.addEmail(email);
            }
        }
    };

    private enterValuesToStore = (): void => {
        if (this.formDom.inputElement) {
            const value = this.formDom.inputElement.value;
            this.addEmail(value);
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
        this.callCallback();
        this.formDom.resetInput();
    };

    private removeEmail = (e: Event | null): void => {
        if (e) {
            const email = ((e.target as HTMLTextAreaElement).parentElement as HTMLElement).dataset.emailName as string;
            this.emails = this.emails.filter(item => item.name !== email);
            this.formDom.removeEmailDOM(email);
            this.callCallback();
        }
    };

    private removeEmails = (): void => {
        this.emails = [];
        this.formDom.removeEmailsDOM();
    };

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    constructor(element: HTMLElement, callback: () => void = (): void => {}) {
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

        this.callback = callback;
    }

    public setEmail(email: string): void {
        this.addEmail(email);
    }

    public getEmails(isValid = true): string[] {
        return checkIsValidationEmails(isValid, this.emails).map(item => {
            return item.name;
        });
    }

    public replaceEmails(emails: string): void {
        this.removeEmails();
        this.addEmail(emails);
    }
}
