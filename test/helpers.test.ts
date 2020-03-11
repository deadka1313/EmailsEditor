import {
    checkValidEmail,
    checkEnterLetter,
    checkIsValidationEmails,
    checkForRepeatedEmails,
    notEmpty,
} from '../src/helpers';
import { IEmailIsValid } from '../src/core/IEmailIsValid';

const emails: IEmailIsValid[] = [
    {
        name: 'mail@mail.com',
        isValid: true,
    },
    {
        name: 'mail.mail.com',
        isValid: false,
    },
    {
        name: 'asdfhghjsd@.com',
        isValid: false,
    },
    {
        name: 'asdfhghjsd@',
        isValid: false,
    },
    {
        name: 'asdfhghjsd@dfg.',
        isValid: false,
    },
    {
        name: '@.com',
        isValid: false,
    },
    {
        name: 'asdfhghjsd@.',
        isValid: false,
    },
];

describe('Test helpers', () => {
    test('checkValidEmail', () => {
        emails.map(item => {
            expect(checkValidEmail(item.name)).toBe(item.isValid);
        });
    });

    test('checkEnterLetter', () => {
        expect(checkEnterLetter('mail@mail.com,')).toBe(true);
        expect(checkEnterLetter('mail@mail.com ')).toBe(true);
        expect(checkEnterLetter('word')).toBe(false);
    });

    test('checkValidationEmails', () => {
        const validEmails: IEmailIsValid[] = [
            {
                name: 'mail@mail.com',
                isValid: true,
            },
        ];
        expect(checkIsValidationEmails(true, emails)).toMatchObject(validEmails);
    });

    test('checkForRepeatedEmails', () => {
        expect(checkForRepeatedEmails('mail@mail.com', emails)).toBe(true);
        expect(checkForRepeatedEmails('asdfhghjsd@dfg.', emails)).toBe(true);
        expect(checkForRepeatedEmails('mail@mail.comaaaaa', emails)).toBe(false);
        expect(checkForRepeatedEmails('mail@mail.comaaaaa', [])).toBe(false);
    });

    test('notEmpty', () => {
        const item = 1;
        expect(notEmpty(item)).toBe(item);
        expect(() => notEmpty('')).toThrow();
    });
});
