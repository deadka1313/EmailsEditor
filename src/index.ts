const createEmailForm = (element: HTMLElement): void => {
    console.log('2', element);
    element.innerHTML = '<input type="text" name="text1" value="enter email" />';
};
export default createEmailForm;
