# EmailsEditor v0.2.0

![example](./readmiImg/example.png)

## example code

https://deadka1313.github.io/EmailsEditor/examples/index.html

## Installation for development

> npm install

or

> yarn install

Build library

> npm run build

Build library hotreload

> npm run start

## usages

```javascript
const emailsEditor = new EmailsEditor(inputContainerNode);

// API

// send line for input
emailsEditor.setEmail('email@mail.com');
// get array valid emails
emailsEditor.getEmails();
```
