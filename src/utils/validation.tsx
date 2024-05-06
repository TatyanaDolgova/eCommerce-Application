const emailRegexp = new RegExp('^[\\-a-zA-z]+@[\\-a-zA-z]+.[\\-a-zA-z]+$');

function validateEmail(email: string) {
  if (!emailRegexp.test(email)) {
    return 'Email address must be properly formatted (e.g., user@example.com) and should not contain whitespace';
  }

  return undefined;
}

function validatePassword(password: string) {
  if (password.length < 8) {
    return 'Password must be at least 8 characters long';
  }

  return undefined;
}

export function validateLoginForm(email: string, password: string) {
  let mistake;

  if (validateEmail(email)) {
    mistake = validateEmail(email);
  }

  if (validatePassword(password)) {
    mistake = validatePassword(password);
  }

  return mistake;
}
