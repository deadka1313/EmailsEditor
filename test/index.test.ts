import CreateEmailForm from '../src';

describe('Test CreateEmailForm', () => {
    const div = document.createElement('div');
    const createEmailForm = new CreateEmailForm(div);

    test('test getEmail before work', () => {
        expect(createEmailForm.getEmail().length).toBe(0);
    });

    test('test setEmail', () => {
        const newEmail = 'asdsad@.mail.com';
        createEmailForm.setEmail(newEmail);
        const emails = createEmailForm.getEmail();
        expect(emails.find(item => item === newEmail)).toBe(newEmail);
        expect(createEmailForm.getEmail().length).toBe(1);
    });
});
