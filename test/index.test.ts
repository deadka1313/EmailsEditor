import CreateEmailForm from '../src';

describe('Test CreateEmailForm', () => {
    const div = document.createElement('div');
    const createEmailForm = new CreateEmailForm(div);

    test('test getEmail before work', () => {
        expect(createEmailForm.getEmail().length).toBe(0);
    });

    test('test setEmail', () => {
        const validEmail = 'asdsad@mail.com';
        const invalidEmail = 'asdsadsad';

        createEmailForm.setEmail(validEmail);
        const emails = createEmailForm.getEmail();
        expect(emails.find(item => item === validEmail)).toBe(validEmail);
        expect(createEmailForm.getEmail().length).toBe(1);

        createEmailForm.setEmail(invalidEmail);
        expect(createEmailForm.getEmail().length).toBe(1);
    });
});
