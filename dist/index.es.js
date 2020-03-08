var checkregularEmail = /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i;

var checkValidEmail = function (email) {
    var pattern = new RegExp(checkregularEmail);
    return pattern.test(email);
};
var checkEnterLetter = function (word) {
    return /[\s,]/g.test(word);
};
var checkValidationEmails = function (emails) {
    return emails.filter(function (item) { return item.isValid; });
};
var checkForRepeatedEmails = function (email, emails) {
    for (var i = 0; i < emails.length; i++) {
        if (emails[i].name === email) {
            return true;
        }
    }
    return false;
};
var notEmpty = function (item) {
    if (item) {
        return item;
    }
    else {
        throw new Error("Empty property " + item);
    }
};

var FormDom = /** @class */ (function () {
    function FormDom(elem) {
        var _this = this;
        this.setFocusInput = function (e) {
            if (e &&
                _this.inputElement &&
                e.target.className.indexOf('emails-editor_input') === -1 &&
                e.target.className.indexOf('emails-editor_closebtn') === -1 &&
                e.target.className.indexOf('emails-editor_email') === -1) {
                _this.inputElement.focus();
            }
        };
        this.onInput = function (e) {
            var _a;
            var value = (_a = e.target) === null || _a === void 0 ? void 0 : _a.value;
            _this.inputElement.style.width = 2 + _this.getTextWidth(value) + 'px';
            if (value) {
                _this.placeholderElement.style.display = 'none';
            }
            else if (_this.placeholderElement.style.display === 'none') {
                _this.placeholderElement.style.display = 'inline-block';
            }
        };
        this.getTextWidth = function (value) {
            if (value === void 0) { value = ''; }
            _this.hideElementWidthForInput.innerHTML = value;
            return _this.hideElementWidthForInput.offsetWidth;
        };
        this.addEmailDOM = function (email) {
            if (_this.wrapperForm) {
                _this.wrapperForm.scrollTop = _this.wrapperForm.scrollHeight;
            }
            var newElement = document.createElement('span');
            newElement.innerHTML = email.name;
            newElement.className = "emails-editor_email emails-editor_email__" + (email.isValid ? 'valid' : 'invalid');
            newElement.dataset.emailName = email.name;
            var newDeleteItemElement = document.createElement('span');
            newDeleteItemElement.innerHTML = '&times;';
            newDeleteItemElement.className = 'emails-editor_closebtn';
            newElement.appendChild(newDeleteItemElement);
            _this.wrapperEmails.appendChild(newElement);
        };
        this.removeEmailDOM = function (name) {
            var _a;
            var item = _this.wrapperEmails.querySelector("[data-email-name=\"" + name + "\"]");
            (_a = item === null || item === void 0 ? void 0 : item.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(item);
        };
        this.resetInput = function () {
            _this.inputElement.value = '';
            _this.inputElement.style.width = _this.getTextWidth() + 'px';
            _this.placeholderElement.style.display = 'inline-block';
        };
        this.element = elem;
        this.element.innerHTML =
            '<div class="emails-editor_form">' +
                '<span class="email-editor_wrapper-emails">' +
                '</span>' +
                '<input class="emails-editor_input" />' +
                '<span class="emails-editor_fake-span">' +
                '</span>' +
                '<span class="emails-editor_placeholder">add more people…</span>' +
                '</div>';
        this.placeholderElement = notEmpty(this.element.querySelector('.emails-editor_placeholder'));
        this.wrapperForm = notEmpty(this.element.querySelector('.emails-editor_form'));
        this.inputElement = notEmpty(this.element.querySelector('.emails-editor_input'));
        this.wrapperEmails = notEmpty(this.element.querySelector('.email-editor_wrapper-emails'));
        this.hideElementWidthForInput = notEmpty(this.element.querySelector('.emails-editor_fake-span'));
        this.wrapperForm.addEventListener('click', function (e) { return _this.setFocusInput(e); });
        this.inputElement.addEventListener('input', function (e) { return _this.onInput(e); });
    }
    return FormDom;
}());

var CreateEmailForm = /** @class */ (function () {
    function CreateEmailForm(element) {
        var _this = this;
        this.emails = [];
        this.onChange = function (e) {
            if (e) {
                var value = e.target.value;
                if (value.length === 1 && checkEnterLetter(value)) {
                    _this.formDom.resetInput();
                }
                if (value && value.length > 1 && checkEnterLetter(value)) {
                    _this.addEmail(value);
                }
            }
        };
        this.onBlur = function (e) {
            if (e) {
                var email = e.target.value.replace(/(^\s*)|(\s*)$/g, '');
                if (email) {
                    _this.addEmail(email);
                }
            }
        };
        this.enterValuesToStore = function () {
            if (_this.formDom.inputElement) {
                var value = _this.formDom.inputElement.value;
                console.log(value);
                _this.addEmail(value);
                _this.formDom.resetInput();
            }
        };
        this.addEmail = function (email) {
            var inputEmails = email.replace(/(^\s*)|(\s*)$/g, '');
            inputEmails = inputEmails.replace(/(,\s*)$/g, ',');
            var inputEmailsSplit = inputEmails.split(/\s|,/).filter(function (item) { return item; });
            var newEmails = inputEmailsSplit.map(function (item) {
                return {
                    name: item,
                    isValid: checkValidEmail(item),
                };
            });
            newEmails.map(function (item) {
                if (!checkForRepeatedEmails(item.name, _this.emails)) {
                    _this.emails.push(item);
                    _this.formDom.addEmailDOM(item);
                    var itemDOM = _this.formDom.wrapperEmails.querySelector("[data-email-name=\"" + item.name + "\"]");
                    itemDOM === null || itemDOM === void 0 ? void 0 : itemDOM.addEventListener('click', function (e) { return _this.removeEmail(e); });
                }
            });
            _this.formDom.resetInput();
        };
        this.removeEmail = function (e) {
            if (e) {
                var email_1 = e.target.parentElement.dataset.emailName;
                _this.emails = _this.emails.filter(function (item) { return item.name !== email_1; });
                _this.formDom.removeEmailDOM(email_1);
            }
        };
        this.formDom = new FormDom(element);
        if (this.formDom.inputElement) {
            // fix IE 11
            var inputEventType = /Trident/.test(navigator.userAgent) ? 'textinput' : 'input';
            this.formDom.inputElement.addEventListener(inputEventType, function (e) { return _this.onChange(e); });
            this.formDom.inputElement.addEventListener('blur', function (e) { return _this.onBlur(e); });
            this.formDom.inputElement.addEventListener('paste', function () {
                _this.enterValuesToStore();
            });
            this.formDom.inputElement.addEventListener('keydown', function (e) {
                if (e.key === 'Enter') {
                    _this.enterValuesToStore();
                }
            });
        }
    }
    CreateEmailForm.prototype.setEmail = function (email) {
        this.addEmail(email);
    };
    CreateEmailForm.prototype.getEmails = function () {
        return checkValidationEmails(this.emails).map(function (item) {
            return item.name;
        });
    };
    return CreateEmailForm;
}());

export default CreateEmailForm;
//# sourceMappingURL=index.es.js.map
