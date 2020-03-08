import CreateEmailForm from '../src';

describe('Test CreateEmailForm API', () => {
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

describe('Test elements', () => {
    test('test snapshot', () => {
        const tree = document.createElement('div');
        new CreateEmailForm(tree);
        expect(tree).toMatchSnapshot();
    });

    test('test DOM', () => {
        const tree = document.createElement('div');
        new CreateEmailForm(tree);

        const placeholderElement = tree.querySelector('.emails-editor_placeholder');
        const wrapperForm = tree.querySelector('.emails-editor_form');
        const inputElement = tree.querySelector('.emails-editor_input');
        const wrapperEmails = tree.querySelector('.email-editor_wrapper-emails');
        const hideElementWidthForInput = tree.querySelector('.emails-editor_fake-span');

        expect(placeholderElement).not.toBe(null);
        expect(wrapperForm).not.toBe(null);
        expect(inputElement).not.toBe(null);
        expect(wrapperEmails).not.toBe(null);
        expect(hideElementWidthForInput).not.toBe(null);
    });
});
