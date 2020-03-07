# EmailsEditor v0.1.1

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

## BAGS

Elimination of a bug in the subject during the decision process

1. if press enter in ie
2. FUTURE: contenteditable -> input

## UPDATE

-   optimisation remove and add emails DOM
