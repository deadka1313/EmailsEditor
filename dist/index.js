'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var CreateEmailForm = /** @class */ (function () {
    function CreateEmailForm(element) {
        var _this = this;
        this.setHtmlForm = function () {
            _this.element.innerHTML =
                '<div class="emails-editor_form">' +
                    '<div class="emails-editor_input" contenteditable="true">' +
                    '</div>' +
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
            var div = _this.element.querySelector('div.emails-editor_input');
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
        return 'getEmail';
    };
    return CreateEmailForm;
}());

exports.default = CreateEmailForm;
//# sourceMappingURL=index.js.map
