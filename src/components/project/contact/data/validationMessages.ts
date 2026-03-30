export const validationMessages = {
  name: {
    valueMissing: 'Please enter your name',
    patternMismatch: "Use letters, spaces, ', or - only",
    containsHtml: 'HTML tags are not allowed',
    containsScriptTag: 'Script tags are not allowed'
  },
  email: {
    valueMissing: 'Please enter your email',
    typeMismatch: 'Please enter a valid email',
    containsHtml: 'HTML tags are not allowed',
    containsScriptTag: 'Script tags are not allowed'
  },
  message: {
    valueMissing: 'Please enter a message',
    tooShort: 'At least 10 characters',
    containsHtml: 'HTML tags are not allowed',
    containsScriptTag: 'Script tags are not allowed'
  }
};
