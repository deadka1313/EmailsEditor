import CreateEmailForm from '../src';

describe('Test CreateEmailForm', () => {
    const div = document.createElement('div');
    const createEmailForm = new CreateEmailForm(div);

    test('test getEmail before work', () => {
        expect(createEmailForm.getEmails().length).toBe(0);
    });

    test('test setEmail', () => {
        const validEmail = 'asdsad@mail.com';
        const invalidEmail = 'asdsadsad';

        createEmailForm.setEmail(validEmail);
        const emails = createEmailForm.getEmails();
        expect(emails.find(item => item === validEmail)).toBe(validEmail);
        expect(createEmailForm.getEmails().length).toBe(1);

        createEmailForm.setEmail(invalidEmail);
        expect(createEmailForm.getEmails().length).toBe(1);
    });
});
