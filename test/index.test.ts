import CreateEmailForm from '../src';
import '@testing-library/jest-dom';

describe('Test CreateEmailForm', () => {
    const div = document.createElement('div');
    const createEmailForm = new CreateEmailForm(div);

    test('test setEmail', () => {
        expect(createEmailForm.setEmail()).toBe('setEmail');
    });
    test('test getEmail', () => {
        expect(createEmailForm.getEmail().length).toBe(0);
    });
});
