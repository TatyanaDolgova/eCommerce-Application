const emailRegExp = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{1,8}$/);

export const passwordRegExp = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,25}$/,
);

export const passwordProps = {
  required: 'Password is required.',
  minLength: {
    value: 8,
    message: 'Password must be at least 8 characters long.',
  },
  pattern: {
    value: passwordRegExp,
    message:
      'Password must contain at least one uppercase and one lowercase letter, one digit and one special character.',
  },
};

export const emailProps = {
  required: 'Email is required',
  pattern: {
    value: emailRegExp,
    message:
      'Email address must be properly formatted (e.g., user@example.com) and should not contain whitespace.',
  },
};
