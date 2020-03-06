var checkregularEmail = /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i;
//# sourceMappingURL=constants.js.map

var CreateEmailForm = /** @class */ (function () {
    function CreateEmailForm(element) {
        var _this = this;
        this.placeholderElement = null;
        this.isEdit = false;
        this.emails = [];
        this.updateDom = function (isRemove) {
            if (isRemove === void 0) { isRemove = false; }
            var wrapperElement = _this.element.querySelector('.email-editor_wrapper-emails');
            if (wrapperElement) {
                wrapperElement.innerHTML = _this.generateEmailsDom(isRemove);
                var emailElements = _this.element.querySelectorAll('.emails-editor_closebtn');
                for (var i = 0; i < emailElements.length; i++) {
                    var emailElement = emailElements[i];
                    emailElement.addEventListener('click', function (e) { return _this.removeEmail(e); });
                }
            }
        };
        this.generateEmailsDom = function (isRemove) {
            if (isRemove === void 0) { isRemove = false; }
            var emailDom = '';
            _this.emails.map(function (item) {
                emailDom +=
                    "<span class=\"emails-editor_email emails-editor_email__" + (item.isValid ? 'valid' : 'invalid') + "\">" +
                        item.name +
                        '<span class="emails-editor_closebtn">&times;</span>' +
                        '</span>';
            });
            if (!isRemove) {
                var divForm = _this.element.querySelector('.emails-editor_form');
                if (divForm) {
                    divForm.scrollTop = divForm.scrollHeight;
                }
            }
            return emailDom;
        };
        this.setFocusInput = function (e) {
            var div = _this.element.querySelector('span.emails-editor_input');
            if (e &&
                e.target.className.indexOf('emails-editor_input') === -1 &&
                e.target.className.indexOf('emails-editor_closebtn') === -1 &&
                e.target.className.indexOf('emails-editor_email') === -1 &&
                !_this.isEdit &&
                div instanceof HTMLElement) {
                _this.isEdit = true;
                div.focus();
                var range = document.createRange();
                range.selectNodeContents(div);
                range.collapse(false);
                var sel = window.getSelection();
                if (sel) {
                    sel.removeAllRanges();
                    sel.addRange(range);
                }
            }
        };
        this.onFocusInput = function () {
            if (_this.placeholderElement) {
                _this.placeholderElement.style.display = 'none';
                _this.isEdit = false;
            }
        };
        this.onChangeInput = function (e) {
            if (e) {
                var value = e.target.innerText;
                if (value.length === 1 && _this.checkEnterWord(value)) {
                    var divInput = _this.element.querySelector('.emails-editor_input');
                    if (divInput) {
                        divInput.innerHTML = '';
                    }
                }
                if (value && value.length > 1 && _this.checkEnterWord(value)) {
                    _this.addEmail(value);
                }
            }
        };
        this.onBlurInput = function (e) {
            if (_this.placeholderElement) {
                _this.placeholderElement.style.display = 'inline-block';
            }
            if (e) {
                var email = e.target.innerText.replace(/(^\s*)|(\s*)$/g, '');
                if (email) {
                    _this.addEmail(email);
                }
            }
        };
        this.checkEnterWord = function (value) {
            return /[\s,]/g.test(value);
        };
        this.addEmail = function (email) {
            var inputEmails = email.replace(/(^\s*)|(\s*)$/g, '');
            inputEmails = inputEmails.replace(/(,\s*)$/g, ',');
            var inputEmailsSplit = inputEmails.split(/\s|,/).filter(function (item) { return item; });
            var newEmails = inputEmailsSplit.map(function (item) {
                return {
                    name: item,
                    isValid: _this.checkValid(item),
                };
            });
            newEmails.map(function (item) {
                if (!_this.checkForCoincidence(item.name)) {
                    _this.emails.push(item);
                }
            });
            var divInput = _this.element.querySelector('.emails-editor_input');
            if (divInput) {
                divInput.innerHTML = '';
            }
            _this.updateDom();
        };
        this.checkValid = function (email) {
            var pattern = new RegExp(checkregularEmail);
            return pattern.test(email);
        };
        this.removeEmail = function (e) {
            if (e) {
                var email_1 = e.target.parentElement.innerHTML.split('<')[0];
                _this.emails = _this.emails.filter(function (item) { return item.name !== email_1; });
                _this.updateDom(true);
            }
        };
        this.checkForCoincidence = function (email) {
            for (var i = 0; i < _this.emails.length; i++) {
                if (_this.emails[i].name === email) {
                    return true;
                }
            }
            return false;
        };
        this.checkValidEmailsStore = function () {
            return _this.emails.filter(function (item) { return item.isValid; });
        };
        this.element = element;
        this.element.innerHTML =
            '<div class="emails-editor_form">' +
                '<span class="email-editor_wrapper-emails">' +
                this.generateEmailsDom() +
                '</span>' +
                '<span class="emails-editor_input" contenteditable="true">' +
                '</span>' +
                '<span class="emails-editor_placeholder">add more people…</span>' +
                '</div>';
        this.placeholderElement = this.element.querySelector('.emails-editor_placeholder');
        var divForm = this.element.querySelector('.emails-editor_form');
        if (divForm) {
            divForm.addEventListener('click', function (e) { return _this.setFocusInput(e); });
        }
        var divInput = this.element.querySelector('.emails-editor_input');
        if (divInput) {
            // fix IE 11
            var inputEventType = /Trident/.test(navigator.userAgent) ? 'textinput' : 'input';
            divInput.addEventListener(inputEventType, function (e) { return _this.onChangeInput(e); });
            divInput.addEventListener('focus', function () { return _this.onFocusInput(); });
            divInput.addEventListener('blur', function (e) { return _this.onBlurInput(e); });
            divInput.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' ||
                    ((e.ctrlKey || e.metaKey) && e.key === 'v')) {
                    // for IE 11
                    var divInput_1 = _this.element.querySelector('.emails-editor_input');
                    if (divInput_1) {
                        var inputText = divInput_1.innerHTML;
                        inputText && _this.addEmail(inputText);
                        divInput_1.innerHTML = '';
                    }
                }
            });
        }
    }
    CreateEmailForm.prototype.setEmail = function (email) {
        this.addEmail(email);
    };
    CreateEmailForm.prototype.getEmail = function () {
        return this.checkValidEmailsStore().map(function (item) {
            return item.name;
        });
    };
    return CreateEmailForm;
}());

export default CreateEmailForm;
//# sourceMappingURL=index.es.js.map
