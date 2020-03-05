'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var CreateEmailForm = /** @class */ (function () {
    function CreateEmailForm(element) {
        var _this = this;
        this.validEmails = [];
        this.setHtmlForm = function () {
            _this.element.innerHTML =
                '<div class="emails-editor_form">' +
                    '<span class="emails-editor_email emails-editor_email__valid">john@miro.com</span>' +
                    '<span class="emails-editor_email emails-editor_email__invalid">invalid.email</span>' +
                    '<span class="emails-editor_email emails-editor_email__valid">mike@miro.com</span>' +
                    '<span class="emails-editor_email emails-editor_email__valid">alexander@miro.com</span>' +
                    '<span class="emails-editor_input" contenteditable="true">' +
                    '</span>' +
                    '<span class="emails-editor_placeholder">add more people…</span>' +
                    '</div>';
            var divForm = _this.element.querySelector('.emails-editor_form');
            if (divForm) {
                divForm.addEventListener('click', _this.setFocusInput);
            }
            var divInput = _this.element.querySelector('.emails-editor_input');
            if (divInput) {
                divInput.addEventListener('input', function (e) { return _this.onChangeInput(e); });
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

exports.default = CreateEmailForm;
//# sourceMappingURL=index.js.map
