var CreateEmailForm = /** @class */ (function () {
    function CreateEmailForm(element) {
        var _this = this;
        this.placeholderElement = null;
        this.validEmails = ['john@miro.com', 'mike@miro.com', 'alexander@miro.com'];
        // private invalidEmails: string[] = ['invalid.email'];
        this.setHtmlForm = function () {
            _this.element.innerHTML =
                '<div class="emails-editor_form">' +
                    '<span class="emails-editor_email emails-editor_email__valid">' +
                    'john@miro.com' +
                    '<span class="emails-editor_closebtn" onclick="this.parentElement.style.display=\'none\';">&times;</span>' +
                    '</span>' +
                    '<span class="emails-editor_email emails-editor_email__invalid">' +
                    'invalid.email' +
                    '<span class="emails-editor_closebtn" onclick="this.parentElement.style.display=\'none\';">&times;</span>' +
                    '</span>' +
                    '<span class="emails-editor_email emails-editor_email__valid">' +
                    'mike@miro.com' +
                    '<span class="emails-editor_closebtn" onclick="this.parentElement.style.display=\'none\';">&times;</span>' +
                    '</span>' +
                    '<span class="emails-editor_email emails-editor_email__valid">' +
                    'alexander@miro.com' +
                    '<span class="emails-editor_closebtn" onclick="this.parentElement.style.display=\'none\';">&times;</span>' +
                    '</span>' +
                    '<span class="emails-editor_input" contenteditable="true">' +
                    '</span>' +
                    '<span class="emails-editor_placeholder">add more people…</span>' +
                    '</div>';
            var divForm = _this.element.querySelector('.emails-editor_form');
            _this.placeholderElement = _this.element.querySelector('.emails-editor_placeholder');
            if (divForm) {
                divForm.addEventListener('click', _this.setFocusInput);
            }
            var divInput = _this.element.querySelector('.emails-editor_input');
            if (divInput) {
                divInput.addEventListener('input', function (e) { return _this.onChangeInput(e); });
                divInput.addEventListener('focus', function () { return _this.onFocusInput(); });
                divInput.addEventListener('blur', function (e) { return _this.onBlurInput(e); });
            }
        };
        this.setFocusInput = function () {
            var div = _this.element.querySelector('span.emails-editor_input');
            if (div instanceof HTMLElement) {
                div.focus();
            }
        };
        this.onChangeInput = function (e) {
            console.log(e && e.target.innerText);
        };
        this.onFocusInput = function () {
            if (_this.placeholderElement) {
                _this.placeholderElement.style.display = 'none';
            }
            console.log('onFocusInput', _this.placeholderElement);
        };
        this.onBlurInput = function (e) {
            if (_this.placeholderElement) {
                _this.placeholderElement.style.display = 'inline-block';
            }
            console.log('onBlurInput', e, _this.placeholderElement);
        };
        this.element = element;
        this.setHtmlForm();
    }
    CreateEmailForm.prototype.setEmail = function () {
        return 'setEmail';
    };
    CreateEmailForm.prototype.getEmail = function () {
        return this.validEmails;
    };
    return CreateEmailForm;
}());

export default CreateEmailForm;
//# sourceMappingURL=index.es.js.map
